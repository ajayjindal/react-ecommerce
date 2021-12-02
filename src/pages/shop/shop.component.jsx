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

class ShopPage extends React.Component {
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = collection(firestore, "collections");
        this.unsubscribeFromSnapshot = onSnapshot(
            collectionRef,
            async (snapshot) => {
                updateCollections(convertCollectionsSnapshotToMap(snapshot));
            }
        );
    }
    render() {
        const { match } = this.props;
        return (
            <div className="shop-page">
                <Route
                    exact
                    path={`${match.path}`}
                    component={CollectionOverview}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    component={CollectionPage}
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
