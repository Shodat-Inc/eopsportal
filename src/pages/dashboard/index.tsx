import React, { useState, useRef, useEffect } from "react";
import Layout from "../../components/Layout";
import Template from "./template";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    const [showModal, setShowModal] = useState(true);
    return (
        <div className="flex font-OpenSans">

            <div className="w-[84%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">Dashboard</p>
                </div>
            </div>

            <div className="w-[16%] pl-5">
                <Template />
            </div>


            {/* ===== Invite/Manage team modal Starts ===== */}
            {showModal ?
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative my-6 w-[580px]">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-2">
                                    <h3 className="text-lg font-medium"></h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <Image
                                            src="/img/close.svg"
                                            alt="close"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative pt-2 pb-8 flex-auto">
                                    <div className="flex justify-start items-center flex-wrap flex-col">
                                        <p className="flex justify-center items-center text-lg">
                                        Do you want to <span className="text-new px-1">Invite Or Manage</span> your team?
                                        </p>
                                        <div className="mt-10 relative flex justify-center items-center w-full">
                                            <Link
                                                href="/dashboard/myaccount"
                                                className="border border-black rounded-lg bg-black text-white text-lg w-[70px] h-[47px] mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951 flex justify-center items-center"
                                                onClick={() => { setShowModal(false); }}
                                            >
                                                Yes
                                            </Link>
                                            <button
                                                className="border border-black rounded-lg bg-white text-black text-lg w-[70px] h-[47px] hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300"
                                                onClick={() => { setShowModal(false); }}
                                            >
                                                No
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
                </>
                : null}
            {/* ===== Invite/Manage team modal Ends ===== */}

        </div>

    );
}

Home.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}