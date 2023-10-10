import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
export default function SuspendModal(props: any) {
    const closeModal = () => {
        console.log({
            item: "item"
        })
        props.handleClick("Nothing")
    }
    return (
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
                                onClick={closeModal}
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
                                <p className="flex justify-center items-center text-lg">Are you sure want to <span className="text-[#EF0000] mx-1 font-semibold">Suspend</span> this user?</p>
                                <div className="mt-10 relative flex justify-center items-center w-full">
                                    <button
                                        className="border border-black rounded-lg bg-black text-white text-lg w-[70px] h-[47px] mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                                        onClick={closeModal}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        className="border border-black rounded-lg bg-white text-black text-lg w-[70px] h-[47px] hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300"
                                        onClick={closeModal}
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
    )
}