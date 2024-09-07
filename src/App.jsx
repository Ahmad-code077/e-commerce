import { Cart, Hero, Home, SingleProduct } from './index';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
function App() {
  const route = createBrowserRouter([
    {
      path: '/',
      element: (
        <div className='layer'>
          <Home />
        </div>
      ),
      children: [
        { index: true, element: <Hero /> },
        { path: '/singleProduct/:id', element: <SingleProduct /> },
        { path: '/cart', element: <Cart /> },
      ],
    },
  ]);
  return <RouterProvider router={route} />;
}

export default App;
