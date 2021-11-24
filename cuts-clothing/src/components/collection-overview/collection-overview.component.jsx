import React from "react";
import "./collection-overview.styles.scss";
import { connect } from "react-redux";
import CollectionPreview from "../collection-preview/collection-preview.component";
import { createStructuredSelector } from "reselect";
import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";

const CollectionOverview = ({ collections }) => {
    return (
        <div className="collection-overview">
            {collections.map(({ id, ...otherProps }) => {
                return (
                    <CollectionPreview
                        key={id}
                        {...otherProps}
                    ></CollectionPreview>
                );
            })}
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview,
});
export default connect(mapStateToProps)(CollectionOverview);
