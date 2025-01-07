import { useRef, useState } from 'react';
import { uploadRoute } from '../../constants/constants';
import { postData } from '../../lib/db.js';
import toast from 'react-hot-toast';

const Upload = ({ user, show, setShow, refetch }) => {
  const [photo, setPhoto] = useState('');
  const inputRef = useRef(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      toast.error('Please upload a photo');
      return;
    }

    setUploading(true);
    const data = await postData(uploadRoute, { user: user.username, file: photo });

    if (data.error) {
      toast.error(data.error);
      return;
    }

    setShow(false);
    setUploading(false);
    setPhoto('');
    inputRef.current.value = '';

    refetch();
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file.size > 16000000) {
      toast.error('File size is too large. Please upload a file less than 16MB');
      return;
    }

    const base64 = await convertToBase64(file);
    setPhoto(base64);
  };

  return (
    <div className={`${show ? 'block' : 'hidden'} absolute top-0 right-0 z-5 bg-white`}>
      <button className="absolute right-5 text-2xl font-bold" onClick={() => setShow(false)}>x</button>
      <form className="flex flex-col shadow-md p-5 mt-5" onSubmit={handleSubmit}>
        <input type="file" accept=".jpg, .jpeg, .png" ref={inputRef} onChange={(e) => handleUpload(e)} className="hover:cursor-pointer mb-8"/>
        <p className={`${uploading ? 'block' : 'hidden'} text-md mb-8`}>Uploading...</p>
        <input type="submit" value="Upload" className="text-white text-lg bg-primary h-[50px] hover:cursor-pointer"/>
      </form>
    </div>
  );
};

export default Upload;