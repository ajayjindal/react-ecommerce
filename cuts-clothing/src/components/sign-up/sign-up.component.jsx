import React, { Component } from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {
    auth,
    createUserProfileDocument,
    signInWithGoogle,
} from "../../firebase/firebase.utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./sign-up.styles.scss";

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: "",
        };
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            await createUserProfileDocument(user, { displayName });
            this.setState({
                displayName: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
        } catch (error) {
            console.log(error);
        }
        // this.setState({ email: "", password: "" });
    };
    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };
    render() {
        return (
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={this.state.displayName}
                        required
                        handleChange={this.handleChange}
                        label="Enter Name"
                    />
                    <FormInput
                        type="email"
                        name="email"
                        value={this.state.email}
                        required
                        handleChange={this.handleChange}
                        label="Email"
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={this.state.password}
                        required
                        handleChange={this.handleChange}
                        label="Password"
                    />
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        required
                        handleChange={this.handleChange}
                        label="Confirm Password"
                    />
                    <div className="button">
                        <CustomButton type="submit">Sign Up</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            {" "}
                            Sign up with Google{" "}
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUp;
