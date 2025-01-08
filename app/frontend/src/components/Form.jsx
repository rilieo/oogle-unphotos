import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { postData } from '../lib/db';
import { eye, eyehide } from '../assets';
import toast from 'react-hot-toast';

const Form = ({ route, successMsg, value }) => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: ''
  });
  const { setUser } = useAuth();
  const [type, setType] = useState('password');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo.username || !userInfo.password) {
      toast.error('Please fill out all fields');
      return;
    }

    const data = await postData(route, userInfo);

		if (data.error) {
      toast.error(data.error);
      return;
    }

    toast.success(successMsg);
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  const toggleVisibility = (e) => {
    e.preventDefault();
    setType(type === 'text' ? 'password' : 'text');
  };

  return (
    <form className="flex flex-col mt-10" onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" className="h-[50px] w-full border-b-2 p-2" onChange={(e) => setUserInfo({...userInfo, username: e.target.value})}/>
      <div className="relative">
        <button onClick={toggleVisibility} className="absolute top-3 right-1">
          <img src={type === 'password' ? eye : eyehide} className="w-6 h-6"/>
        </button>
        <input type={type} name="password" placeholder="Password" className="h-[50px] w-full border-b-2 p-2" onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}/>
      </div>
      <input type="submit" value={value} className="h-[50px] bottom-2 bg-primary text-white font-bold cursor-pointer w-full mt-10 hover:bg-blue-600"/>
    </form>
  );
};

export default Form;