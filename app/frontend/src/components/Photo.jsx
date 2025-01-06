import { useState } from "react";
import Board from "./Board";

const Photo = ({ index, photo, handleSelected }) => {
  const [show, setShow] = useState(false);
  
  const handleClick = () => {
    setShow(true);
    handleSelected(index);
  };

  const handleShow = () => {
    setShow(false);
    handleSelected(null);
  };

  return (
    <>
      <div className={`${!show ? 'w-1/6 h-56 flex items-center justify-center overflow-hidden hover:cursor-pointer' : 'hidden'}`} onClick={handleClick}>
        <img src={photo.image} className="object-cover w-full h-full" alt="im"/>
      </div>
      <Board 
        photo={photo.image}
        showBoard={show}
        setShowBoard={handleShow}
      />
    </>
  );
};

export default Photo;