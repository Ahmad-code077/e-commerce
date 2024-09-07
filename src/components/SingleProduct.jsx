import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addToCart, SingleItem } from '../Features/AllItemSlice';
import { FaRegUserCircle, FaStar } from 'react-icons/fa';

const SingleProduct = () => {
  const location = useLocation().pathname.split('/')[2];
  const dispatch = useDispatch();

  const { loading, error, singleItem } = useSelector(
    (state) => state.allProducts
  );

  useEffect(() => {
    if (location) {
      dispatch(SingleItem(location));
    }
  }, [location, dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const {
    brand,
    description,
    images,
    price,
    rating,
    reviews,
    title,
    warrantyInformation,
  } = singleItem;

  const handleCartIncrease = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <section className='mt-8 '>
      <div className='flex flex-col items-center justify-center gap-12 sm:flex-row sm:justify-evenly'>
        <div className='aspect-video w-72 h-72 border sm:w-1/3 '>
          <img
            src={images?.[0]}
            alt={title}
            className='w-full h-full object-contain'
          />
        </div>
        <div className='max-w-96 flex items-center justify-center flex-col gap-2'>
          <h1 className=''>{title}</h1>
          <h1 className='font-semibold text-xl text-blue-500 text-center'>
            {brand}
          </h1>
          <p className='text-center text-orange-400'>{description}</p>
          <p className='flex items-center gap-2'>
            Product Rating : {rating}{' '}
            <FaStar className='text-yellow-500 transition-all animate-pulse' />
          </p>
          <p className='text-center'>Price : ${price}</p>
          <p>Warranty : {warrantyInformation}</p>
          <button
            onClick={() => handleCartIncrease(singleItem)}
            className='bg-blue-500 text-white py-1 px-2 rounded'
          >
            Add to Cart
          </button>
        </div>
      </div>
      <main className='my-8'>
        <h1 className='text-4xl text-center mb-8 '>Reviews</h1>
        <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {reviews?.map((item, i) => {
            const { comment, date, rating, reviewerEmail, reviewerName } = item;
            return (
              <div className='border shadow-lg px-2' key={i}>
                <div className='flex items-center  gap-4 '>
                  <FaRegUserCircle className='text-3xl' />{' '}
                  <div>
                    <div className='flex gap-2'>
                      <span className='text-blue-500'>{reviewerName}</span>
                    </div>
                    <span className='text-wrap'>{reviewerEmail}</span>
                    <div>
                      <span className='flex items-center gap-2'>
                        {rating}
                        <FaStar className='text-yellow-500 transition-all animate-pulse' />
                      </span>

                      <span>{date}</span>
                    </div>
                  </div>
                </div>
                <h1 className='text-orange-400'>Comment : {comment}</h1>
              </div>
            );
          })}
        </section>
      </main>
    </section>
  );
};

export default SingleProduct;
