import { GRID_SIZE, BOARD_SIZE } from '../../constants/constants';

const Tile = ({ index, img, handleClick, highlight }) => {
  const tileWidth = BOARD_SIZE / GRID_SIZE;
  const tileHeight = BOARD_SIZE / GRID_SIZE;

  const tileStyle = {
    width: `${tileWidth}px`,
    height: `${tileHeight}px`,
    backgroundImage: `url(${img})`,
    backgroundSize: `${BOARD_SIZE}px ${BOARD_SIZE}px`,
    backgroundPosition: `-${(index % GRID_SIZE) * tileWidth}px -${Math.floor(index / GRID_SIZE) * tileHeight}px`,
    cursor: 'pointer',
    border: highlight ? '2px solid #3b82f6' : '1px solid black'
  };

  return (
    <li style={tileStyle} onClick={() => handleClick(index)}></li>
  );
};

export default Tile;