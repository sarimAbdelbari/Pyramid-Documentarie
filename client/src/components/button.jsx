const Button = ({ Text, Icon }) => {
  return (
    <button className="relative inline-flex shadow-2xl  items-center justify-center px-6 py-3 text-lg font-medium transition duration-300 ease-out border-2 rounded-3xl group bg-gray-50 dark:bg-gray-800 border-gray-800 dark:border-gray-600 hover:bg-gray-900 dark:hover:bg-gray-100 text-gray-800 dark:text-gray-100 hover:text-white dark:hover:text-black ">
      <span className="absolute inset-0 transition-all duration-500 ease-out transform -translate-x-full group-hover:translate-x-0 groop-hover:opacity-100 opacity-0 hidden bg-gray-900 dark:bg-gray-100 rounded-lg"></span>
      <span className="relative flex items-center gap-2 z-10 text-center">
        {Text}
        {Icon}
      </span>
    </button>
  );
};

export default Button;
