import React from "react";
import {
    ButtonContainer,
    CartDropdownContainer,
    CartItemsContainer,
    EmtpyMessageContainer,
} from "./cart-dropdown.styles.jsx";
import CartItem from "../cart-item/cart-item.component";
import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

const CartDropdown = ({ cartItems, history, dispatch }) => {
    return (
        <CartDropdownContainer>
            <CartItemsContainer>
                {cartItems.length ? (
                    cartItems.map((cartItem) => {
                        return (
                            <CartItem
                                key={cartItem.id}
                                item={cartItem}
                            ></CartItem>
                        );
                    })
                ) : (
                    <EmtpyMessageContainer>
                        Your cart is empty
                    </EmtpyMessageContainer>
                )}
            </CartItemsContainer>
            <ButtonContainer
                onClick={() => {
                    history.push("/checkout");
                    dispatch(toggleCartHidden());
                }}
            >
                CHECKOUT
            </ButtonContainer>
        </CartDropdownContainer>
    );
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
});
export default withRouter(connect(mapStateToProps)(CartDropdown));
