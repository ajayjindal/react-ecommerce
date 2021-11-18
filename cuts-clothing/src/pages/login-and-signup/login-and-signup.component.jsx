import React from "react";
import "./login-and-signup.styles.scss";
import SignIn from "../../components/sign-in/sign-in.component";

const SignInAndSignUpComponent = () => {
    return (
        <div className="sign-in-and-sign-up">
            Sign in
            <SignIn />
        </div>
    );
};

export default SignInAndSignUpComponent;
