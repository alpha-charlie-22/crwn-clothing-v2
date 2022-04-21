import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({item}) => {
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);
  const {name, imageUrl, price, quantity} = item;

  const addItemHandler = () => addItemToCart(item);
  const removeItemHandler = () => removeItemFromCart(item);
  const clearItemHandler = () => clearItemFromCart(item);

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