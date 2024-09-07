import { useEffect, useState } from 'react';
import logo from '../assets/logos/myLogo.jpg';
import { FaCartPlus, FaMoon, FaSun } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const [darkMode, setDarkMode] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const { amount } = useSelector((state) => state.allProducts);

  return (
    <header className='flex items-center justify-between layer'>
      <Link to={'/'} className='w-32 h-16 py-2'>
        <img
          src={logo}
          alt='Site logo'
          className='object-cover w-full h-full'
        />
      </Link>
      <div className='flex items-start justify-center gap-8'>
        <button onClick={toggleDarkMode} className='text-2xl'>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        <Link to={'cart'} className='relative'>
          <button>
            <FaCartPlus className='text-2xl' />
          </button>
          <p className='absolute -top-4 -right-3'>{amount}</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
