import React from "react";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import { Route } from "react-router";
import CollectionPage from "../collection/collection.component";
import {
    firestore,
    convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { collection, onSnapshot } from "@firebase/firestore";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {
    state = { loading: true };
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = collection(firestore, "collections");
        this.unsubscribeFromSnapshot = onSnapshot(
            collectionRef,
            async (snapshot) => {
                updateCollections(convertCollectionsSnapshotToMap(snapshot));
                this.setState({ loading: false });
            }
        );
    }
    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className="shop-page">
                <Route
                    exact
                    path={`${match.path}`}
                    render={(props) => (
                        <CollectionsOverviewWithSpinner
                            isLoading={loading}
                            {...props}
                        />
                    )}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => (
                        <CollectionsPageWithSpinner
                            isLoading={loading}
                            {...props}
                        />
                    )}
                ></Route>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCollections: (collectionMap) =>
        dispatch(updateCollections(collectionMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
