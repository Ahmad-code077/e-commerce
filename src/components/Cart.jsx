import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, removeFromCart } from '../Features/AllItemSlice';

const Cart = () => {
  const { cart, total } = useSelector((state) => state.allProducts);
  const dispatch = useDispatch();

  if (cart.length === 0) {
    return <p className='text-center'>Cart is empty.</p>;
  }

  return (
    <section className='mt-8'>
      <h1 className='text-4xl text-center'>Your Bag</h1>

      <section className='flex flex-col gap-4 w-full mt-8'>
        {cart.map((cartItem) => {
          const { images, price, id, title, quantity } = cartItem;
          return (
            <main
              className='flex gap-4 items-center justify-between flex-col sm:flex-row'
              key={id}
            >
              <div className='w-32 h-32'>
                <img src={images[0]} alt='image' className='w-full h-full' />
              </div>
              <div className=''>
                <h1>{title}</h1>
              </div>
              <div className='flex gap-4  items-center justify-center'>
                <button
                  className='rounded-s-full bg-orange-500 p-4 text-2xl'
                  onClick={() => dispatch(decrement(cartItem))}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className='rounded-r-full bg-orange-500 p-4 text-2xl'
                  onClick={() => dispatch(increment(cartItem))}
                >
                  +
                </button>
              </div>
              <div className='flex items-center gap-4 '>
                <p>Price: ${price}</p>
                <p>Total: ${(price * quantity).toFixed(2)}</p>
                <button
                  className='text-red-500 p-4 text-2xl'
                  onClick={() => dispatch(removeFromCart(cartItem))}
                >
                  Remove
                </button>
              </div>
            </main>
          );
        })}

        <h1 className='text-3xl font-semibold text-right text-green-500 '>
          Total: ${total.toFixed(2)}
        </h1>
      </section>
    </section>
  );
};

export default Cart;
