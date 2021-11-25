import React from "react";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import {
    CartIconContainer,
    ItemCountContainer,
    ShoppingIconContainer,
} from "./cart-icon.styles.jsx";

const CartIcon = ({ toggleCartHidden, itemCount }) => {
    return (
        <CartIconContainer onClick={toggleCartHidden}>
            <ShoppingIconContainer />
            <ItemCountContainer>{itemCount}</ItemCountContainer>
        </CartIconContainer>
    );
};
const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount,
});
const mapDispatchToProps = (dispatch) => {
    return { toggleCartHidden: () => dispatch(toggleCartHidden()) };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
