import { useState, useEffect } from 'react';
import { TILE_COUNT } from '../../constants';
import Tile from './Tile';
import { back } from '../assets';

const Board = ({ photo, showBoard, setShowBoard }) => {
  const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
  const [shuffle, setShuffle] = useState(true);
  const [clickedTiles, setClickedTiles] = useState([]);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    if (shuffle) {
      shuffleTiles();
    }

    return () => {
      setShuffle(false);
    };
  });

  useEffect(() => {
    if (clickedTiles.length === 2) {
      swapTiles();
    }
  });

  const shuffleTiles = () => {
    const shuffledTiles = [...tiles].sort(() => Math.random() - 0.5);
    setTiles(shuffledTiles);
  };

  const swapTiles = () => {
    const [firstTile, secondTile] = clickedTiles;
    const swappedTiles = [...tiles];

    [swappedTiles[firstTile], swappedTiles[secondTile]] = [
      swappedTiles[secondTile],
      swappedTiles[firstTile],
    ];

    setTiles(swappedTiles);

    if (isSolved(swappedTiles)) {
      setSolved(true);
    }

    setClickedTiles([]);
  };

  const isSolved = (tiles) => {
    for (let i=0; i < tiles.length; i++) {
      if (tiles[i] !== i) {
        return false;
      }
    }

    return true;
  };

  const handleTileClick = (index) => {
    if (clickedTiles.length === 2) {
      return;
    }

    setClickedTiles((prev) => [...prev, index]);
  };

  const tileComponents = tiles.map((tile, index) => (
    <Tile
      key={tile}
      index={tile}
      img={photo}
      handleClick={() => handleTileClick(index)}
      highlight={clickedTiles.includes(index)}
    />
  ));

  return (
    <div className={`${showBoard ? 'block' : 'hidden'} h-full`}>
      <button className="absolute top-20 left-5" onClick={setShowBoard}>
        <img src={back} alt="back icon" className="w-10 h-10" />
      </button>
      <div className="flex justify-center items-center h-full">
        <div className="h-[400px] w-[400px]">
          <ul className={`relative ${!solved ? 'grid grid-cols-3' : 'hidden'}`}>
            {tileComponents}
          </ul>
          <img className={`${!solved ? 'hidden' : 'object-cover h-full w-full'}`} src={photo} alt="puzzle"></img>
        </div>
      </div>
    </div>
  );
};

export default Board;