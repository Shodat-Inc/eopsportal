import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Link from "next/link";
import Image from "next/image";
const authenticationType = [
    "Basic", "Client Certificate", "Active Directory OAuth", "Raw", "Managed Identity"
];
export default function ImageConfig() {
    const [toggleDrop, setToggleDrop] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [defaultMethod, setDefaultMethod] = useState("GET");
    const [authType, setAuthType] = useState(false);
    const [method, setMethod] = useState(false);
    const [defaultAuthType, setDefaultAuthType] = useState(authenticationType[0]);
    const toggleDropFunction = () => {
        setToggleDrop(!toggleDrop);
    }
    const toggleMethod = () => {
        setMethod(!method)
    }
    const selectMethod = (item: any) => {
        setDefaultMethod(item);
        setMethod(false);
    }
    const toggleAuthType = () => {
        setAuthType(!authType);
    }
    const selectAuthType = (item: any) => {
        setDefaultAuthType(item);
        setAuthType(false);
    }
    return (
        <>
            <div className="relative">
                <button
                    onClick={toggleDropFunction}
                    className={`border-2 rounded-lg border-gray-969 h-[44px] px-2 py-1 flex justify-center items-center mr-4 relative ${toggleDrop ? 'bg-gray-969' : 'bg-white'}`}
                >
                    <Image
                        src="/img/upload-black.svg"
                        alt="Upload"
                        height={24}
                        width={24}
                    />
                    <span className="text-sm ml-2 mr-2 font-semibold">Images Config</span>
                    <Image
                        src="/img/more-vertical.svg"
                        alt="more"
                        height={24}
                        width={24}
                    />
                </button>
                {toggleDrop &&
                    <div className="bg-black text-white border overflow-hidden border-black rounded-xl w-56 flex flex-col flex-wrap items-start justify-start shadow-sm absolute top-[50px] right-[14px] z-[1]">
                        <button
                            onClick={() => { setShowModal(true); setToggleDrop(false) }}
                            className="text-white text-sm hover:bg-white hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left">
                            <span>API Configuration</span>
                        </button>
                        <button
                            onClick={() => setToggleDrop(false)}
                            className="text-white text-sm hover:bg-white hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left">
                            <span>Upload Images</span>
                        </button>
                    </div>}
            </div>


            {/* ----- OBJECT MODAL STARTS ----- */}
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative my-6 w-[720px] rounded-lg">
                            <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                                <div className={`bg-white overflow-hidden shadow-lg rounded-lg`}>
                                    <div className="relative h-full w-full p-5">
                                        <div className="w-full relative mb-3">
                                            <button
                                                className="absolute right-0 top-0"
                                                onClick={() => setShowModal(false)}
                                            >
                                                <Image
                                                    src="/img/x-thin.svg"
                                                    alt="close"
                                                    height={32}
                                                    width={32}
                                                    className=""
                                                />
                                            </button>

                                            <div className="flex justify-start items-end h-full">
                                                <h2 className="font-semibold text-lg">API Configuration</h2>
                                            </div>
                                        </div>

                                        <div className="w-full relative bg-white">

                                            <div className={`mb-7 ${styles.form__wrap} ${styles.form__wrap_large}`}>
                                                <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                    <input
                                                        type="text"
                                                        id="url"
                                                        name="url"
                                                        className={`${styles.form__field} border border-black`}
                                                        placeholder="URL"
                                                        value="https://aws.amazon.com/opendata/?wwps-cards.sort-by=item.additionalFields.sortDate&wwps-cards.sort-rder=desc"
                                                    />
                                                    <label htmlFor="username" className={`${styles.form__label}`}>URL</label>
                                                </div>
                                            </div>

                                            <div className={`mb-7 w-full flex justify-between items-center ${styles.modalInput}`}>
                                                <div className="w-[48%]">
                                                    <div className="w-full">
                                                        <div
                                                            className="border rounded-xl border-black h-[55px] w-f pl-2 pr-5 relative flex items-center justify-start bg-white w-[325px]"
                                                            onClick={toggleMethod}
                                                        >
                                                            <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Method</label>
                                                            <Image
                                                                src="/img/arrow-down-black.svg"
                                                                alt="arrow-down"
                                                                height={20}
                                                                width={20}
                                                                className="absolute right-3 top-4"
                                                            />
                                                            <span className="text-sm text-black pl-2 uppercase">{defaultMethod}</span>
                                                        </div>
                                                        {method ?
                                                            <div className={`border rounded-xl border-gray-500 w-[325px] absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                                                                <ul className="p-0 m-0 w-full">
                                                                    <li
                                                                        className="px-4 py-1 bg-white cursor-pointer text-sm hover:bg-yellow-951 w-full font-normal"
                                                                        onClick={() => selectMethod("GET")}
                                                                    >
                                                                        <span>GET</span>
                                                                    </li>
                                                                    <li
                                                                        className="px-4 py-1 text-sm bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                                        onClick={() => selectMethod("POST")}
                                                                    >
                                                                        <span>POST</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            : null}
                                                    </div>
                                                </div>

                                                <div className="w-[48%]">
                                                    <div className="w-full">
                                                        <div className="border rounded-xl border-black h-[56px] w-full pl-2 pr-5 relative flex items-center justify-start bg-white">
                                                            <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Headers</label>
                                                            <div className="flex justify-start items-center w-[49%] text-sm h-full  border-r-[1px] border-gray-963">
                                                                {/* <label className="mr-4">Enter Key</label> */}
                                                                <input type="text" className="outline-none w-[130px]" placeholder="Enter Key" />
                                                            </div>

                                                            <div className="flex justify-start items-center w-[49%] text-sm h-full pl-2">
                                                                {/* <label className="mr-4">Enter Value</label> */}
                                                                <input type="text" className="outline-none w-[130px]" placeholder="Enter Value" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`mb-7 w-full flex justify-between items-center ${styles.modalInput}`}>
                                                <div className="w-[48%]">
                                                    <div className="w-full">
                                                        <div className="border rounded-xl border-black h-[56px] w-full pl-2 pr-5 relative flex items-center justify-start bg-white">
                                                            <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Queries</label>
                                                            <div className="flex justify-start items-center w-[49%] text-sm h-full border-r-[1px] border-gray-963">
                                                                {/* <label className="mr-4">Enter Key</label> */}
                                                                <input type="text" className="outline-none w-[130px]" placeholder="Enter Key" />
                                                            </div>

                                                            <div className="flex justify-start items-center w-[49%] text-sm h-full pl-2">
                                                                {/* <label className="mr-4">Enter Value</label> */}
                                                                <input type="text" className="outline-none w-[130px]" placeholder="Enter Value" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-[48%]">
                                                    <div className="w-full">
                                                        <div className="border rounded-xl border-black h-[57px] w-full pl-2 pr-5 relative flex items-center justify-start bg-white">
                                                            <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Body</label>
                                                            <div className="flex justify-start items-center w-full text-sm h-full  ">
                                                                {/* <label className="mr-1 w-[35%]">Enter Request Content</label> */}
                                                                <input type="text" className="outline-none w-full" placeholder="Enter Request Content" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`mb-4 w-full flex justify-between items-center ${styles.modalInput}`}>
                                                <div className="w-[48%]">
                                                    <div className="w-full">
                                                        <div className="border rounded-xl border-black h-[57px] w-full pl-2 pr-5 relative flex items-center justify-start bg-white">
                                                            <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Cookies</label>
                                                            <div className="flex justify-start items-center w-full text-sm h-full  ">
                                                                {/* <label className="mr-1 w-[35%]">Enter HTTP Cookies</label> */}
                                                                <input type="text" className="outline-none w-full" placeholder="Enter HTTP Cookies" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-[48%]">
                                                    <div className="w-full">
                                                        <div
                                                            className="border rounded-xl border-black h-[55px] w-[325px] pl-2 pr-5 relative flex items-center justify-start bg-white"
                                                            onClick={toggleAuthType}
                                                        >
                                                            <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Authentication Type</label>
                                                            <Image
                                                                src="/img/arrow-down-black.svg"
                                                                alt="arrow-down"
                                                                height={20}
                                                                width={20}
                                                                className="absolute right-3 top-4"
                                                            />
                                                            <span className="text-black pl-2">{defaultAuthType}</span>
                                                        </div>
                                                        {authType ?
                                                            <div className={`border rounded-xl border-gray-500  w-[325px] absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                                                                <ul className="p-0 m-0 w-full">
                                                                    {
                                                                        authenticationType && authenticationType.length > 0 &&
                                                                        authenticationType.map((item: any, index: any) => (
                                                                            <li
                                                                                className="px-4 py-1 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                                                key={index}
                                                                                onClick={() => selectAuthType(item)}
                                                                            >
                                                                                <span>{item}</span>
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </div>
                                                            : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`mb-7 w-full flex justify-between items-center ${styles.modalInput}`}>
                                                <div className="w-[48%]">
                                                    <div className={`${styles.form__wrap}`}>
                                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                            <input
                                                                type="text"
                                                                id="username"
                                                                name="username"
                                                                className={`${styles.form__field} border border-black`}
                                                                placeholder="User Name"
                                                                value="SERVICE_API"
                                                            />
                                                            <label htmlFor="password" className={`${styles.form__label}`}>User Name</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-[48%]">
                                                    <div className={`${styles.form__wrap}`}>
                                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                            <input
                                                                type="text"
                                                                id="password"
                                                                name="password"
                                                                className={`${styles.form__field} border border-black`}
                                                                placeholder="Password"
                                                                value="Pass123"
                                                            />
                                                            <label htmlFor="password" className={`${styles.form__label}`}>Password</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`w-full flex justify-end items-center ${styles.modalInput}`}>
                                                <div className="mb-0 relative flex justify-end items-center w-full pr-4">
                                                    <button
                                                        className="border border-black rounded-lg bg-black text-white text-lg w-20 h-12 mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951 outline-none transform active:scale-75 transition-transform"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="border border-black rounded-lg bg-white text-black text-lg w-24 h-12 hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300 outline-none transform active:scale-75 transition-transform"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
            {/* ----- MODAL ENDS ----- */}

        </>
    )
}