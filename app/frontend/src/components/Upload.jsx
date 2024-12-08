import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Upload = ({ show, setPhotos }) => {
  const { user } = useAuth();
  const [photo, setPhoto] = useState('');

  const handleShow = () => {
    show(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    show(prev => !prev);

    try {
      const response = await fetch('/api/photos/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: user.username, file: photo })
      });

      const data = await response.json();
      
      if (data.message) {
        alert(data.message);
        return;
      }

      setPhotos(data.photos);
    }
    catch(err) {
      alert(err);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 16000000) {
      alert('File size is too large. Please upload a file less than 16MB.');
      return;
    }

    const base64 = await convertToBase64(file);
    setPhoto(base64);
  };

  return (
    <div className="absolute top-0 right-0 z-5 bg-white">
      <button className="absolute right-5 text-xl font-bold" onClick={handleShow}>x</button>
      <form className="flex flex-col shadow-md p-5" onSubmit={handleSubmit}>
        <input type="file" accept=".jpg, .jpeg, .png" onChange={(e) => handleUpload(e)} className="hover:cursor-pointer"/>
        <br/>
        <br/>
        <input type="submit" value="Upload" className="text-white text-lg bg-primary h-[50px] hover:cursor-pointer"/>
      </form>
    </div>
  );
};

export default Upload;

/* From https://github.com/akashyap2013/ImageToBase64/blob/master/react_app/src/App.jsx */
const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
    };
  });
};