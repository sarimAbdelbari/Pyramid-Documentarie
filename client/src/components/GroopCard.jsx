import { FaEdit } from "react-icons/fa"; 
import { Link } from "react-router-dom";
import Button from "@/components/button";
const GroopCard = ({ groop, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 my-4 flex flex-col justify-between min-w-[320px] w-full md:w-[360px] lg:w-[400px]  duration-300 hover:scale-105 hover:shadow-2xl">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-200">
        {groop.groopName}
      </h2>

      <div className="mb-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 py-1">
            Routes & Permissions:
          </h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
            {groop.groopRoutes.filter(route => route.route.view.includes('PdfReader') || route.route.view.includes('ExcelReader')).map((routePermission, index) => (
              <li key={index} className="py-1">
                <span>{routePermission?.route?.path} - {routePermission?.permission}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 py-1">
            Users:
          </h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
            {groop.groopUsers.map((user, index) => (
              <li key={index} className="py-1">
                <span>{user.userName} - {user?.email}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Link 
          to={`/dashboard/groop/update/${groop._id}`} 
          className="bg-gray-100 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Button Text="Update" Icon={<FaEdit/>}/>
          {/* <FaEdit className="text-blue-500 hover:text-blue-600" size={18} /> */}
        </Link>
        <button
          onClick={() => onDelete(groop._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default GroopCard;
