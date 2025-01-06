import { useState } from "react";
import Board from "./Board";
import { usePuzzle } from "../context/PuzzleContext";

const Photo = ({ index, photo, handleSelected }) => {
  const [show, setShow] = useState(false);
  const { solvedPuzzles } = usePuzzle();
  
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
        index={index}
        photo={photo.image}
        showBoard={show}
        setShowBoard={handleShow}
        boardSolved={solvedPuzzles.includes(index)}
      />
    </>
  );
};

export default Photo;