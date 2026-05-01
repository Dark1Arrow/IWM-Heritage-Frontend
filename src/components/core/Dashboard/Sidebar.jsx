import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loading from '../../common/Loading.jsx'
import { IoMdClose } from "react-icons/io"
import { HiMenuAlt1 } from "react-icons/hi"
import { setOpenSideMenu, setScreenSize } from '../../../redux/api/slices/sidebarSlice.js'
import SidebarLinks from './SidebarLinks'
import { sidebarLinks,navbarLinks } from '../../../../data/dashboardLinks.js'
import { VscSignOut } from 'react-icons/vsc'
import ConformationModel from '../../common/ConformationModel.jsx'
import { logout } from '../../../redux/api/operation/authApi.js'

const Sidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, loading: profileLoading } = useSelector((state) => state.profile)
    const { loading: authLoading } = useSelector((state) => state.auth)

    const [confirmationModel, setConfirmationModel] = useState()
    const { openSideMenu, screenSize } = useSelector((state) => state.sidebar)

    useEffect(() => {
        try {
            const width = window.innerWidth
            const handleResize = () => dispatch(setScreenSize())
            window.addEventListener("resize", handleResize)
            handleResize()
            return () => window.removeEventListener("resize", handleResize)
        } catch (error) {
            console.log(error)
        }

    }, [])

    useEffect(() => {
        try {
            if (screenSize <= 640) {
                dispatch(setOpenSideMenu(false))
            } else {
                dispatch(setOpenSideMenu(true))
            }
        } catch (error) {
            // console.log(error)
        }
    }, [screenSize])

    if (profileLoading || authLoading) {
        return <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-gray-700 bg-gray-800">
            <Loading />
        </div>
    }
    return (
        <>
            <div className="sm:hidden text-white absolute left-7 top-3 cursor-pointer " onClick={() => dispatch(setOpenSideMenu(!openSideMenu))}>
                {openSideMenu ? <IoMdClose size={33} /> : <HiMenuAlt1 size={33} />}
            </div>

            {
                openSideMenu &&
                <div className='flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-[#95846A] py-10 "'>
                    <div className='flex flex-col mt-6'>
                        {navbarLinks.map((link) => {
                            if(link.type && user.accountType !== link.type ) return null
                            return (
                                <SidebarLinks className="sm:hidden" key={link.id} link={link} iconName={link.icon} />
                            )
                        })}
                        {sidebarLinks.map((link) => {
                            if(link.type && user.accountType !== link.type ) return null
                            return (
                                <SidebarLinks key={link.id} link={link} iconName={link.icon} />
                            )
                        })}
                        
                    </div>

                    <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-gray-700">
                        <div className='flex flex-col'>
                            <SidebarLinks
                                link={{ name: "Settings", path: "/dashboard/settings" }}
                                iconName={"VscSettingsGear"}
                            />
                            <button
                                onClick={() => setConfirmationModel({
                                    text1: "Are you sure ?",
                                    text2: "You will be logout from your account.",
                                    btn1Text: "Logout",
                                    btn2Text: "Cancel",
                                    btn1Handler: () => dispatch(logout(navigate)),
                                    btn2Handler: () => setConfirmationModel(null),
                                })}
                            >
                                <div className="flex items-center gap-x-2 px-8 py-2 text-sm font-medium text-[#DD435D] relative">
                                    <VscSignOut className='text-lg' />
                                    <span>Logout</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            }

            {confirmationModel && <ConformationModel modelData={confirmationModel} />}
        </>
    )
}

export default Sidebar
