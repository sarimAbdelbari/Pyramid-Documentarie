
const GroopCard = ({ groop, onDelete }) => {

    return (
      <div className=" bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 my-4 flex flex-col justify-between min-w-96 ">
        <h2 className="text-2xl font-semibold mb-4 text-center text-textSecLightColor ">{groop.groopName}</h2>
        <div className="">

        <div className="mb-4">
          <h3 className="text-lg font-medium">Routes & Permissions:</h3>
          
          <ul className="list-disc list-inside">
            {groop.groopRoutes.map((routePermission, index) => (
                <li key={index}>
                <span>{routePermission?.route?.path} - {routePermission?.permission}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium">Users :</h3>
          <ul className="list-disc list-inside">
            {groop.groopUsers.map((user, index) => (
                <li key={index}>
                <span>{user.userName} - {user?.email}</span>
              </li>
            ))}
          </ul>
        </div>
            </div>
        <button
          onClick={() => onDelete(groop._id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>
      </div>
    );
  };
  

export default GroopCard