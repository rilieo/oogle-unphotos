const Photo = ({ index, photo, handleClick }) => {
  
  const handlePhotoClick = (e) => {
    e.preventDefault();
    handleClick(photo);
  };

  return (
    <div key={index} className="w-1/6 h-56 flex items-center justify-center overflow-hidden hover:cursor-pointer " onClick={handlePhotoClick}>
      <img src={photo.image} className="object-cover w-full h-full" alt="im"/>
    </div>
  );
};

export default Photo;