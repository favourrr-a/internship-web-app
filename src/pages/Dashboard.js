import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
    const { username } = useParams();
    return(
        <>
        <h2> Welcome to your dashboard page, {username}!</h2></>
    )
}

export default Dashboard;
