import React from 'react'
import Navbar from '../../components/navbar';
import SideBar from '../../components/sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from './Users/users';

const Dashboard = () => {

    return (
        <> 
        <Navbar/>
        <SideBar/>
        </>
    )
}

export default Dashboard;