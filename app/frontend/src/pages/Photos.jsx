import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Board from '../components/Board';
import Photo from '../components/Photo';
import Upload from '../components/Upload';
import { useAuth } from '../context/AuthContext';
import { fetchData, get} from '../lib/db.js';
import { photosRoute } from '../constants';

const Photos = () => {
  const [show, setShow] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [puzzlePhoto, setPuzzlePhoto] = useState('');
  const [photos, setPhotos] = useState([]);
  const { user, setUser } = useAuth();

  useEffect(() => {
    const fetchPhotos = async () => {
      const data = await fetchData(() => get(photosRoute, `user=${user.username}`));

      if (!data) return;

      setPhotos(data.photos);
    };

    fetchPhotos();
  }, [photos, user.username]);

  const handleUpload = () => {
    setShow(prev => !prev);
  };

  const handleClick = (photo) => {
    setPuzzlePhoto(photo.image);
    setShowBoard(prev => !prev);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const photoComponents = photos && photos.map((photo, index) => {
    return (
      <Photo key={index} index={index} photo={photo} handleClick={handleClick} />
    );
  });

  return (
    <>
      <nav className="flex justify-between items-center h-[50px]">
        <h2 className="font-bold text-3xl">Oogle Unphotos</h2>
        { show ? <Upload user={user} setShow={setShow} /> : <span/>}
        <div className="flex justify-center items-center space-x-5 font-bold">
          <button onClick={handleUpload}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
          </button>
          <button className="border mr-2 py-2 w-[80px] rounded bg-primary hover:bg-blue-600 text-white hover:cursor-pointer" onClick={logout}>
            <Link to="/">Log out</Link>
          </button> 
        </div>
      </nav>
      <div className={`flex ${!showBoard ? 'flex-wrap justify-start items-center gap-10' : 'justify-center items-center'} mt-10`}>
        {showBoard ? <Board img={puzzlePhoto} /> : 
          photoComponents && photoComponents.length > 0 ? photoComponents : <h1 className="text-xl">No Photos Found</h1>
        }
      </div>
    </>
  );
};

export default Photos;