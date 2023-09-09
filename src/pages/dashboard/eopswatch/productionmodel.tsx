import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'
import axios from "axios";
import NoDataFound from "@/common/nodatafound";

export default function ProductionModel() {

    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const parentAsset = router.query;
    const [showImageModal, setShowImageModal] = useState(false);
    const [data, setData] = useState([] as any);
    const [resImage, setResImage] = useState("");
    const [toggleText, setToggleText] = useState(false)

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
<<<<<<< HEAD
        return item.folder === "Production"
=======
        return item.folder === "Test"
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
    })

    const imageModal = (item: any) => {
        setShowImageModal(true);
        setResImage(item);

    }

    const toggleChecked = () => {
        setToggleText(!toggleText)
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
                                    <Link href="/dashboard/assetmanagement"
                                        className="inline-flex items-center text-sm font-medium text-black hover:text-yellow-950">
                                        <Image
                                            src="/img/home.svg"
                                            alt="home"
<<<<<<< HEAD
                                            className="h-6"
=======
                                            className="h-6 h-[24px] w-[24px]"
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
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
<<<<<<< HEAD
                                            className="h-6"
=======
                                            className="h-6 h-[24px] w-[24px]"
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
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
<<<<<<< HEAD
                                            className="h-6"
=======
                                            className="h-6 h-[24px] w-[24px]"
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
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
<<<<<<< HEAD
                                            className="h-6"
=======
                                            className="h-6 h-[24px] w-[24px]"
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                                            height={24}
                                            width={24}
                                        />
                                        <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">Production</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        {/* Upload Button */}
                        <div className="flex items-center justify-end">
<<<<<<< HEAD
                            <div className="flex items-center justify-start mr-7">
                                <p className="text-gray mr-4">{ toggleText ? "Enabled" : "Disabled"}</p>
=======
                            <div className="flex items-center justify-start mr-5">
                                <p className="text-gray mr-4">{toggleText ? "Enabled" : "Disabled"}</p>
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                                <div className={`${styles.radioWrap}`}>
                                    <input
                                        type="checkbox"
                                        onClick={toggleChecked}
                                    />
                                    <span className={`${styles.radioFrame}`}></span>
                                </div>
                            </div>
                            <button
<<<<<<< HEAD
                                className="flex justify-center items-center text-black bg-yellow-951 rounded rounded-xl h-12 px-4 transition-opacity duration-300"
=======
                                className="flex justify-center items-center text-black bg-yellow-951 rounded rounded-xl h-12 px-4 transition-opacity duration-300 mr-5"
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                                onClick={() => setShowModal(true)}
                            >
                                <Image
                                    src="/img/settings.svg"
                                    alt="activity"
                                    height={24}
                                    width={24}
<<<<<<< HEAD
                                    className="mr-2"
                                />
                                <span>Configure Images</span>
                            </button>
=======
                                    className="mr-2 h-[24px] w-[24px]"
                                />
                                <span>Configure Images</span>
                            </button>

                            <Link
                                href={{
                                    pathname: "/dashboard/eopswatch/alerts",
                                    query: {
                                        objectID: parentAsset.objectID,
                                        key: parentAsset.key,
                                        model: parentAsset.model,
                                        id: parentAsset.id,
                                        subObject: parentAsset.subObject
                                    }
                                }}
                                className="flex justify-center items-center text-black bg-yellow-951 rounded rounded-xl h-12 px-4 transition-opacity duration-300"
                            >
                                <Image
                                    src="/img/message-square.svg"
                                    alt="activity"
                                    height={19}
                                    width={19}
                                    className="mr-2 h-[19px] w-[19px]"
                                />
                                <span>Alerts</span>
                            </Link>

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
<<<<<<< HEAD
                                className="mr-1"
=======
                                className="mr-1 h-[18px] w-[18px]"
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                            />
                            <span>Reset</span>
                        </button>
                        <button className="mr-8 flex justify-center items-center">
                            <Image
                                src="/img/close.svg"
                                alt="reset"
                                width={18}
                                height={18}
<<<<<<< HEAD
                                className="mr-1"
=======
                                className="mr-1 h-[18px] w-[18px]"
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                            />
                            <span>Clear All</span>
                        </button>
                        <button className="flex justify-center items-center">
                            <Image
                                src="/img/sliders.svg"
                                alt="reset"
                                width={18}
                                height={18}
<<<<<<< HEAD
                                className="mr-1"
=======
                                className="mr-1 h-[18px] w-[18px]"
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                            />
                            <span>Filters</span>
                        </button>
                    </div>

                    {/* Images Grid */}
                    {filterData && filterData.length > 0 ?
                        <div className="relative grid grid-cols-3 gap-10 mt-8">

                            {

                                filterData.map((item: any, index: any) => (
<<<<<<< HEAD
                                    <>
                                        <div className="col-span-3 sm:col-span-2 md:col-span-3 lg:col-span-1 xl:col-span-4..." key={index}>
=======
                                    <div key={index}>
                                        <div className="col-span-3 sm:col-span-2 md:col-span-3 lg:col-span-1 xl:col-span-4..." >
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
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
                                                                pathname: "/dashboard/eopswatch/productionview",
                                                                query: {
                                                                    objectID: parentAsset.objectID,
                                                                    key: parentAsset.key,
                                                                    model: parentAsset.model,
                                                                    id: parentAsset.id,
                                                                    subObject: parentAsset.subObject,
                                                                    result: item.resultImage ? item.resultImage : '',
<<<<<<< HEAD
                                                                    imageID : item.imageID
                                                                }
                                                            }}
                                                            className="bg-yellow-951 rounded rounded-md flex justify-center items-center texxt-black font-semibold text-sm p-2 w-32"
=======
                                                                    imageID: item.imageID
                                                                }
                                                            }}
                                                            className="bg-yellow-951 rounded rounded-md flex justify-center items-center texxt-black font-semibold text-sm p-2 w-24"
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                                                        >
                                                            <Image
                                                                src="/img/carIcon.svg"
                                                                alt="car"
                                                                height={21}
                                                                width={21}
<<<<<<< HEAD
                                                                className="mr-2"
                                                            />
                                                            <span>Show Result</span>
                                                        </Link>
                                                        <button
=======
                                                                className="mr-2 h-[21px] w-[21px]"
                                                            />
                                                            <span>Test</span>
                                                        </Link>
                                                        <button
                                                            // onClick={() => setShowImageModal(true)}
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                                                            onClick={() => imageModal(item.path)}
                                                            className="bg-yellow-951 rounded rounded-md flex justify-center items-center texxt-black font-semibold text-sm p-2 w-24 ml-3"
                                                        >
                                                            <Image
                                                                src="/img/search.svg"
                                                                alt="car"
                                                                height={21}
                                                                width={21}
<<<<<<< HEAD
                                                                className="mr-2"
                                                            />
                                                            <span>Preview</span>
=======
                                                                className="mr-2 h-[21px] w-[21px]"
                                                            />
                                                            <span>Prev</span>
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
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
<<<<<<< HEAD
=======
                                                        className="h-[14px] w-[14px]"
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
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
<<<<<<< HEAD
                                                                        className="h-6"
=======
                                                                        className="h-6 h-[24px] w-[24px]"
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
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

<<<<<<< HEAD
                                    </>
=======
                                    </div>
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
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
<<<<<<< HEAD
                                                    className="h-6"
=======
                                                    className="h-6 h-[24px] w-[24px]"
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
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
<<<<<<< HEAD
=======
                                                                className="h-[24px] w-[24px]"
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
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