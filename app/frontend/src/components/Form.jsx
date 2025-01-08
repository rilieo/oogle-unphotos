import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { postData } from '../lib/db';
import toast from 'react-hot-toast';

const Form = ({ route, successMsg, value }) => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: ''
  });
  const { setUser } = useAuth();

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

  return (
    <form className="flex flex-col mt-10" onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" className="h-[50px] border-b-2 p-2" onChange={(e) => setUserInfo({...userInfo, username: e.target.value})}/>
      <input type="password" name="password" placeholder="Password" className="h-[50px] border-b-2 p-2" onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}/>
      <input type="submit" value={value} className="h-[50px] bottom-2 bg-primary text-white font-bold cursor-pointer w-full mt-10 hover:bg-blue-600"/>
    </form>
  );
};

export default Form;