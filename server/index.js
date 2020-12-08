const express = require('express');
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {User} = require('./models/user');
const cors = require('cors');
const config = require('./config/key');
const {auth} = require('./middleware/auth');
const env = require('dotenv').config();


mongoose.connect( config.mongoURI, {useNewUrlParser: true})
        .then(() => console.log('Db connected'))
        .catch((err) => console.log(err.message));

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
                                        
app.get('/api/user/auth',auth, (req,res) => {
    return res.status(200).json({
        _id: req._id,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
     })
})
app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(( Userdata) => {
        return res.status(200).json({
            success: true,
            creation:'successfully created'});
    })
        .catch((err) => {
          return res.status(400).json({success:false, err})
        })
})
app.get('/', (req, res) => {
    res.send('hello');
})
app.post('/api/user/login', (req,res) => {

    //find the email
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user){
            return res.send({
                loginSuccess: false,
                error: 'user not found'
            });
        } 
    //compare the password

    user.comparePassword(req.body.password, (err, isMatch) => {
        if(!isMatch){
            return res.json({
                loginSuccess: false,
                error: 'wrong password'
            });
        }
        //generate token
        user.generateToken((err, userData) => {
            if(err) res.status(400).json({error: 'unable to generate token'});
            return res.cookie('x_auth',user.token)
                .status(200)
                .json({
                    loginSuccess: true,
                })
        })
    })

})


})
app.get('/api/user/logout', auth, (req,res) => {
        if(req.user){
       User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err, user) => {
        if(err) return res.json({
            success: false,
        })
        return res.status(200).json({
            success: true,
        })
    })
}   
else{
console.log('user not found');
}
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
