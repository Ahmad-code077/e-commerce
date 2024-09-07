import { FaLightbulb } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <section>
      <div className='flex items-center justify-center my-48 flex-col font-poppins gap-4'>
        <FaLightbulb className='text-7xl animate-pulse text-yellow-300' />
        <h1 className='text-3xl md:text-5xl tracking-wide font-bold'>
          404 Not found
        </h1>
        <Link
          to={'/'}
          className='font-bold bg-orange-500 px-4 py-1 rounded text-2xl'
        >
          Back Home
        </Link>
      </div>
    </section>
  );
};
export default Error;
