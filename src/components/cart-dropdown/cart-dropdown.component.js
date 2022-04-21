import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.components';

import './cart-dropdown.styles.scss'

const CartDropdown = () => {
  let navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const handleClick = () => {
    navigate('/checkout');
  }

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        { cartItems.map(item => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button type='button' onClick={handleClick}>GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown;