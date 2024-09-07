import { useDispatch, useSelector } from 'react-redux';
import { addToCart, Allitems, SearchItems } from '../Features/AllItemSlice';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);

  // Handle search submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      dispatch(SearchItems(search));
      setIsSearchMode(true);
    } else {
      setIsSearchMode(false);
    }
  };

  const { error, loading, products, filtered } = useSelector(
    (state) => state.allProducts
  );

  useEffect(() => {
    dispatch(Allitems());
  }, [dispatch]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  // Use filtered products if search mode is on, otherwise use all products
  let displayProducts = isSearchMode ? filtered.products : products.products;

  // Handle case when search is empty and not in search mode
  if (!search) {
    displayProducts = products.products;
  }

  const handleCartIncrease = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='search'>
          <input
            type='text'
            name='search'
            id='search'
            placeholder='search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='outline-none border-2 dark:text-black px-2 py-1 my-4'
          />
        </label>
        <button
          type='submit'
          className='ml-2 bg-blue-500 text-white py-1 px-2 rounded'
        >
          Search
        </button>
      </form>

      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 '>
        {displayProducts?.length > 0 ? (
          displayProducts?.map((product) => {
            const { images, brand, price, id, description } = product;
            return (
              <main className='border cursor-pointer py-2' key={id}>
                <div className='aspect-video'>
                  <img
                    src={images[0]}
                    alt={brand}
                    className='w-full h-full object-contain'
                  />
                </div>
                <h1 className='font-semibold text-xl text-blue-500 text-center'>
                  {brand}
                </h1>
                <p className='text-center text-gray-500'>{description}</p>
                <p className='text-center'>Price: ${price}</p>
                <div className='flex items-center justify-center gap-4'>
                  <button
                    onClick={() => handleCartIncrease(product)}
                    className='bg-blue-500 text-white py-1 px-2 rounded'
                  >
                    Add to Cart
                  </button>
                  <Link
                    to={`singleProduct/${id}`}
                    className='bg-green-500 text-white py-1 px-2 rounded'
                  >
                    View Product
                  </Link>
                </div>
              </main>
            );
          })
        ) : (
          <h1>No Match Found....</h1>
        )}
      </section>
    </>
  );
};

export default Hero;
