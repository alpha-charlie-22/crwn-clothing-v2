import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.components';

import {CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

const CartDropdown = () => {
  let navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const handleClick = () => {
    navigate('/checkout');
  }

  return (
    <CartDropdownContainer>
      <CartItems>
        { cartItems.length ? cartItems.map(item => (
          <CartItem key={item.id} cartItem={item} />
        )) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )
        }
      </CartItems>
      <Button type='button' onClick={handleClick}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown;