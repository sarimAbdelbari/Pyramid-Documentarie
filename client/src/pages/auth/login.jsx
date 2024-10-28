import { useState } from 'react';
import LogoPngChiali from "/assets/images/LogoPngChiali.png";
import signUpImg from '/assets/images/signUpImg.jpg';
import axios from 'axios';
import { useStateContext } from '@/contexts/ContextProvider';
import LoadingScreen from "@/utils/loadingScreen";
import { sucess_toast, warn_toast } from "@/utils/toastNotification";
import { FaRegEyeSlash } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const { isLoading, setIsLoading ,setUserInfo  ,setIsAuthenticated } = useStateContext();
  const [isShowPassword , setIsShowPassword] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);



      const result = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, values, {
        withCredentials: true
      });
      
      setUserInfo(result.data.user);
      sucess_toast("Connexion réussie");

      navigate("/principal")
        
      setIsAuthenticated(true);
    } catch (err) {
      setIsLoading(false);
      console.log("Erreur de connexion", err.response?.data?.error || "Message d'erreur", err.message);
      warn_toast(err.response?.data?.error || err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
// bg-[#a1a1a148] 
// bg-[#dfdcdc48] 
  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat h-full" style={{ backgroundImage: `url(${signUpImg})` }}>
        <div className="bg-[#61616177]  shadow-2xl shadow-black flex flex-col items-center justify-center px-16 py-6 mx-5 border border-transparent rounded-3xl lg:px-32">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm pointer-events-none">
            <img className="mx-auto h-36 w-auto" src={LogoPngChiali} alt="LogoChiali" />
            <h2 className="mt-10 text-2xl font-semibold text-center text-textDarkColor leading-9 tracking-tight">Login</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-textDarkColor leading-6">
                  Adresse e-mail
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                    className="w-full py-1.5 px-2 text-gray-900 placeholder:text-gray-400 rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-textDarkColor leading-6">
                    Mot de passe
                  </label>
                </div>
                <div className="mt-2 flex justify-center items-center relative">
                  <input
                    id="password"
                    name="password"
                    type={!isShowPassword ? `password` : `text`}
                    autoComplete="current-password"
                    required
                    onChange={(e) => setValues({ ...values, password: e.target.value })}
                    className=" w-full py-1.5 px-2 text-gray-900 placeholder:text-gray-400 rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {!isShowPassword ? <LuEye  onClick={()=> setIsShowPassword(!isShowPassword)} className='absolute top-50 right-2   text-textLightColor text-lg font-semibold '/> : <FaRegEyeSlash onClick={()=> setIsShowPassword(!isShowPassword)} className='absolute top-50 right-2   text-textLightColor text-lg font-semibold '/>}
                  
                  
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex justify-center w-full px-3 py-1.5 text-md font-semibold text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 leading-6"
                >
                  Login
                </button>
              </div>
            </div>

            {/* <p className="mt-10 text-center text-xl text-white cursor-pointer ">
              Reset Pasword 
            </p> */}
            <p className="mt-10 text-center text-sm text-textDarkColor">
              Conditions générales {'Link To It'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
