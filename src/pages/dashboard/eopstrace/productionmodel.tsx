import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";

export default function ProductionModel() {

    const [chooseAsset, setChooseAsset] = useState("Wear Deduction Model");
    const [toggleAsset, setToggleAsset] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Show Choose Asset List
    const showChooseAssetList = () => {
        setToggleAsset(!toggleAsset)
    }
    const selectAsset = (item: any) => {
        setChooseAsset(item);
        setToggleAsset(false)
    }
    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOps Watch</p>
                </div>

                <div className="border min-h-full rounded-xl mt-3 px-4 py-4">
                    <div className="flex justify-between items-center">
                        {/* Breadcrumb */}
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-1">
                                <li className="inline-flex items-center">
                                    <Link href="/dashboard/eopstrace"
                                        className="inline-flex items-center text-sm font-medium text-black hover:text-yellow-950">
                                        <Image
                                            src="/img/home.svg"
                                            alt="home"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                    </Link>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <Image
                                            src="/img/arrow-right.svg"
                                            alt="arrow-right"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                        <span className="ml-1 text-sm text-black hover:text-yellow-950 md:ml-1 font-bold">Object ID</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <Image
                                            src="/img/arrow-right.svg"
                                            alt="arrow-right"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                        <span className="ml-1 text-sm text-black hover:text-yellow-950 md:ml-1 font-bold">Training Model</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <Image
                                            src="/img/arrow-right.svg"
                                            alt="arrow-right"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                        <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">Wear Deduction Model</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        {/* Upload Button */}
                        <div className="flex items-center justify-end">
                            <div className="flex items-center justify-start mr-7">
                                <p className="text-gray mr-4">Disable</p>
                                <div className={`${styles.radioWrap}`}>
                                    <input
                                        type="checkbox"
                                    />
                                    <span className={`${styles.radioFrame}`}></span>
                                </div>
                            </div>
                            <button
                                className="flex justify-center items-center text-black bg-yellow-951 rounded rounded-xl h-12 px-4 transition-opacity duration-300"
                                onClick={() => setShowModal(true)}
                            >
                                <Image
                                    src="/img/settings.svg"
                                    alt="activity"
                                    height={24}
                                    width={24}
                                    className="mr-2"
                                />
                                <span>Configure Images</span>
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex justify-end items-center mt-7">
                        <div className="mr-8">
                            <input
                                type="checkbox"
                                className="scale-150 mr-4"
                                id="selectall"
                            />
                            <label htmlFor="selectall">Select All</label>
                        </div>
                        <button className="mr-8 flex justify-center items-center">
                            <Image
                                src="/img/rotate-ccw.svg"
                                alt="reset"
                                width={18}
                                height={18}
                                className="mr-1"
                            />
                            <span>Reset</span>
                        </button>
                        <button className="mr-8 flex justify-center items-center">
                            <Image
                                src="/img/close.svg"
                                alt="reset"
                                width={18}
                                height={18}
                                className="mr-1"
                            />
                            <span>Clear All</span>
                        </button>
                        <button className="flex justify-center items-center">
                            <Image
                                src="/img/sliders.svg"
                                alt="reset"
                                width={18}
                                height={18}
                                className="mr-1"
                            />
                            <span>Filters</span>
                        </button>
                    </div>

                    {/* Images Grid */}
                    <div className="relative grid grid-cols-3 gap-10 mt-8">

                        <div className="col-span-3 sm:col-span-2 md:col-span-3 lg:col-span-1 xl:col-span-4...">
                            <div className={`border border-gray-200 h-60 w-full rounded-md overflow-hidden1 relative ${styles.imagewrap}`}>
                                <input type="checkbox" className="scale-125 absolute top-0 left-0" />
                                <Image
                                    src="/img/car.png"
                                    alt="car"
                                    height={150}
                                    width={150}
                                    className="w-full h-full"
                                />
                                <div className={`${styles.info} relative`}>
                                    <span className="text-white text-[13px] font-light absolute top-0 left-1">Uploaded Date: 05-11-2023</span>
                                    <Link href="/dashboard/eopstrace/productionview" className="bg-yellow-951 rounded rounded-md flex justify-center items-center texxt-black font-semibold text-sm p-2 w-[150px]">
                                        <Image
                                            src="/img/carIcon.svg"
                                            alt="car"
                                            height={30}
                                            width={30}
                                            className="mr-2"
                                        />
                                        <span>Show Result</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="border border-gray-951 mt-2 rounded rounded-xl h-[65px] w-full p-1">
                                <button
                                    className="text-gray-952 inline-flex justify-center items-center text-sm h-8 mb-2"
                                >
                                    <Image
                                        src="/img/pluswhite.svg"
                                        alt="close"
                                        height={14}
                                        width={14}
                                    />
                                    <span>Add Tag</span>
                                </button>
                            </div>
                        </div>

                        <div className="col-span-3 sm:col-span-2 md:col-span-3 lg:col-span-1 xl:col-span-4...">
                            <div className={`border border-gray-200 h-60 w-full rounded-md overflow-hidden1 relative ${styles.imagewrap}`}>
                                <input type="checkbox" className="scale-125 absolute top-0 left-0" />
                                <Image
                                    src="/img/car.png"
                                    alt="car"
                                    height={150}
                                    width={150}
                                    className="w-full h-full"
                                />
                                <div className={`${styles.info} relative`}>
                                    <span className="text-white text-[13px] font-light absolute top-0 left-1">Uploaded Date: 05-11-2023</span>
                                    <Link href="/dashboard/eopstrace/productionview" className="bg-yellow-951 rounded rounded-md flex justify-center items-center texxt-black font-semibold text-sm p-2 w-[150px]">
                                        <Image
                                            src="/img/carIcon.svg"
                                            alt="car"
                                            height={30}
                                            width={30}
                                            className="mr-2"
                                        />
                                        <span>Show Result</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="border border-gray-951 mt-2 rounded rounded-xl h-[65px] w-full p-1">
                                <button
                                    className="text-gray-952 inline-flex justify-center items-center text-sm h-8 mb-2"
                                >
                                    <Image
                                        src="/img/pluswhite.svg"
                                        alt="close"
                                        height={14}
                                        width={14}
                                    />
                                    <span>Add Tag</span>
                                </button>
                            </div>
                        </div>

                        <div className="col-span-3 sm:col-span-2 md:col-span-3 lg:col-span-1 xl:col-span-4...">
                            <div className={`border border-gray-200 h-60 w-full rounded-md overflow-hidden1 relative ${styles.imagewrap}`}>
                                <input type="checkbox" className="scale-125 absolute top-0 left-0" />
                                <Image
                                    src="/img/car.png"
                                    alt="car"
                                    height={150}
                                    width={150}
                                    className="w-full h-full"
                                />
                                <div className={`${styles.info} relative`}>
                                    <span className="text-white text-[13px] font-light absolute top-0 left-1">Uploaded Date: 05-11-2023</span>
                                    <Link href="/dashboard/eopstrace/productionview" className="bg-yellow-951 rounded rounded-md flex justify-center items-center texxt-black font-semibold text-sm p-2 w-[150px]">
                                        <Image
                                            src="/img/carIcon.svg"
                                            alt="car"
                                            height={30}
                                            width={30}
                                            className="mr-2"
                                        />
                                        <span>Show Result</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="border border-gray-951 mt-2 rounded rounded-xl h-[65px] w-full p-1">
                                <button
                                    className="text-gray-952 inline-flex justify-center items-center text-sm h-8 mb-2"
                                >
                                    <Image
                                        src="/img/pluswhite.svg"
                                        alt="close"
                                        height={14}
                                        width={14}
                                    />
                                    <span>Add Tag</span>
                                </button>
                            </div>
                        </div>

                        <div className="col-span-3 sm:col-span-2 md:col-span-3 lg:col-span-1 xl:col-span-4...">
                            <div className={`border border-gray-200 h-60 w-full rounded-md overflow-hidden1 relative ${styles.imagewrap}`}>
                                <input type="checkbox" className="scale-125 absolute top-0 left-0" />
                                <Image
                                    src="/img/car.png"
                                    alt="car"
                                    height={150}
                                    width={150}
                                    className="w-full h-full"
                                />
                                <div className={`${styles.info} relative`}>
                                    <span className="text-white text-[13px] font-light absolute top-0 left-1">Uploaded Date: 05-11-2023</span>
                                    <Link href="/dashboard/eopstrace/productionview" className="bg-yellow-951 rounded rounded-md flex justify-center items-center texxt-black font-semibold text-sm p-2 w-[150px]">
                                        <Image
                                            src="/img/carIcon.svg"
                                            alt="car"
                                            height={30}
                                            width={30}
                                            className="mr-2"
                                        />
                                        <span>Show Result</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="border border-gray-951 mt-2 rounded rounded-xl h-[65px] w-full p-1">
                                <button
                                    className="text-gray-952 inline-flex justify-center items-center text-sm h-8 mb-2"
                                >
                                    <Image
                                        src="/img/pluswhite.svg"
                                        alt="close"
                                        height={14}
                                        width={14}
                                    />
                                    <span>Add Tag</span>
                                </button>
                            </div>
                        </div>

                        <div className="col-span-3 sm:col-span-2 md:col-span-3 lg:col-span-1 xl:col-span-4...">
                            <div className={`border border-gray-200 h-60 w-full rounded-md overflow-hidden1 relative ${styles.imagewrap}`}>
                                <input type="checkbox" className="scale-125 absolute top-0 left-0" />
                                <Image
                                    src="/img/car.png"
                                    alt="car"
                                    height={150}
                                    width={150}
                                    className="w-full h-full"
                                />
                                <div className={`${styles.info} relative`}>
                                    <span className="text-white text-[13px] font-light absolute top-0 left-1">Uploaded Date: 05-11-2023</span>
                                    <Link href="/dashboard/eopstrace/productionview" className="bg-yellow-951 rounded rounded-md flex justify-center items-center texxt-black font-semibold text-sm p-2 w-[150px]">
                                        <Image
                                            src="/img/carIcon.svg"
                                            alt="car"
                                            height={30}
                                            width={30}
                                            className="mr-2"
                                        />
                                        <span>Show Result</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="border border-gray-951 mt-2 rounded rounded-xl h-[65px] w-full p-1">
                                <button
                                    className="text-gray-952 inline-flex justify-center items-center text-sm h-8 mb-2"
                                >
                                    <Image
                                        src="/img/pluswhite.svg"
                                        alt="close"
                                        height={14}
                                        width={14}
                                    />
                                    <span>Add Tag</span>
                                </button>
                            </div>
                        </div>

                        <div className="col-span-3 sm:col-span-2 md:col-span-3 lg:col-span-1 xl:col-span-4...">
                            <div className={`border border-gray-200 h-60 w-full rounded-md overflow-hidden1 relative ${styles.imagewrap}`}>
                                <input type="checkbox" className="scale-125 absolute top-0 left-0" />
                                <Image
                                    src="/img/car.png"
                                    alt="car"
                                    height={150}
                                    width={150}
                                    className="w-full h-full"
                                />
                                <div className={`${styles.info} relative`}>
                                    <span className="text-white text-[13px] font-light absolute top-0 left-1">Uploaded Date: 05-11-2023</span>
                                    <Link href="/dashboard/eopstrace/productionview" className="bg-yellow-951 rounded rounded-md flex justify-center items-center texxt-black font-semibold text-sm p-2 w-[150px]">
                                        <Image
                                            src="/img/carIcon.svg"
                                            alt="car"
                                            height={30}
                                            width={30}
                                            className="mr-2"
                                        />
                                        <span>Show Result</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="border border-gray-951 mt-2 rounded rounded-xl h-[65px] w-full p-1">
                                <button
                                    className="text-gray-952 inline-flex justify-center items-center text-sm h-8 mb-2"
                                >
                                    <Image
                                        src="/img/pluswhite.svg"
                                        alt="close"
                                        height={14}
                                        width={14}
                                    />
                                    <span>Add Tag</span>
                                </button>
                            </div>
                        </div>
                    </div>


                    {/* ----- OBJECT MODAL STARTS ----- */}
                    {showModal ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                                <div className="relative my-6 w-[720px]">
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-2">
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
                                        <div className="relative p-6 flex-auto">
                                            <div className=" flex justify-center items-center">
                                                <div className="w-[500px] inline-flex justify-start items-center flex-wrap flex-col">
                                                    <p className="text-black text-lg font-semibold">Enter API to pull images</p>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter API"
                                                        className="border border-gray-951 h-12 text-md pl-2 pr-2 mt-2 w-full rounded rounded-xl"
                                                    />
                                                    <div className="mt-8 mb-8 text-black text-center font-semibold">Or</div>
                                                    <p className="text-black text-lg font-semibold">Upload images from your local</p>
                                                    <div className="relative mt-10 w-[500px] items-center justify-center mb-10">
                                                        <input type="file" name="uploadImages" id="uploadImages" className="scale-150 relative left-32 z-10 opacity-0" />
                                                        <div className="text-white rounded rounded-xl shadow-xl flex justify-center items-center bg-gray-955  w-full h-16 flex-wrap flex-col absolute top-[-13px]">
                                                            <Image
                                                                src="/img/upload-cloud.svg"
                                                                alt="browse"
                                                                height={24}
                                                                width={24}
                                                            />
                                                            <span>Browse your files</span>
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


                </div>
            </div>

            <div className="w-[16%] pl-5 hidden">
                <Template />
            </div>

        </div>
    )
}

ProductionModel.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}