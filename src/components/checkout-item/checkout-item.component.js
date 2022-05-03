import { useSelector, useDispatch } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector'
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action'

import './checkout-item.styles.scss';

const CheckoutItem = ({item}) => {
  const {name, imageUrl, price, quantity} = item;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addItemHandler = () => dispatch(addItemToCart(cartItems, item));
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, item));
  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, item));

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} /> 
      </div>
      <span className='name'>{name}</span>
      <div className='quantity'>
        <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
        <div className='value'>
          {quantity}
        </div>
        <div className='arrow' onClick={addItemHandler}>&#10095;</div>
      </div>
      <span className='price'>{ (quantity * price) }</span>
      <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>
    </div>
  )
}

export default CheckoutItem