import { MutatingDots } from 'react-loader-spinner'

const LoadingScreen = () => {
  return (
    <div className='min-h-screen z-50 absolute top-0 left-0 w-full h-full flex justify-center items-center bg-[#74747444]'>
        <MutatingDots 
          height="125"
          width="125"
          color="#0e67aa"
          secondaryColor="#e40c24"
          radius="14"
        />

    </div>
  )
}

export default LoadingScreen