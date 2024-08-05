import Navbar from '../../components/navbar';
import SideBar from '../../components/sidebar';

const Dashboard = () => {

    return (
        <div className='min-h-screen bg-mainLightBg dark:bg-secDarkBg '>  
        <Navbar/>
        <SideBar/>
        </div>
    )
}

export default Dashboard;