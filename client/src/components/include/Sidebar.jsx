import React, { useContext } from 'react'
import * as config from '../../utilities/config'
import { GlobalContext } from '../../context/GlobalStateProvider';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

    const { userType, menuToggle } = useContext(GlobalContext);

    const routes = [
        { path: '/dashboard', link_logo: "bi bi-house", link_name: 'Dashboard', access: 'S' },
        { path: '/studentCourses', link_logo: "bi bi-journal-code", link_name: 'Courses', access: 'S' },
        { path: '/studentHomework', link_logo: "bi bi-card-checklist", link_name: 'Homework', access: 'S' },
        { path: '/curiosityBox', link_logo: "bi bi-bookmark-dash", link_name: 'Curiosity Box', access: 'S' },
        { path: '/studentMessages', link_logo: "bi bi-chat-dots", link_name: 'Messages', access: 'S' },
        { path: '/studentPayments', link_logo: "bi bi-credit-card", link_name: 'Payments', access: 'S' },
        { path: '/studentTests', link_logo: "bi bi-clipboard", link_name: 'Tests', access: 'S' },
        { path: '/studentCertificates', link_logo: "bi bi-patch-check", link_name: 'Certificate', access: 'S' },
        { path: '/studentSettings', link_logo: "bi bi-gear", link_name: 'Settings', access: 'S' },

        { path: '/scheduler', link_logo: "bi bi-calendar", link_name: 'Scheduler', access: 'T' },

        { path: '/adminDashboard', link_logo: "bi bi-house", link_name: 'Dashboard', access: 'admin' },
        { path: '/adminCourses', link_logo: "bi bi-journal-code", link_name: 'Courses', access: 'admin' },
        { path: '/adminAdd', link_logo: "bi bi-person-circle", link_name: 'Add', access: 'admin' },
        { path: '/adminBatchCreation', link_logo: "bi bi-plus-circle", link_name: 'Batch Creations', access: 'admin' },
        { path: '/adminPayments', link_logo: "bi bi-credit-card", link_name: 'Payments', access: 'admin' },
        { path: '/adminTests', link_logo: "bi bi-clipboard", link_name: 'Tests', access: 'admin' },
        { path: '/adminDiscussion', link_logo: "bi bi-chat-quote", link_name: 'Discussion', access: 'admin' },
        { path: '/adminCertificates', link_logo: "bi bi-patch-check", link_name: 'Certificate', access: 'admin' },
        { path: '/adminAnalytics', link_logo: "bi bi-bar-chart", link_name: 'Analytics', access: 'admin' },
        { path: '/adminSettings', link_logo: "bi bi-gear", link_name: 'Settings', access: 'admin' },

      
        // Additional routes
      ];




  return (
    <>
        <section id="sidebar" className={`sidebarcss ${menuToggle ? 'hide' : ''}`} >
            <a href="#" className="brand mt-3">
                <img src={config.API_BASE_URL+"images/logo2.png"} alt="" className="logo img-fluid" id="logo" />
            </a>

            <ul className="side-menu top">
                {
                    routes.filter(route => route.access === userType).map((route, index) => (
                        <NavLink key={index} to={route.path} className={({ isActive }) => (isActive ? 'active' : '')} >
                        {({ isActive }) => (
                            <li className={isActive ? 'active' : ''}>
                                <NavLink to={route.path} className="nav-link">
                                    <i className={route.link_logo}></i>
                                    <span className="text">{route.link_name}</span>
                                </NavLink>
                            </li>
                        )}
                    </NavLink>
                    ))
                }
            </ul>
            <ul className="side-menu">
                <li>
                    <NavLink to="/logout" className="logout">
                        <i className="bi bi-box-arrow-right"></i>
                        <span className="text">Logout</span>
                    </NavLink>
                </li>
            </ul>
        </section>
    </>
  )
}

export default Sidebar