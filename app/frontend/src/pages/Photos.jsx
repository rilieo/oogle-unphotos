import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Photo from '../components/Photo';
import Upload from '../components/Upload';
import { useAuth } from '../context/AuthContext';
import { fetchData } from '../../lib/db.js';
import { photosRoute } from '../../constants';
import { upload } from '../assets';

const Photos = () => {
  const [show, setShow] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [selected, setSelected] = useState(null);
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

  const handleSelected = (index) => {
    setSelected(index);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const photoComponents = selected !== null ? (
    <Photo key={selected} index={selected} photo={photos[selected]} handleSelected={handleSelected} show={true} />
  ) : (
    photos && photos.map((photo, index) => (
      <Photo key={index} index={index} photo={photo} handleSelected={handleSelected} />
    ))
  );

  return (
    <>
      <nav className="flex justify-between items-center h-[50px]">
        <Link to="/" className="font-bold text-3xl">Oogle Unphotos</Link>
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
      <div className={`flex ${selected !== null ? 'justify-center min-h-[70vh]': 'flex-wrap justify-start items-center gap-10'} mt-10`}>
        { photoComponents }
      </div>
    </>
  );
};

export default Photos;