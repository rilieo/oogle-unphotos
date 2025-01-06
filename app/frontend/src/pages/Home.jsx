import { rando } from '../assets';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <img src={rando} 
        alt="cover image" 
        className="object-contain w-[400px] h-[400px] my-20"
      />
      <h1 className="text-3xl font-bold">Where your photos are jumbled...</h1>
      <br />
      <h2 className="text-2xl">just like life</h2>
    </div>
  );
};

export default Home;