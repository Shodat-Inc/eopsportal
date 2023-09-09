import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'
import axios from 'axios';
import NoDataFound from "../../../common/nodatafound";


export default function TrainingModel() {

    const router = useRouter();
    const parentAsset = router.query;
    const [showModal, setShowModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [data, setData] = useState([] as any);
    const [resImage, setResImage] = useState("");
<<<<<<< HEAD
=======
    const [active, setActive] = useState(1);
    const [method, setMethod] = useState(false);
    const [authType, setAuthType] = useState(false);
    const [defaultMethod, setDefaultMethod] = useState("GET");
    const [drop, setDrop] = useState(false);
    const authenticationType = [
        "Basic", "Client Certificate", "Active Directory OAuth", "Raw", "Managed Identity"
    ]
    const [defaultAuthType, setDefaultAuthType] = useState(authenticationType[0]);
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d


    // Fetch the JSON data of sub Asset
    const fetchClassData = () => {
        axios.get("/api/geteopsWatch").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    if (item.class === parentAsset.objectID && item.ID === parentAsset.key && item.modal === parentAsset.model) {
                        return item;
                    }
                });
                if (filtered && filtered.length > 0) {
                    if (filtered[0].images) {
                        setData(filtered[0].images);
                    }
                }
            }
        });
    };
    useEffect(() => {
        fetchClassData();
        if (fetchClassData.length) return;
    }, [parentAsset])


    const filterData = data.filter((item: any) => {
        return item.folder === "Test"
    })

    const imageModal = (item: any) => {
        setShowImageModal(true);
        setResImage(item);
    }

