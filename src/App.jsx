import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Whatsapp from './Components/Whatsapp';
const App = () => {
  const location = useLocation();
  const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register')
  return (
    <div>
      {noHeaderFooter || <Navbar />}
      <div className='min-h-[calc(100vh-559.2px)] mx-2'>
        <Outlet />
      </div>
      <Whatsapp />
      {

      }
      {noHeaderFooter || <Footer />}
    </div>


  );
};

export default App;
