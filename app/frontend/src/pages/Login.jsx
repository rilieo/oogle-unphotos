import { Link } from 'react-router-dom';
import { loginRoute } from '../constants/constants';
import Form from '../components/Form.jsx';

const Login = () => {

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-[500px] h-[500px] border border-black rounded relative p-5">
        <h1 className="font-bold text-3xl">Login</h1>
        <Form
          route={loginRoute}
          successMsg="Successfully logged in"
          value="Log in"
        />
        <p className="absolute bottom-2 right-2">Don&apos;t have an account? <Link to="/signup" className="text-blue-700 underline hover:cursor-pointer">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;