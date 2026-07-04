import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  return (
    <div className="main-container">
      <Sidebar />
      <div className="content-area">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
