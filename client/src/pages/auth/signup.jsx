// import React , {useState} from 'react'
// import LogoPngChiali from "../../assets/images/LogoPngChiali.png";
// import signUpImg from '../../assets/images/signUpImg.jpg';
// import axios from 'axios';
// import {useStateContext} from '../../contexts/ContextProvider';
// import LoadingScreen from "../../utils/loadingScreen"
// import {sucess_toast, error_toast, warn_toast, info_toast} from "../../utils/toastNotification"
//  const SignUp = () => {
 
//    const {isLoading, setIsLoading} = useStateContext();

//    const [values,setValues] = useState({
//      userName:'',
//      email:'',
//      password:''
//    })
// //  
//    const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       setIsLoading(true);
//       const result = await axios.post("http://localhost:5000/api/auth/signup", values);

//       //  this is the old way where i didnt intigrate cookie Parser gpt here show me 

//       // Store the token in localStorage
//       // const token = result.data.token;
//       // localStorage.setItem('token', token);

//       // Display success message
//       sucess_toast("Account created successfully");
//       console.log(result);
      
//       // For example, redirect to dashboard:
//       // Redirect or perform other actions here
//       setTimeout(() => {
      
//         window.location.href = "/main";
//       },1000)
      
//     } catch (err) {
//       setIsLoading(false);
//       console.log("Login error", err.response?.data?.error || "message Error" ,  err.message)
//      warn_toast( err.response?.data?.error ||  err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };
 
 
//    return (
//      <>
//      {isLoading && <LoadingScreen />}
//      <div className="flex min-h-screen justify-center items-center" style={{ backgroundImage: `url(${signUpImg})`, backgroundSize: 'cover' , backgroundRepeat:'no-repeat' , backgroundPosition: 'center'}}>
//        <div className=" bg-[#dfdcdc62] shadow-2xl shadow-black gap-2 flex justify-center items-center flex-col px-16 mx-5 border border-transparent rounded-3xl lg:px-32 py-4  ">
//            <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
//              <img
//                className="mx-auto h-36 w-auto pointer-events-none" 
//                src={LogoPngChiali}
//                alt="LogoChiali"
//                />
//              <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//                Sign Up
//              </h2>
//            </div>
   
//            <div className="mt-2 w-64 ">
//              <form className="space-y-4" action="#" method="POST" onSubmit={handleSubmit}>
//                <div>
//                  <label htmlFor="DisplayName" className="block text-sm font-medium leading-6 text-gray-900">
//                    DisplayName
//                  </label>
//                  <div className="mt-2">
//                    <input
//                      id="DisplayName"
//                      name="DisplayName"
//                      type="text"
//                      autoComplete="DisplayName"
//                      required
//                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                      onChange={(e)=>setValues({...values,userName:e.target.value})}
//                      />
//                  </div>
//                </div>
//                <div>
//                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
//                    Email address
//                  </label>
//                  <div className="mt-2">
//                    <input
//                      id="email"
//                      name="email"
//                      type="email"
//                      autoComplete="email"
//                      required
//                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                      onChange={(e)=>setValues({...values,email:e.target.value})}
 
//                      />
//                  </div>
//                </div>
   
//                <div>
//                  <div className="flex items-center justify-between">
//                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
//                      Password
//                    </label>
                   
//                  </div>
//                  <div className="mt-2">
//                    <input
//                      id="password"
//                      name="password"
//                      type="password"
//                      autoComplete="current-password"
//                      required
//                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                      onChange={(e)=>setValues({...values,password:e.target.value})}
 
//                      />
//                  </div>
//                </div>
   
//                <div>
//                  <button
//                    type="submit"
//                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                    >
//                    Sign in
//                  </button>
//                </div>
//              </form>
   
//              <p className="mt-10 text-center text-sm text-gray-800">
//                Terms And Conditions {'Link To It'}

//              </p>
//            </div>
//          </div>
//        </div>
//      </>
 
//    )
//  }

// export default SignUp