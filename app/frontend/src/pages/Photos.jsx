import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Photo from '../components/Photo';
import Upload from '../components/Upload';
import { useAuth } from '../context/AuthContext';
import { fetchData } from '../../lib/db.js';
import { photosRoute } from '../../constants/constants';
import { upload } from '../assets';
import CustomButton from '../components/CustomButton.jsx';
import toast from 'react-hot-toast';

const Photos = () => {
  const [show, setShow] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [selected, setSelected] = useState(null);
  const { user, setUser } = useAuth();

  const fetchPhotos = async () => {
    const data = await fetchData(photosRoute, `user=${user.username}`);
  
    if (data.error) {
      toast.error(data.error);
      return;
    }
  
    setPhotos(data.photos);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

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
    <Photo 
      key={selected} 
      index={selected} 
      photo={photos[selected]} 
      handleSelected={handleSelected} 
      show={true} 
    />
  ) : (
    photos && photos.map((photo, index) => (
      <Photo 
        key={index} 
        index={index} 
        photo={photo} 
        handleSelected={(handleSelected)} 
      />
    ))
  );

  return (
    <>
      <div className="flex justify-between items-center h-[50px] z-1">
        <Link to="/" className="font-bold text-3xl">Oogle Unphotos</Link>
        <div className="flex items-center space-x-5">
          <button onClick={() => setShow(true)}>
            <img src={upload} alt="upload icon" />
          </button>
          <CustomButton 
            path="/"
            text="Log out"
            handleClick={logout}
          />
        </div>
      </div>
      <Upload user={user} show={show} setShow={setShow} refetch={handleUpload}/>
      <div className={`flex ${selected !== null ? 'justify-center min-h-[70vh]': 'flex-wrap justify-start items-center gap-10'} mt-10`}>
        { photoComponents }
      </div>
    </>
  );
};

export default Photos;