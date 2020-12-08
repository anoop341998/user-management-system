import React, {Component} from 'react';
import {registerUser} from '../../actions/user_actions';
import {connect} from 'react-redux';

class Register extends Component{
    state = {
        lastname: '',
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        errors: []
        }
    handleChange = (ev) => {
        this.setState({[ev.target.name]: ev.target.value})
    }
    displayErrors = (errors) => {
        return errors.map((error,i) => <p key={i}>{error}</p>)
    }
    isFormValid = () => {
        let errors = [];
        let error;
        if(this.isFormEmpty(this.state)){
            error = {message: "Fill out all fields"};
            this.setState({errors: this.errors.concat(error)})
        }else if(!this.isPasswordValid(this.state)){
            error = {message: "Password is invalid"};
            this.setState({errors: this.state.errors.concat(error)})
        }
        else{
            return true;
        }
    }


    isPasswordValid = ({password, passwordConfirmation}) => {
        if(password.length < 6 || passwordConfirmation.length < 6){
            return false;
        }else if(password !== passwordConfirmation){
            return false;
        }
        else{
            return true;
        }
    }
    isFormEmpty = ({lastname, name, email, password, passwordConfirmation}) => {
        return (
            !name.length ||
            !lastname.length ||
            !email.length ||
            !password.length || 
            !passwordConfirmation.length
        )
    }
    submitForm = (ev) => {
        ev.preventDefault();
        let dataToSubmit = {
            email: this.state.email,
            lastname: this.state.lastname,
            name: this.state.name,
            password: this.state.password,
            passwordConfirmation: this.state.passwordConfirmation
        }
        console.log(dataToSubmit);
        if(this.isFormValid()){
            this.setState({errors: []});
            this.props.dispatch(registerUser(dataToSubmit))
                    .then(res => {
                        if(res.payload.success){
                            this.props.history.push('/login');
                        }
                        else{
                            this.setState({errors: this.state.errors.concat('Failed to Send Data')})
                        }
                    })
        }
    }
    render(){
        return (
            <div className="container">
                <h2>Sign Up</h2>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input 
                                    name="lastname"
                                    value={this.state.lastname}
                                    onChange={e => this.handleChange(e)}
                                    id="lastname"
                                    type="text"
                                    className="validate" 
                                />
                                <label className="active" htmlFor="lastname">Last name</label>
                                <span
                                    className="helper-text"
                                    data-error="Type a right last name"
                                    data-success="Right last name"
                                    >
                                </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className= "input-field col s12">
                                <input 
                                    name="name"
                                    value={this.state.name}
                                    onChange={e => this.handleChange(e)}
                                    id="name"
                                    type="text"
                                    className="validate" 
                                />
                                <label className="active" htmlFor="name">Name</label>
                                <span
                                    className="helper-text"
                                    data-error="Success"
                                    data-success="Wrong"
                                    >
                                </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input 
                                    name="email"
                                    value={this.state.email}
                                    onChange={e => this.handleChange(e)}
                                    id="email"
                                    type="email"
                                    className="validate" 
                                />
                                <label className="active" htmlFor="email">Email</label>
                                <span
                                    className="helper-text"
                                    data-error="Type a right email"
                                    data-success="Right last email"
                                    >
                                </span>
                            </div>
                        </div>
                        <h2>Password Verification</h2>
                        <div className="row">
                            <div className= "input-field col s12">
                                <input 
                                    name="password"
                                    value={this.state.password}
                                    onChange={e => this.handleChange(e)}
                                    id="password"
                                    type="password"
                                    className="validate" 
                                />
                                <label className="active" htmlFor="password">Password</label>
                                <span
                                    className="helper-text"
                                    data-error="Success"
                                    data-success="Wrong"
                                    >
                                </span>
                            </div>
                        </div> 
                        <div className="row">
                            <div className= "input-field col s12">
                                <input 
                                    name="passwordConfirmation"
                                    value={this.state.passwordConfirmation}
                                    onChange={e => this.handleChange(e)}
                                    id="passwordConfirmation"
                                    type="password"
                                    className="validate" 
                                />
                                <label className="active" htmlFor="passwordConfirmation">Retype Password</label>
                                <span
                                    className="helper-text"
                                    data-error="Success"
                                    data-success="Wrong"
                                    >
                                </span>
                            </div>
                        </div> 
                        <div className="row">
                            <div className="col s12">
                                <button
                                    className="btn waves-effect red lighten-2"
                                    type="submit"
                                    name="action"
                                    onClick={this.submitForm}
                                >
                                    Create an account
                                </button>
                            </div>
                        </div>
                    </form>
                    {this.state.errors.length > 0 && (
                            <div>
                                {this.displayErrors(this.state.errors)}
                            </div>
                        )}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        state: state.user
    }
}


export default connect(mapStateToProps)(Register);