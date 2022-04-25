import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';

const Checkout = () => {
  const { cartItems, priceTotal } = useContext(CartContext);

  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>Product</div>
        <div className='header-block'>Description</div>
        <div className='header-block'>Quantity</div>
        <div className='header-block'>Price</div>
        <div className='header-block'>Remove</div>
      </div>
      {
        cartItems.map((item) => <CheckoutItem key={item.id} item={item} />)
      }
      <div className='total'>{`Total: $${priceTotal}`}</div>
    </div>
  )
}

export default Checkout;