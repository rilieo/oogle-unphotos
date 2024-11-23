import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Upload from '../components/Upload'
import { useAuth } from '../context/AuthContext'

const Photos = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [photos, setPhotos] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(`/api/photos?user=${user.username}`);
        const data = await response.json();
        
        if (data.message) {
          alert('Failed to fetch photos');
          console.error(data.message);
          return;
        }

        setPhotos(data.photos);

      } catch (error) {
        alert('Failed to fetch photos');
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  const handleUpload = (e) => {
    setShowUpload(prev => !prev)
  }

  return (
    <div>
        <nav className="flex justify-between items-center h-[50px]">
          <h2 className="text-2xl font-bold">Oogle Unphotos</h2>
          {showUpload ? <Upload show={setShowUpload} setPhotos={setPhotos} /> :
          <div className="flex justify-center items-center space-x-5">
            <button onClick={handleUpload}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            </button>
            <button className="rounded-full bg-blue-500 w-[35px] h-[35px] text-white font-bold text-2xl"><Link to="/album">+</Link></button>      
          </div>
          }
        </nav>
        <div className="flex flex-wrap justify-start items-center gap-10 mt-10">
          {photos.map((photo, index) => {
            return (
              <div key={index} className="w-1/6 h-56 flex items-center justify-center overflow-hidden">
                <img src={photo} className="object-cover w-full h-full" />
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default Photos