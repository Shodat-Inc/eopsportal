import React, { useState, useRef, useEffect } from "react";
import Layout from "../../../components/Layout";
import Image from "next/image";
import EditProfile from "./editprofile";
import ManageTeams from "./manageteams";
import Notification from "./notification";
import ChangePassword from "./changepassword";
import ChangePhone from "./changePhone";
import DeleteAccount from "./deleteaccount";
import RoleManagement from "./rolemanagement";

export default function MyAccount() {
    const [tab, setTab] = useState(1);
    // Toggle Tab function
    const toggleTab = (item: any) => {
        setTab(item)
    }

    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%] min-h-full rounded-xl mt-3 px-4 py-4 bg-gray-966">

                {/* Title */}
                <div className="columns-2 flex justify-between items-center mb-7">
                    <p className="text-black text-lg font-semibold">Manage My Account</p>
                </div>

                {/* Tabs */}
                <div className="flex justify-start items-center z-[1] relative top-[1px] text-sm">
                    <button
                        onClick={() => toggleTab(1)}
                        className={`rounded-tr-xl rounded-tl-xl mr-1 h-[48px] min-w-[100px] px-4 inline-flex jsutify-center items-center bg-white font-semibold ${tab === 1 ? "bg-white border border-[#E1E1E1] border-b-0" : "bg-yellow-951 bg-opacity-50 hover:bg-opacity-100"}`}>
                        Manage Team
                    </button>
                    <button
                        onClick={() => toggleTab(6)}
                        className={`rounded-tr-xl rounded-tl-xl mr-1 h-[48px] min-w-[100px] px-4 inline-flex jsutify-center items-center bg-white font-semibold ${tab === 6 ? "bg-white border border-[#E1E1E1] border-b-0" : "bg-yellow-951 bg-opacity-50 hover:bg-opacity-100"}`}>
                        Role Management
                    </button>
                    <button
                        onClick={() => toggleTab(2)}
                        className={`rounded-tr-xl rounded-tl-xl mr-1 h-[48px] min-w-[100px] px-4 inline-flex jsutify-center items-center bg-white font-semibold ${tab === 2 ? "bg-white border border-[#E1E1E1] border-b-0" : "bg-yellow-951 bg-opacity-50 hover:bg-opacity-100"}`}>
                        My Profile
                    </button>
                    <button
                        onClick={() => toggleTab(8)}
                        className={`rounded-tr-xl rounded-tl-xl mr-1 h-[48px] min-w-[100px] px-4 inline-flex jsutify-center items-center bg-white font-semibold ${tab === 8 ? "bg-white border border-[#E1E1E1] border-b-0" : "bg-yellow-951 bg-opacity-50 hover:bg-opacity-100"}`}>
                        Notification
                    </button>

                    {/* <button
                        onClick={() => toggleTab(3)}
                        className={`rounded-tr-xl rounded-tl-xl mr-1 h-[48px] min-w-[100px] px-4 inline-flex jsutify-center items-center bg-white font-semibold ${tab === 3 ? "bg-white border border-[#E1E1E1] border-b-0" : "bg-yellow-951 bg-opacity-50 hover:bg-opacity-100"}`}>
                        Change Password
                    </button>
                    <button
                        onClick={() => toggleTab(4)}
                        className={`rounded-tr-xl rounded-tl-xl mr-1 h-[48px] min-w-[100px] px-4 inline-flex jsutify-center items-center bg-white font-semibold ${tab === 4 ? "bg-white border border-[#E1E1E1] border-b-0" : "bg-yellow-951 bg-opacity-50 hover:bg-opacity-100"}`}>
                        Change Phone Number
                    </button>
                    <button
                        onClick={() => toggleTab(5)}
                        className={`rounded-tr-xl rounded-tl-xl mr-1 h-[48px] min-w-[100px] px-4 inline-flex jsutify-center items-center bg-white font-semibold ${tab === 4 ? "bg-white border border-[#E1E1E1] border-b-0" : "bg-yellow-951 bg-opacity-50 hover:bg-opacity-100"}`}>
                        Change Email Address
                    </button> */}

                    <button
                        onClick={() => toggleTab(7)}
                        className={`rounded-tr-xl rounded-tl-xl mr-1 h-[48px] min-w-[100px] px-4 inline-flex jsutify-center items-center bg-white font-semibold ${tab === 4 ? "bg-white border border-[#E1E1E1] border-b-0" : "bg-yellow-951 bg-opacity-50 hover:bg-opacity-100"}`}>
                        Delete My Account
                    </button>
                </div>

                {/* Tab Contect */}
                <div className="w-full min-h-[500px] bg-white border border-gray-957 overflow-hidden1 rounded-tr-xl rounded-br-xl rounded-bl-xl">
                    <div className=" bg-white w-full h-full rounded-tr-xl rounded-br-xl rounded-bl-xl overflow-hidden">
                        {tab === 1 && <ManageTeams />}
                        {tab === 2 && <EditProfile />}
                        {tab === 3 && <Notification />}
                        {tab === 4 && <ChangePassword />}
                        {tab === 5 && <ChangePhone />}
                        {tab === 6 && <RoleManagement />}
                        {tab === 7 && <DeleteAccount />}
                        {tab === 8 && <Notification />}
                    </div>
                </div>
            </div>

        </div>
    )
}

MyAccount.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}