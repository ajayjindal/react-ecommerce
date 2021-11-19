import React, { Component } from "react";
import FormInput from "./../form-input/form-input.component";
import CustomButton from "./../custom-button/custom-button.component";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import "./sign-in.styles.scss";
import { signInWithEmailAndPassword } from "@firebase/auth";
class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
        };
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            this.setState({ email: "", password: "" });
        } catch (error) {
            console.log(
                "🚀 ~ file: sign-in.component.jsx ~ line 22 ~ SignIn ~ handleSubmit= ~ error",
                error
            );
        }
    };
    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };
    render() {
        return (
            <div className="sign-in">
                <h2 className="title">I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={this.state.email}
                        required
                        handleChange={this.handleChange}
                        label="Enter Email"
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={this.state.password}
                        required
                        handleChange={this.handleChange}
                        label="Enter Password"
                    />
                    <div className="button">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            Google sign in
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;