<<<<<<< HEAD

    return (
        <div className="flex font-OpenSans">
=======
    const activeTab = (tab: any) => {
        setActive(tab)
    }

    // Toggle method dropdown
    const toggleMethod = () => {
        setMethod(!method)
    }
    const selectMethod = (item: any) => {
        setDefaultMethod(item);
        setMethod(false);
    }

    // Toggle Authentication Type Dropdown
    const toggleAuthType = () => {
        setAuthType(!authType);
    }
    const selectAuthType = (item: any) => {
        setDefaultAuthType(item);
        setAuthType(false);
    }

    const toggleDrop = () => {
        setDrop(!drop);
    }

    return (
        <div className="flex font-OpenSans relative">
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d

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
                                    <Link href="/dashboard/assetmanagement"
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
                                    <Link
                                        href={{
                                            pathname: "/dashboard/assetmanagement/subchildobject",
                                            query: {
                                                class: parentAsset.objectID,
                                                object: parentAsset.id,
                                                id: parentAsset.key,
                                                subObject: parentAsset.subObject,
                                            }
                                        }}
                                        className="flex items-center">
                                        <Image
                                            src="/img/arrow-right.svg"
                                            alt="arrow-right"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                        <span className="ml-1 text-sm text-black hover:text-yellow-950 md:ml-1 font-bold">{parentAsset.key}</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={{
                                            pathname: "/dashboard/eopswatch/eopswatchmodel",
                                            query: {
                                                objectID: parentAsset.objectID,
<<<<<<< HEAD
                                                key: parentAsset.key, 
=======
                                                key: parentAsset.key,
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                                                id: parentAsset.id,
                                                subObject: parentAsset.subObject,
                                            }
                                        }}
                                        className="flex items-center"
                                    >
                                        <Image
                                            src="/img/arrow-right.svg"
                                            alt="arrow-right"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                        <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">{parentAsset.model}</span>
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
                                        <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">Test</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        {/* Upload Button */}
<<<<<<< HEAD
                        <div className="flex items-end justify-end">
                            <button
                                className="flex justify-center items-center text-black bg-yellow-951 rounded rounded-xl h-12 px-4 transition-opacity duration-300"
                                onClick={() => setShowModal(true)}
=======
                        <div className="flex items-end justify-end relative">
                            <button
                                className="flex justify-center items-center text-black bg-yellow-951 rounded rounded-xl h-12 px-4 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform w-[210px]"
                                onClick={toggleDrop}
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                            >
                                <Image
                                    src="/img/upload-black.svg"
                                    alt="activity"
                                    height={24}
                                    width={24}
                                    className="mr-2"
                                />
                                <span>Upload Images</span>
<<<<<<< HEAD
                            </button>
=======
                                <Image
                                    src="/img/more-vertical.svg"
                                    alt="activity"
                                    height={24}
                                    width={24}
                                    className="ml-2"
                                />
                            </button>
                            {drop &&
                                <div className="border border-gray-962 shadow-xl rounded rounded-xl w-[180px] min-h-[100px] p-2 absolute z-10 bg-white right-0 top-[100%] mt-1">
                                    <button className="flex justify-center items-center text-white text-sm bg-black rounded rounded-xl h-12 px-4 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform w-full mb-4"
                                        onClick={() => { setShowModal(true); setDrop(false) }}
                                    >
                                        <span>API Configuration</span>
                                    </button>
                                    <div className="relative w-full">
                                        <input type="file" name="uploadImages" id="uploadImages" className="scale-150 relative left-24 z-10 opacity-0" />
                                        <div className="flex justify-center items-center text-white text-sm bg-black rounded rounded-xl h-12 px-4 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform w-full absolute top-[-13px]">
                                            <span>Browse your files</span>
                                        </div>
                                    </div>
                                </div>
                            }
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
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
                    {filterData && filterData.length > 0 ?
                        <div className="relative grid grid-cols-3 gap-10 mt-8">

                            {

                                filterData.map((item: any, index: any) => (
                                    <>
                                        <div className="col-span-3 sm:col-span-2 md:col-span-3 lg:col-span-1 xl:col-span-4..." key={index}>
                                            <div className={`border border-gray-200 h-72 w-full rounded-md overflow-hidden relative ${styles.imagewrap}`}>
                                                <input type="checkbox" className="scale-125 absolute top-1 left-1" />
                                                <Image
                                                    src={item.path}
                                                    alt="car"
                                                    height={150}
                                                    width={150}
                                                    className="w-full h-full"
                                                />
                                                <div className={`${styles.info} relative flex items-center justify-center`}>
                                                    <span className="text-white text-[13px] font-light absolute top-0 left-1">Uploaded Date: 05-11-2023</span>
                                                    <div className="relative flex flex-wrap items-center justify-between h-full px-5">

                                                        <Link
                                                            href={{
                                                                pathname: "/dashboard/eopswatch/trainingview",
                                                                query: {
                                                                    objectID: parentAsset.objectID,
                                                                    key: parentAsset.key,
                                                                    model: parentAsset.model,
                                                                    id: parentAsset.id,
                                                                    subObject: parentAsset.subObject,
                                                                    result: item.resultImage ? item.resultImage : '',
<<<<<<< HEAD
                                                                    imageID : item.imageID
=======
                                                                    imageID: item.imageID
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                                                                }
                                                            }}
                                                            className="bg-yellow-951 rounded rounded-md flex justify-center items-center texxt-black font-semibold text-sm p-2 w-24"
                                                        >
                                                            <Image
                                                                src="/img/carIcon.svg"
                                                                alt="car"
                                                                height={21}
                                                                width={21}
                                                                className="mr-2"
                                                            />
                                                            <span>Test</span>
                                                        </Link>
                                                        <button
                                                            // onClick={() => setShowImageModal(true)}
                                                            onClick={() => imageModal(item.path)}
                                                            className="bg-yellow-951 rounded rounded-md flex justify-center items-center texxt-black font-semibold text-sm p-2 w-24 ml-3"
                                                        >
                                                            <Image
                                                                src="/img/search.svg"
                                                                alt="car"
                                                                height={21}
                                                                width={21}
                                                                className="mr-2"
                                                            />
                                                            <span>Prev</span>
                                                        </button>
                                                    </div>
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

                                        {showImageModal ? (
                                            <>
                                                <div
                                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                                >
                                                    <div className="relative my-0 w-[450px] bg-transparent border border-yellow-951 rounded rounded-xl">
                                                        <div className="border-0 shadow-lg-1 relative flex flex-col w-full bg-white outline-none focus:outline-none w-[450px] h-[420px] overflow-hidden-1 bg-transparent rounded rounded-xl">
                                                            {/*header*/}
                                                            <div className="flex items-start justify-between p-0">
                                                                <button
                                                                    className="bg-transparent border border-white hover:border-yellow-951 text-black float-right leading-none font-semibold outline-none focus:outline-none bg-white absolute right-[-40px] top-[-40px] rounded rounded-full p-1 hover:bg-yellow-951"
                                                                    onClick={() => setShowImageModal(false)}
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
                                                            <div className="relative p-0 flex items-center jusifiy-center h-full w-full">
                                                                {
                                                                    resImage ?
                                                                        <Image
                                                                            src={resImage}
                                                                            alt="result"
                                                                            className="h-[100%] w-[100%] object-cover rounded rounded-xl"
                                                                            height={420}
                                                                            width={450}
                                                                        />
                                                                        :
                                                                        <div className="text-xl font-semibold w-full text-center flex flex-wrap flex-col items-center justify-center">
                                                                            <Image
                                                                                src="/img/no_image_icon.svg"
                                                                                alt="no image"
                                                                                height={100}
                                                                                width={100}
                                                                                className="h-[100%] w-[100%] object-cover rounded rounded-xl"
                                                                            />
                                                                            <span className="mt-3">No Image Found!! </span>
                                                                        </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                            </>
                                        ) : null}

                                    </>
                                ))
                            }
                        </div>
                        :
                        <div className="h-72 flex justify-center items-center flex-wrap flex-col mt-8 w-full">
                            <NoDataFound createText="No image found!" />
                        </div>
                    }



                    {/* ----- OBJECT MODAL STARTS ----- */}
                    {showModal ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
<<<<<<< HEAD
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
=======
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
                                                                className={`${styles.form__field} border border-black border-black`}
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


                                                    {/* <div className="h-full w-full relative flex items-center justify-center hidden">
                                                            <div className="relative mt-10 w-[400px] mb-10">
                                                                <input type="file" name="uploadImages" id="uploadImages" className="scale-150 relative left-24 z-10 opacity-0" />
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
                                                        </div> */}

                                                </div>

>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
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

<<<<<<< HEAD
=======
            <div className={`fixed h-[510px] w-[520px] bg-gray-952 bottom-0 right-0 rounded-tl-xl overflow-hidden shadow-lg hidden`}>
                <div className="relative h-full w-full">
                    <div className="bg-black h-[70px] w-full relative pl-3 pr-3">
                        <button
                            className="absolute right-2 top-5"
                        >
                            <Image
                                src="/img/closewhite.svg"
                                alt="close"
                                height={24}
                                width={24}
                                className=""
                            />
                        </button>

                        <div className="flex justify-start items-end h-full">
                            <button
                                className={`rounded-tl-xl rounded-tr-xl flex justify-center items-center p-3 text-sm h-[50px] font-semibold ${active === 1 ? 'bg-white text-black' : 'bg-black text-white'}`}
                                onClick={() => activeTab(1)}
                            >
                                <span>API Configuration</span>
                            </button>
                            <button
                                className={`rounded-tl-xl rounded-tr-xl flex justify-center items-center p-3 text-sm h-[50px] font-semibold ${active === 2 ? 'bg-white text-black' : 'bg-black text-white'}`}
                                onClick={() => activeTab(2)}
                            >
                                <span>Upload from Drive</span>
                            </button>
                        </div>
                    </div>

                    <div className="h-[440px] w-full relative bg-white border-l-[1px] border-gray-962 overflow-y-scroll">
                        {active === 1 ?
                            <div className="h-full w-full relative p-4">
                                <div className={`mb-10 ${styles.form__wrap} ${styles.form__wrap_large}`}>
                                    <div className={`relative ${styles.form__group} font-OpenSans`}>
                                        <input
                                            type="text"
                                            id="url"
                                            name="url"
                                            className={`${styles.form__field} border border-black border-black`}
                                            placeholder="URL"
                                        />
                                        <label htmlFor="username" className={`${styles.form__label}`}>URL</label>
                                    </div>
                                </div>

                                <div className="w-full mb-10">
                                    <div
                                        className="border rounded-xl border-black h-[55px] w-full pl-2 pr-5 relative flex items-center justify-start bg-white"
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
                                        <span className="text-lg text-black pl-2 uppercase">{defaultMethod}</span>
                                    </div>
                                    {method ?
                                        <div className={`h-52 border rounded-xl border-gray-500 h-auto max-h-[250px] w-full  absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                                            <ul className="p-0 m-0 w-full">
                                                <li
                                                    className="px-5 py-4 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                    onClick={() => selectMethod("GET")}
                                                >
                                                    <span>GET</span>
                                                </li>
                                                <li
                                                    className="px-5 py-4 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                    onClick={() => selectMethod("POST")}
                                                >
                                                    <span>POST</span>
                                                </li>
                                            </ul>
                                        </div>
                                        : null}
                                </div>

                                <div className="w-full mb-10">
                                    <div className="border rounded-xl border-black h-[65px] w-full pl-2 pr-5 relative flex items-center justify-start bg-white">
                                        <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Headers</label>
                                        <div className="flex justify-start items-center w-[48%] text-sm h-full  border-r-[1px] border-gray-963">
                                            <label className="mr-4">Enter Key</label>
                                            <input type="text" className="outline-none border-b-[1px] border-gray-943 w-[120px]" />
                                        </div>

                                        <div className="flex justify-start items-center w-[52%] text-sm h-full pl-2">
                                            <label className="mr-4">Enter Value</label>
                                            <input type="text" className="outline-none border-b-[1px] border-gray-963 w-[120px]" />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full mb-10">
                                    <div className="border rounded-xl border-black h-[65px] w-full pl-2 pr-5 relative flex items-center justify-start bg-white">
                                        <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Queries</label>
                                        <div className="flex justify-start items-center w-[48%] text-sm h-full  border-r-[1px] border-gray-963">
                                            <label className="mr-4">Enter Key</label>
                                            <input type="text" className="outline-none border-b-[1px] border-gray-963 w-[120px]" />
                                        </div>

                                        <div className="flex justify-start items-center w-[52%] text-sm h-full pl-2">
                                            <label className="mr-4">Enter Value</label>
                                            <input type="text" className="outline-none border-b-[1px] border-gray-963 w-[120px]" />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full mb-10">
                                    <div className="border rounded-xl border-black h-[65px] w-full pl-2 pr-5 relative flex items-center justify-start bg-white">
                                        <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Body</label>
                                        <div className="flex justify-start items-center w-full text-sm h-full  ">
                                            <label className="mr-1 w-[35%]">Enter Request Content</label>
                                            <input type="text" className="outline-none border-b-[1px] border-gray-963 w-[65%]" />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full mb-8">
                                    <div className="border rounded-xl border-black h-[65px] w-full pl-2 pr-5 relative flex items-center justify-start bg-white">
                                        <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Cookies</label>
                                        <div className="flex justify-start items-center w-full text-sm h-full  ">
                                            <label className="mr-1 w-[35%]">Enter HTTP Cookies</label>
                                            <input type="text" className="outline-none border-b-[1px] border-gray-963 w-[65%]" />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full mb-10">
                                    <p className="font-bold">Authentication</p>
                                </div>

                                <div className="w-full mb-6">
                                    <div
                                        className="border rounded-xl border-black h-[55px] w-full pl-2 pr-5 relative flex items-center justify-start bg-white"
                                        onClick={toggleMethod}
                                    >
                                        <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Authentication Type</label>
                                        <Image
                                            src="/img/arrow-down-black.svg"
                                            alt="arrow-down"
                                            height={20}
                                            width={20}
                                            className="absolute right-3 top-4"
                                        />
                                        <span className="text-black pl-2">Basic</span>
                                    </div>
                                    {method ?
                                        <div className={`h-52 border rounded-xl border-gray-500 h-auto max-h-[250px] w-full  absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                                            <ul className="p-0 m-0 w-full">
                                                <li
                                                    className="px-5 py-4 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                    onClick={() => selectMethod("GET")}
                                                >
                                                    <span>Basic</span>
                                                </li>
                                                <li
                                                    className="px-5 py-4 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                    onClick={() => selectMethod("POST")}
                                                >
                                                    <span>Advanced</span>
                                                </li>
                                            </ul>
                                        </div>
                                        : null}
                                </div>

                                <div className={`mb-6 ${styles.form__wrap}`}>
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

                                <div className={`mb-6 pb-6 ${styles.form__wrap}`}>
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
                            :
                            <div className="h-full w-full relative flex items-center justify-center">
                                <div className="relative mt-10 w-full mb-10">
                                    <input type="file" name="uploadImages" id="uploadImages" className="scale-150 relative left-24 z-10 opacity-0" />
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
                        }
                    </div>

                </div>
            </div>

>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
        </div>
    )
}

TrainingModel.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}