import Footer from './Footer';
import Navbar from './Navbar';

function Layout(props) {
  return (
    <div className=' min-h-screen flex flex-col justify-between  '>
      <Navbar />
      <main className='max-w-7xl mx-auto'>{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
