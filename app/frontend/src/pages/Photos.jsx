import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Board from '../components/Board';
import Photo from '../components/Photo';
import Upload from '../components/Upload';
import { useAuth } from '../context/AuthContext';
import { fetchData } from '../../lib/db.js';
import { photosRoute } from '../../constants';
import { upload } from '../assets';

const Photos = () => {
  const [show, setShow] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [selected, setSelected] = useState(null);
  const [photos, setPhotos] = useState([]);
  const { user, setUser } = useAuth();

  const fetchPhotos = async () => {
    const data = await fetchData(photosRoute, `user=${user.username}`);
  
    if (!data) return;
  
    setPhotos(data.photos);
  };

  useEffect(() => {
    try {
      fetchPhotos();

    } catch (error) {
      console.log(error);
    }

  }, []);

  const showUpload = () => {
    setShow(prev => !prev);
  };

  const handleUpload = () => {
    fetchPhotos();
  };

  const handlePhotoClick = (photo) => {
    setSelected(photo.image);
    setShowBoard(true);
  };

  const handleShowBoard = () => {
    setShowBoard(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const photoComponents = photos && photos.map((photo, index) => {
    return (
      <Photo key={index} index={index} photo={photo} handleClick={handlePhotoClick} />
    );
  });

  return (
    <>
      <nav className="flex justify-between items-center h-[50px]">
        <h2 className="font-bold text-3xl">Oogle Unphotos</h2>
        <Upload user={user} show={show} setShow={setShow} refetch={handleUpload}/>
        <div className="flex justify-center items-center space-x-5 font-bold">
          <button onClick={showUpload}>
            <img src={upload} alt="upload icon" />
          </button>
          <button className="border mr-2 py-2 w-[80px] rounded bg-primary hover:bg-blue-600 text-white hover:cursor-pointer" onClick={logout}>
            <Link to="/">Log out</Link>
          </button> 
        </div>
      </nav>
      <div className={`flex ${!showBoard ? 'flex-wrap justify-start items-center gap-10' : 'justify-center items-center min-h-[70vh]'} mt-10`}>
        <Board photo={selected} showBoard={showBoard} setShowBoard={handleShowBoard} />
        {
          !showBoard && photoComponents
        }
      </div>
    </>
  );
};

export default Photos;