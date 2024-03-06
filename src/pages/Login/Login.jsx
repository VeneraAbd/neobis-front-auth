import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location, "location")
  const fromPage = location.state?.from?.pathname || '/';

  return (
    <div>
      <h1>Login</h1>
      {fromPage}

    </div>
  )
}

export default Login