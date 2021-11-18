import "./App.css";
import React from "react";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpComponent from "./pages/login-and-signup/login-and-signup.component";
import Header from "./components/header/header.component";
import { Route, Switch } from "react-router";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { onSnapshot } from "@firebase/firestore";
class App extends React.Component {
    unsubscribeFromAuth = null;

    constructor() {
        super();
        this.state = {
            currentUser: null,
        };
    }
    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                onSnapshot(userRef, (snapshot) => {
                    this.setState({
                        currentUser: { id: snapshot.id, ...snapshot.data() },
                    });
                });
            } else {
                this.setState({ currentUser: null });
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }
    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/shop" component={ShopPage} />
                    <Route
                        path="/signin"
                        component={SignInAndSignUpComponent}
                    />
                </Switch>
            </div>
        );
    }
}

export default App;
