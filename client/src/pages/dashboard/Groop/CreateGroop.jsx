import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { error_toast, sucess_toast } from "@/utils/toastNotification";

const CreateGroop = () => {
    const [groopName, setGroopName] = useState('');
    const [routes, setRoutes] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedRoutes, setSelectedRoutes] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [routePermissionPair, setRoutePermissionPair] = useState({ route: null, permission: null });

    const fetchData = async () => {
        try {
            const responseRoutes = await axios.get('http://localhost:5000/api/route');
            const responseUsers  = await axios.get('http://localhost:5000/api/users');

            setRoutes(responseRoutes.data);
            setUsers(responseUsers.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const optionsRoutes = routes.map((route) => ({
        value: route._id,
        label: route.path,
    }));

    const optionsUsers = users.map((user) => ({
        value: user._id,
        label: user.userName,
    }));

    const optionsPermmissions = [
        { value: 'Show', label: 'Show' },
        { value: 'noShow', label: 'noShow' },
    ]

    const onChangeRoute = (selectedOption) => {
        setRoutePermissionPair({ ...routePermissionPair, route: selectedOption.value });
    };

    const onChangeUser = (selectedOption) => {
        setSelectedUsers(selectedOption);
    };

    const onChangePermmission = (selectedOption) => {
        setRoutePermissionPair({ ...routePermissionPair, permission: selectedOption.value });
    };

    const addRoutePermission = () => {
        if (routePermissionPair.route && routePermissionPair.permission) {
            setSelectedRoutes([...selectedRoutes, routePermissionPair]);
            setRoutePermissionPair({ route: null, permission: null }); // Reset after adding
        }
        setRoutePermissionPair({ ...routePermissionPair, permission: "" });
        setRoutePermissionPair({ ...routePermissionPair, route: "" });
    };

    const removeRoutePermission = (index) => {
        const updatedRoutes = [...selectedRoutes];
        updatedRoutes.splice(index, 1);
        setSelectedRoutes(updatedRoutes);
    };

    const handleSubmit = async () => {
        try {

            const response = await axios.post('http://localhost:5000/api/groop', {
                groopName,
                groopUsers: selectedUsers.map(user => user.value),
                groopRoutes: selectedRoutes,
            });


           

            await axios.patch('http://localhost:5000/api/users/updateMany', {
                ids: selectedUsers.map(user => user.value),
                groopName: response.data._id
            });
            

            setGroopName("");
            setSelectedRoutes([]);
            setSelectedUsers([]);
            sucess_toast("Groop created successfully");
            
            window.location.href = "/dashboard/groop/table";


        } catch (error) {
            error_toast("Erreur lors de la création du groupe   :")
           
                console.error('Error:', error.response?.data); // Log the detailed error response
            
            
        }
    };



    return (
        <div className='pt-24 min-h-screen'>
            <div className='bg-white dark:bg-mainDarkBg dark:shadow-white flex justify-center flex-col gap-9 items-center py-4 px-8 shadow-xl m-8 rounded-xl'>
                <p className="text-3xl text-textLightColor dark:text-textDarkColor font-semibold">Create Groop</p>
                <div className="w-full flex flex-col gap-5 justify-center items-center">
                    <input
                        type="text"
                        placeholder="Groop Name"
                        className="w-full border border-gray-300 rounded-lg p-2 mt-4"
                        value={groopName}
                        onChange={(e) => setGroopName(e.target.value)}
                    />
                    <div className="my-4 flex flex-col justify-center items-center gap-7 w-full">
                        <p className="mb-2 text-2xl font-normal">Users</p>
                        <Select
                            value={selectedUsers}
                            onChange={onChangeUser}
                            options={optionsUsers}
                            isSearchable
                            isMulti={true}
                            placeholder="Select Users"
                            className="w-full rounded-md focus:outline-none focus:border-primary"
                        />
                        <p className="mb-2 text-2xl font-normal">Route</p>
                        <div className="flex gap-4 w-full bg-mainLightBg dark:bg-mainDarkBg rounded-lg px-4 py-6">
                            <Select
                                value={optionsPermmissions.find(option => option.value === routePermissionPair.permission)}
                                options={optionsPermmissions}
                                onChange={onChangePermmission}
                                isSearchable
                                placeholder="Select Permission"
                                className="w-full rounded-md focus:outline-none focus:border-primary"
                            />
                            <Select
                                value={optionsRoutes.find(option => option.value === routePermissionPair.route)}
                                onChange={onChangeRoute}
                                options={optionsRoutes}
                                isSearchable
                                placeholder="Select Route"
                                className="w-full rounded-md focus:outline-none focus:border-primary"
                            />
                            <button onClick={addRoutePermission} className="text-primary hover:text-primary">Add</button>
                        </div>
                        <div className="w-full">
                            {selectedRoutes.map((pair, index) => (
                                <div key={index} className="flex justify-between items-center bg-gray-200 p-2 rounded-lg mb-2">
                                    <span>{routes.find(route => route._id === pair.route)?.path} - {pair.permission}</span>
                                    <button
                                        onClick={() => removeRoutePermission(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Create Groop</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateGroop;
