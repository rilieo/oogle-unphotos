import { useState } from 'react';
import { uploadRoute } from '../constants.js';
import { postData } from '../lib/db.js';

const Upload = ({ user, show, setShow, refetch }) => {
  const [photo, setPhoto] = useState('');
  const [uploading, setUploading] = useState(false);

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

  const handleShow = () => {
    setShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUploading(true);
    const data = await postData(uploadRoute, { user: user.username, file: photo });

    if (!data) return;

    setShow(false);
    setUploading(false);

    refetch();
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
    <div className={`${show ? 'block' : 'hidden'} absolute top-0 right-0 z-5 bg-white`}>
      <button className="absolute right-5 text-xl font-bold" onClick={handleShow}>x</button>
      <form className="flex flex-col shadow-md p-5" onSubmit={handleSubmit}>
        <input type="file" accept=".jpg, .jpeg, .png" onChange={(e) => handleUpload(e)} className="hover:cursor-pointer"/>
        <br/>
        <p className={`${uploading ? 'block' : 'hidden'} text-md`}>Uploading...</p>
        <br/>
        <input type="submit" value="Upload" className="text-white text-lg bg-primary h-[50px] hover:cursor-pointer"/>
      </form>
    </div>
  );
};

export default Upload;