import React from 'react';
import AppNavBar from './appNavBar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';
const Layout = (props) => {
    return (
        <div>
           <AppNavBar/>

           {props.children}
           <Toaster position="bottom-center"/>

           <Footer/>
        </div>
    );
};

export default Layout;