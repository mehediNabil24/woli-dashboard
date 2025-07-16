/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';

import { Outlet } from 'react-router';
import BreadCrumb from '../BreadCrumb';
import SideBar from './navigationBar/SiderBar';
import TopBar from './navigationBar/TopBar';




const DashboardLayout = ({ navLink }: { navLink: any }) => {
    // const user = null
    const [isOpen, setIsOpen] = useState(false)
    const [isShort, setIsShort] = useState(true)

    const navRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsOpen(false)
                // setIsShort(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [navRef])





    return (
        <div className='flex'>
            <div className='max-h-screen h-full sticky top-0 z-50 '>
                <SideBar dark={true} setIsShort={setIsShort} additionalRoutes={null} navLink={navLink} isOpen={isOpen} isShort={isShort} navRef={navRef} />
            </div>
            <div className='w-full'>
                <div className='sticky top-0 z-40'>
                    <TopBar dark={true} setIsOpen={setIsOpen} isOpen={isOpen} />
                </div>
                <div className='p-4 min-h-screen space-y-2'>
                    <BreadCrumb />
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;