import { Link } from "react-router-dom";

const CustomButton = ({ path, text, handleClick }) => {
  return (
    <button
      className="border mr-2 py-2 w-[80px] rounded bg-primary hover:bg-blue-600 text-white font-bold hover:cursor-pointer"
      onClick={handleClick}
    >
      <Link to={path}>{text}</Link>
    </button>
  );
};

export default CustomButton;