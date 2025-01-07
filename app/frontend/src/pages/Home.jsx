import { rando } from '../assets';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <Navbar 
        items={[
          { path: '/login', text: 'Login' },
          { path: 'signup', text: 'Sign Up' }
        ]} 
        containerStyles='space-x-2'
      />
      <img src={rando} 
        alt="cover image" 
        className="object-contain w-[400px] h-[400px] my-20"
      />
      <h1 className="text-3xl font-bold mb-8">Where your photos are jumbled...</h1>
      <h2 className="text-2xl">just like life</h2>
    </div>
  );
};

export default Home;