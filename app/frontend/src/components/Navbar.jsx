import { Link } from 'react-router-dom';
import CustomButton from './CustomButton';

const Navbar = ({ items, containerStyles }) => {
  return (
    <nav className="flex justify-between z-1 h-[50px] w-full">
      <Link to="/" className="font-bold text-3xl">Oogle Unphotos</Link>
      <div className={`flex items-center ${containerStyles}`}>
        {items.map((item, index) => (
          <CustomButton key={index} path={item.path} text={item.text} />
        ))}
      </div>
    </nav>
  );
};

export default Navbar;