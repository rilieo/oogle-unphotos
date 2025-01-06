import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signupRoute } from '../../constants';
import { postData } from '../../lib/db.js';

const Signup = () => {
	const [userInfo, setUserInfo] = useState({
		username: '',
		password: ''
	});
  const { setUser } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!userInfo.username || !userInfo.password) {
			alert('Please fill out all fields');
			return;
		}
		
		const data = await postData(signupRoute, userInfo);

		if (data.length === 0) return;

		setUser(data);
		localStorage.setItem('user', JSON.stringify(data));
		alert('Sign up successful');
	};

  return (
		<div className="flex justify-center items-center h-full">
			<div className="w-[500px] h-[500px] border border-black rounded relative p-5">
				<h1 className="font-bold text-3xl">Sign Up</h1>
				<form className="flex flex-col mt-10" onSubmit={handleSubmit}>
					<input type="text" name="username" placeholder="username" className="h-[50px] border-b-2 p-2" onChange={(e) => setUserInfo({...userInfo, username: e.target.value})}/>
					<input type="password" name="password" placeholder="password" className="h-[50px] border-b-2 p-2" onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}/>
					<input type="submit" value="Sign Up" className="h-[50px] bottom-2 bg-primary text-white font-bold cursor-pointer w-full mt-10 hover:bg-blue-600"/>
			</form>
			<p className="absolute bottom-2 right-2">Already have an account? <Link to="/login" className="text-blue-700 underline hover:cursor-pointer">Log in</Link></p>
			</div>
		</div>
  );
};

export default Signup;