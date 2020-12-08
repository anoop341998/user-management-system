import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/user_actions';
import {Link} from 'react-router-dom';
class RegisterLogin extends Component {
    state = {
    email: '',
    password: '',
    errors: []
    }
    handleChange = (ev) => {
        this.setState({[ev.target.name]: ev.target.value})
    }
    submitForm = (ev) => {
        ev.preventDefault();
        let dataToSubmit = {
            email: this.state.email,
            password: this.state.password
        }

        if(this.isFormValid(this.state)){
            this.setState({errors: []});
            this.props.dispatch(loginUser(dataToSubmit))
                    .then(res => {
                        console.log(res);
                        if(res.payload.loginSuccess){
                            this.props.history.push('/');
                        }
                        else{
                            this.setState({
                                errors: this.state.errors.concat(
                                    "Failed to Login Check Username and Password"
                                )
                            })
                        }
                    })
                    .catch(err => console.log(err))

        }
        else{
            this.setState({errors: []});
            this.setState({
                errors: ['Form is not Valid'],
            })
        }
    }

    isFormValid = ({email, password}) => {
        return email && password;
    }

    displayErrors = (errors) => {
        return errors.map((error,i) => <p key={i}>{error}</p>)
    }
    render() {
        return (
            <div className="container">
                <h2>Login</h2>
                <div className="row">
                    <form className="col s12">
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
                                    data-success="Right email"
                                    >
                                </span>
                            </div>
                        </div>
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

                        {this.state.errors.length > 0 && (
                            <div>
                                {this.displayErrors(this.state.errors)}
                            </div>
                        )}
                        <div className="row">
                            <div className="col s2 push-s1">
                                <button
                                    className="btn waves-effect red lighten-2"
                                    type="submit"
                                    name="action"
                                    onClick={this.submitForm}
                                >
                                    Login
                                </button>
                            </div>
                            <div className="col s2">
                            <Link to="/register"/>
                                <button
                                    className="btn waves-effect red lighten-2"
                                    type="submit"
                                    name="action"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        state: state.user
    }
}


export default connect(mapStateToProps)(RegisterLogin);