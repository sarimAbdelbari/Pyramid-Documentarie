import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from '@/contexts/ContextProvider';
import { LuPenTool, LuRefreshCw } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePlaylistAddCheckCircle } from "react-icons/md";

const View7 = ({ route, preview }) => {
    const [data, setData] = useState([]);
    const { routeData } = useStateContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/route/parrentId/${route._id}`
                );
                if (preview) {
                    setData(response.data);
                } else {
                    const responseIds = response.data.map(item => item._id);
                    const filteredRoutes = routeData.filter(route => responseIds.includes(route._id));
                    setData(filteredRoutes);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [route, routeData, preview]);

    const getImageSrc = src => {
        return src
            ? `${import.meta.env.VITE_PUBLIC_URL1}/${src}`
            : `${import.meta.env.VITE_PUBLIC_URL1}/imageHolder.jpg`;
    };

    const renderSection = (title, icon, color, cycle) => (
        <div className="flex flex-col justify-center rounded-xl shadow-2xl m-4 py-4 px-7 w-full h-full dark:shadow-md dark:shadow-white bg-mainLightBg dark:bg-secDarkBg">
            <div className="flex gap-4 items-center my-3">
                <div className={`bg-${color}-700 text-white rounded-full p-1`}>
                    {icon}
                </div>
                <h3 className="text-textLightColor dark:text-textDarkColor text-2xl font-semibold font-serif">
                    {title}
                </h3>
            </div>
            <div className="my-3 flex flex-col gap-5">
                {data && data.filter(item => item.data.cycle === cycle).map((item, index) => (
                    <Link to={item.path} key={item._id} className="w-full flex gap-4 justify-between items-center">
                        <div className="flex gap-2 items-start justify-center flex-col w-full p-2">
                            <h2 className="text-xl font-bold text-textLightColor dark:text-textDarkColor">
                                {index + 1} - {item.title}
                            </h2>
                            <p className="pl-2 text-sm text-gray-600 dark:text-textSecDarkColor">
                                {item.details}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {renderSection('Plan', <LuPenTool className="m-1 text-lg xl:text-2xl font-bold" />, 'red', 'plan')}
            {renderSection('Do', <IoSettingsOutline className="m-1 text-lg xl:text-2xl font-bold" />, 'green', 'do')}
            {renderSection('Check', <MdOutlinePlaylistAddCheckCircle className="m-1 text-lg xl:text-2xl font-bold" />, 'blue', 'check')}
            {renderSection('Act', <LuRefreshCw className="m-1 text-lg xl:text-2xl font-bold" />, 'yellow', 'act')}
        </div>
    );
};

export default View7;
