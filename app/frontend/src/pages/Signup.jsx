import { Link } from 'react-router-dom';
import { signupRoute } from '../constants/constants';
import Form from '../components/Form.jsx';

const Signup = () => {

  return (
		<div className="flex justify-center items-center h-full">
			<div className="w-[500px] h-[500px] border border-black rounded relative p-5">
				<h1 className="font-bold text-3xl">Sign Up</h1>
        <Form
          route={signupRoute}
          successMsg="Successfully signed up"
          value="Sign up"
        />
			<p className="absolute bottom-2 right-2">Already have an account? <Link to="/login" className="text-blue-700 underline hover:cursor-pointer">Log in</Link></p>
			</div>
		</div>
  );
};

export default Signup;