import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Photo from '../components/Photo';

const Album = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const { user } = useAuth();

  const fetchPhotos = async () => {
    try {
      const response = await fetch(`/api/photos?user=${user.username}`);
      const data = await response.json();
      
      if (data.message) {
        console.error(data.message);
        return;
      }

      setPhotos(data.photos);

    } catch (error) {
      alert(error)
      console.error('Error fetching photos:', error);
    }
  };  

  const handleAdd = (photo) => {
    const newSelectedPhotos = [...selectedPhotos, photo];
    setSelectedPhotos(newSelectedPhotos);
  }

  const handleSelect = (e) => {
    e.preventDefault();
    fetchPhotos();
  }

  const handleCreate = async (e) => {
    try {
      const response = await fetch('/api/albums/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          images: selectedPhotos.map(photo => photo._id)
        })
      });

      const data = await response.json();

      if (data.message) {
        console.error(data.message);
        return;
      }

      alert('Album created successfully');
    } catch(error) {
      alert('Error creating album');
      console.error('Error creating album', error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
      {photos.length > 0 ? 
        <div className="flex flex-wrap justify-start items-center gap-10 p-5">
          {photos.map((photo, index) => (
            <Photo key={index} index={index} photo={photo} handleClick={handleAdd} />
          ))}
        </div> :
        <form className="flex flex-col justify-center items-center">
          <input type="text" placeholder="Add a title" className="border border-black rounded-xl p-2 mb-10"/>
          <button className="border p-2 rounded bg-blue-500 hover:bg-blue-600 text-white" onClick={handleSelect}>+ select photos</button>
        </form>
      }
      <button type="submit" className="border p-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-bold mt-10" onClick={handleCreate}>Create Album</button>
    </div>
  )
}

export default Album