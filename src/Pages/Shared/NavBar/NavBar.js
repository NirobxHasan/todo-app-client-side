import React from 'react';
import useAuth from '../../../hooks/useAuth';
import AdminHeader from '../../Admin/AdminHeader/AdminHeader';
import Header from '../Header/Header';

const NavBar = () => {
    const { admin } = useAuth();
    return <div>{admin ? <AdminHeader /> : <Header />}</div>;
};

export default NavBar;
