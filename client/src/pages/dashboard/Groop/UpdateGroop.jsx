import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate for redirection
import { error_toast, sucess_toast } from "@/utils/toastNotification";

const UpdateGroop = () => {
    const { id } = useParams(); // Get the group ID from the URL
    const navigate = useNavigate(); // For redirection
    const [groopName, setGroopName] = useState('');
    const [routes, setRoutes] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedRoutes, setSelectedRoutes] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [routePermissionPair, setRoutePermissionPair] = useState({ route: null, permission: null });

    const optionsUsers = users.map((user) => ({
        value: user._id,
        label: user.userName,
    }));

    const optionsPermmissions = [
        { value: 'Show', label: 'Show' },
        { value: 'noShow', label: 'noShow' },
    ];

    const optionsRoutes = routes
        .filter(route => !selectedRoutes.some(pair => pair.route === route._id)) // Filter out selected routes
        .map((route) => ({
            value: route,
            label: route.path,
        }));

        const addRoutePermission = () => {
            if (routePermissionPair.route && routePermissionPair.permission) {
                // Check if the route-permission pair is already in the selectedRoutes
                const isDuplicate = selectedRoutes.some(
                    (pair) => pair.route === routePermissionPair.route && pair.permission === routePermissionPair.permission
                );
        
                if (!isDuplicate) {
                    setSelectedRoutes([...selectedRoutes, routePermissionPair]);
                    setRoutePermissionPair({ route: null, permission: null }); // Reset after adding

                } else {
                    error_toast("Cette paire route-autorisation a déjà été ajoutée.");
                }
            }
        };

    const removeRoutePermission = (index) => {
        const updatedRoutes = [...selectedRoutes];
        updatedRoutes.splice(index, 1);
        setSelectedRoutes(updatedRoutes);
    };

    const fetchData = async () => {
        try {
            const [responseRoutes, responseUsers] = await Promise.all([
                axios.get('http://localhost:5000/api/route'),
                axios.get('http://localhost:5000/api/users')
            ]);
            setRoutes(responseRoutes.data);
            setUsers(responseUsers.data);

            if (id) {
                const responseGroop = await axios.get(`http://localhost:5000/api/groop/${id}`);
                setGroopName(responseGroop.data.groopName);
                setSelectedUsers(responseGroop.data.groopUsers.map(user => ({ value: user._id, label: user.userName })));
                setSelectedRoutes(responseGroop.data.groopRoutes);


            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleSubmit = async () => {
        try {
            if (!groopName) {
                error_toast("Nom du groupe doit être renseigné");
                return;
            }
            if (selectedRoutes.length === 0) {
                error_toast("Veuillez ajouter au moins une route");
                return;
            }
            if (selectedUsers.length === 0) {
                error_toast("Veuillez ajouter au moins un utilisateur");
                return;
            }

            await axios.patch(`http://localhost:5000/api/groop/${id}`, {
                groopName,
                groopUsers: selectedUsers.map(user => user.value),
                groopRoutes: selectedRoutes,
            });

            setGroopName("");
            setSelectedRoutes([]);
            setSelectedUsers([]);

            sucess_toast("Groop updated successfully");
            navigate("/dashboard/groop/table"); // Redirect to the table page
        } catch (error) {
            error_toast("Erreur lors de la mise à jour du groupe :");
            console.error('Error:', error.response?.data);
        }
    };

    return (
        <div className='pt-24 min-h-screen'>
            <div className='bg-white dark:bg-mainDarkBg dark:shadow-white flex justify-center flex-col gap-9 items-center py-4 px-8 shadow-xl m-8 rounded-xl'>
                <p className="text-3xl text-textLightColor dark:text-textDarkColor font-semibold">Update Groop</p>
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
                            onChange={setSelectedUsers}
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
                                onChange={(selected) => setRoutePermissionPair(prev => ({ ...prev, permission: selected.value }))}
                                isSearchable
                                placeholder="Select Permission"
                                className="w-full rounded-md focus:outline-none focus:border-primary"
                            />
                            <Select
                                value={optionsRoutes.find(option => option.value === routePermissionPair.route)}
                                onChange={(selected) => setRoutePermissionPair(prev => ({ ...prev, route: selected.value }))}
                                options={optionsRoutes}
                                isSearchable
                                placeholder="Select Route"
                                className="w-full rounded-md focus:outline-none focus:border-primary"
                            />
                            <button onClick={addRoutePermission} className="text-primary hover:text-primary">Add</button>
                        </div>
                        <div className="w-full">
                        <div className="w-full">
                            {selectedRoutes.map((pair, index) => (
                                <div key={index} className="flex justify-between items-center bg-gray-200 p-2 rounded-lg mb-2">
                                    <span>{routes.find(route => route._id === pair.route._id)?.path} - {pair.permission}</span>
                                    <button
                                        onClick={() => removeRoutePermission(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                        </div>
                        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Update Groop</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateGroop;
