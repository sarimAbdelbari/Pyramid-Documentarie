import { useState } from 'react'
import LogoPngChiali from "../../../public/assets/images/LogoPngChiali.png";
import signUpImg from '../../../public/assets/images/signUpImg.jpg';
import axios from 'axios';
import {useStateContext} from '@/contexts/ContextProvider';
import LoadingScreen from "@/utils/loadingScreen"
import {sucess_toast, warn_toast} from "@/utils/toastNotification"
// import { useAuthContext } from '../../hooks/useAuthContext';
const Login = () => {

  const {isLoading, setIsLoading } = useStateContext();

  // const { dispatch } = useAuthContext();

  const [values,setValues] = useState({
    email:'',
    password:''
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);

    const result = await axios.post('http://localhost:5000/api/auth/login', values, {
      withCredentials: true // Important: Include credentials in request
    });

  
    sucess_toast("Connexion réussie");


    localStorage.setItem('userInfo', JSON.stringify(result.data.user));

    setTimeout(() => {
      window.location.href = "/";
    },1000)
     
   } catch (err) {
     setIsLoading(false);
     // TODO: handle the error to show an error message
     console.log("Erreur de connexion", err.response?.data?.error || "Message d'erreur" ,  err.message)
     warn_toast( err.response?.data?.error ||  err.message);
    } finally {
      setIsLoading(false);
    }
    
  }

  return (
    <>
     {isLoading && <LoadingScreen />}
    <div className="min-h-screen flex h-full justify-center items-center 	" style={{ backgroundImage: `url(${signUpImg})`, backgroundSize: 'cover' , backgroundRepeat:'no-repeat' , backgroundPosition: 'center'}}>
      <div className=" bg-[#dfdcdc62] shadow-2xl shadow-black flex justify-center items-center flex-col px-16 mx-5 border border-transparent rounded-3xl lg:px-32 py-6  ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-36 w-auto pointer-events-none"
              src={LogoPngChiali}
              alt="LogoChiali"
              />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Adresse e-mail
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e)=> setValues({...values , email:e.target.value})}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Mot de passe
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e)=> setValues({...values , password:e.target.value})}

                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                  Login
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-800">
              Conditions générales {'Link To It'}
            </p>
          </div>
        </div>
                  </div>
    </>
  )
}

export default Login;