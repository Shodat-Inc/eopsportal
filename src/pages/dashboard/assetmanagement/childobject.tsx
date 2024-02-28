import React, { useState, useRef, useEffect } from "react";
import Layout from "../../../components/Layout";
import NoDataFound from "../../../common/nodatafound";
import styles from '../../../styles/Common.module.css';
import { getChildObjectsData } from "../../../lib/getchildobjects";
import { useRouter } from 'next/router'
import Link from "next/link";
import Image from "next/image";
import Template from "../template";
import axios from 'axios';
import moment from "moment";
import AlertMessage from "@/common/alertMessage";
import { Input } from "@material-tailwind/react";
import type { InputStylesType } from "@material-tailwind/react";
import Datepicker from "react-tailwindcss-datepicker";



export async function getServerSideProps() {
    const localData = await getChildObjectsData()
    return {
        props: {
            localData,
        },
    }
}

export default function ChildObject(localData: any) {
    const router = useRouter();
    const parentAsset = router.query;
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [allTags, setAllTags] = useState<any[]>([]);
    const [newTag, setNewTag] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [hide, setHide] = useState(false);
    const [showHideAddTagButton, setShowHideAddTagButton] = useState(false);
    const [selParentTags, setSelParentTags] = useState<any[]>([]);

    const [checkIcon, setCheckIcon] = useState("/img/blank_check_box_icon_white.svg");
    const [tag, setTag] = useState<any[]>([]);


    const VIN = useRef("");
    const ModalType = useRef("");
    const Color = useRef("");
    const CapacityInCC = useRef("");
    const Cylinders = useRef("");
    const [calDate, setCalDate] = useState({
        startDate: null,
        endDate: null
    });
    const [mfdDate, setMfdDate] = useState();
    const [subClassData, setSubClassData] = useState<any[]>([]);
    const [childObject, setChildObject] = useState<any[]>([]);
    const [subObj, setSebObj] = useState({} as any);
    const [deleteModal, setDeleteModal] = useState(false);


    // Get JSON data on page load
    const fetchData = () => {
        axios.get("/api/getObjects").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    return item.parentAssetID === parentAsset.assets;
                });
                if (filtered && filtered.length > 0) {
                    setData(filtered);
                }
            }
        });
    };
    useEffect(() => {
        fetchData();
        if (fetchData.length) return;
    }, [parentAsset])


    // Get JSON sub class data on page load
    const fetchClassData = () => {
        axios.get("/api/getSubAssets").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    return item.assetName === parentAsset.subObject;
                });
                if (filtered && filtered.length > 0) {
                    setSubClassData(filtered[0].tags);
                }
            }
        });
    };
    useEffect(() => {
        fetchClassData();
        if (fetchClassData.length) return;
    }, [parentAsset])


    // Get Child Object data on page load
    const fetchChildObjectData = () => {
        axios.get("/api/getChildObject").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    return item.object === parentAsset.subObject;
                });
                if (filtered && filtered.length > 0) {
                    setChildObject(filtered);
                    setSebObj(filtered[0]);
                }
            }
        });
    };
    useEffect(() => {
        fetchChildObjectData();
        if (fetchChildObjectData.length) return;
    }, [parentAsset])


    // Check if array contains an item
    const isInArray = (value: any, array: any) => {
        return array.indexOf(value) > -1;
    }

    const handleValueChange = (newValue: any) => {
        setCalDate(newValue);
        setMfdDate(newValue.startDate)
    }


    // Clear All Fields
    const clearAll = (e: any) => {
        e.preventDefault();
    }

    // Storing data in json for sub class
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        var formData = new FormData(e.target);
        let currentDate = new Date().toISOString().split('T')[0];
        const form_values = Object.fromEntries(formData);
        const response = await fetch('/api/createChildObject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    className: parentAsset.class,
                    object: parentAsset.subObject,
                    subObject: parentAsset.object,
                    dateCreated: currentDate,
                    tags: form_values,
                }
            )
        });
        const resdata = await response.json();
        if (resdata) {
            router.replace(router.asPath);
            setShowModal(false);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 5000);
        } else {
            console.log("FAILED")
        }
    }

    const joinKey = [
        {
            "objectName": "Manufacturing Plants",
            "key": "PlantID",
        },
        {
            "objectName": "Vehicles",
            "key": "VIN",
        },
        {
            "objectName": "Gas Station",
            "key": "ABC",
        }
    ]

    var linkKey = joinKey.filter(function (items: any) { return items.objectName === parentAsset.class; });

    // Delete Asset
    const deleteAsset = (assetID: any) => {
        setDeleteModal(true);
    }

    return (
        <>
            <div className="flex font-OpenSans">

                <div className="w-[100%]">
                    <div className="columns-2 flex justify-between items-center">
                        <p className="text-black text-lg mb-0 font-bold">Asset Management</p>
                    </div>

                    <div className="border min-h-full rounded-xl mt-3 px-4 py-4 bg-gray-953">
                        <div className="flex justify-start items-start">
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
                                        <div className="flex items-center">
                                            <Image
                                                src="/img/arrow-right.svg"
                                                alt="arrow-right"
                                                className="h-6"
                                                height={24}
                                                width={24}
                                            />
                                            <Link
                                                href={{
                                                    pathname: '/dashboard/assetmanagement/objects',
                                                    query: {
                                                        assets: parentAsset.class
                                                    }
                                                }}
                                                className="inline-flex items-center text-sm font-medium text-black hover:text-yellow-950"
                                            >
                                                <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">{parentAsset.class}</span>
                                            </Link>
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
                                            <Link
                                                href={{
                                                    pathname: '/dashboard/assetmanagement/subobject',
                                                    query: {
                                                        object: parentAsset.object,
                                                        parentObject: parentAsset.class
                                                    }
                                                }}
                                                className="inline-flex items-center text-sm font-medium text-black hover:text-yellow-950"
                                            >
                                                <span>{parentAsset.class === 'Manufacturing Plants' ? "PlantID" : "VIN"}</span>
                                                <span className="ml-2">{parentAsset.object}</span>
                                            </Link>
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
                                            <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">{parentAsset.subObject}</span>
                                        </div>
                                    </li>
                                </ol>
                            </nav>
                        </div>

                        {/* --- Alerts Start--- */}
                        {success ? <AlertMessage /> : null}
                        {/* --- Alerts End--- */}

                        <div className="flex justify-start items-start flex-wrap flex-col mt-4">
                            {subClassData && subClassData.length > 0 ?
                                <form
                                    className="flex justify-center items-center flex-wrap flex-col w-full"
                                    method='post'
                                    onSubmit={handleSubmit}
                                >
                                    <div className="flex justify-between items-start w-full flex-wrap flex-row">
                                        <h4 className="font-bold text-lg color-black font-semibold">Create New Object</h4>
                                        <div className="relative flex">
                                            <div
                                                className="flex justify-center items-center bg-white text-black rounded-t-md w-[130px] h-[50px] font-semibold cursor-pointer mr-7 transition-opacity duration-[100ms] outline-none transform active:scale-75 transition-transform"
                                                onClick={clearAll}
                                            >
                                                <Image
                                                    src="/img/close.svg"
                                                    alt="close"
                                                    height={14}
                                                    width={14}
                                                    className="mr-2"
                                                />
                                                <span>Clear All</span>
                                            </div>
                                            <button
                                                className="flex justify-center items-center bg-yellow-950 text-black rounded-t-md w-[130px] h-[50px] font-semibold transition-opacity duration-100 outline-none transform active:scale-75 transition-transform transition-all duration-[100ms] transition-opacity duration-100 outline-none transform active:scale-75 transition-transform"
                                            >
                                                <Image
                                                    src="/img/tick.svg"
                                                    alt="close"
                                                    height={14}
                                                    width={14}
                                                    className="mr-2"
                                                />
                                                <span>Save</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="shadow-lg bg-white p-5 pt-2 w-full rounded-lg rounded-tr-none min-h-[170px]">
                                        <div className="flex justify-start items-center flex-wrap flex-row">
                                            {
                                                subClassData.map((item: any, key: any) => {
                                                    if (item == "Mfd Date" || item === "mfdDate" || item === "MfgDate") {
                                                        return (
                                                            <div className="relative lg:w-[50%] small:w-full md:w-[50%] sm:w-full mb-1 sm:px-1 pt-[15px]" key={key}>
                                                                <div className="rounded-lg border border-gray-954 h-[50px] small lg:w-[380px] small:w-full sm:w-full focus:outline-none focus:border-yellow-951">
                                                                    <Datepicker
                                                                        toggleClassName="absolute bg-yellow-951 rounded-r-lg text-white right-0 h-[50px] px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                                                                        placeholder={item}
                                                                        useRange={false}
                                                                        asSingle={true}
                                                                        value={calDate}
                                                                        onChange={handleValueChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                    } else {
                                                        return (
                                                            <div className="relative lg:w-[50%] small:w-full md:w-[50%] sm:w-full mb-0 sm:px-1" key={key}>
                                                                <div className={`mb-1 lg:w-[380px] small:w-full small:w-full ${styles.form__wrap}`}>
                                                                    <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                                        <input
                                                                            type="text"
                                                                            id={item}
                                                                            name={item.split(" ").join("")}
                                                                            className={`border border-gray-961 ${styles.form__field}`}
                                                                            placeholder={item}
                                                                            required
                                                                            onChange={(e) => (VIN.current = e.target.value)}
                                                                        />
                                                                        <label htmlFor={item} className={`${styles.form__label}`}>{item}</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                }
                                                )
                                            }
                                        </div>

                                    </div>
                                </form>
                                : null}
                        </div>


                        {
                            childObject && childObject.length > 0 ?

                                <div className="h-96 flex justify-start items-start flex-wrap flex-col mt-4">
                                    <h4 className="font-bold text-lg color-black mb-4 font-semibold">Objects</h4>
                                    <div className="lg:overflow-hidden md:overflow-x-scroll sm:overflow-x-scroll border border-gray-958 rounded-xl lg:w-full md:w-full lg:w-full sm:w-full small:w-full small:overflow-x-scroll h-[300px] bg-white">
                                        <table className={`table-auto min-w-full w-full text-left ${styles.table} ${styles.tableTab}`}>
                                            <thead className="bg-black text-white rounded-xl h-10 text-[14px] font-light">
                                                <th>S.No</th>
                                                {
                                                    subObj && Object.keys(subObj).length != 0 ?
                                                        Object.keys(subObj?.tags).map((item: any, i: any) => (
                                                            <th className="capitalize" key={i}>
                                                                {
                                                                    item.split(/(?=[A-Z])/).join(" ")
                                                                }
                                                            </th>
                                                        ))
                                                        : null
                                                }
                                                <th>Actions</th>
                                            </thead>
                                            <tbody className="cursor-pointer">
                                                {
                                                    childObject.map((items: any, index: any) => {
                                                        return (
                                                            <tr key={index} className={`text-sm`}>
                                                                <td>{index + 1}</td>
                                                                {
                                                                    Object.values(items?.tags).map((item: any, i: any) => (
                                                                        <td className="" key={i}>
                                                                            <Link
                                                                                key={i}
                                                                                href={{
                                                                                    pathname: '/dashboard/assetmanagement/subchildobject',
                                                                                    query: {
                                                                                        class: parentAsset.class,
                                                                                        object: parentAsset.object,
                                                                                        subObject: parentAsset.subObject,
                                                                                        id: parentAsset.class === "Manufacturing Plants" ? items.tags.ID : (items.tags.SerialNo ? items.tags.SerialNo : items.tags.SerialID)
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <span className="font-medium">{item}</span>
                                                                            </Link>
                                                                        </td>

                                                                    ))
                                                                }
                                                                <td>
                                                                    <button className="mr-4 transition-opacity duration-[100ms] outline-none transform active:scale-75 transition-transform">
                                                                        <Image
                                                                            src="/img/edit.svg"
                                                                            alt="Edit"
                                                                            height={18}
                                                                            width={18}
                                                                        />
                                                                    </button>
                                                                    <button className="transition-opacity duration-[100ms]  outline-none transform active:scale-75 transition-transform " onClick={() => deleteAsset(items)}>
                                                                        <Image
                                                                            src="/img/trash.svg"
                                                                            alt="Trash"
                                                                            height={18}
                                                                            width={18}
                                                                        />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )

                                                    })
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                :
                                <div className="h-72 flex justify-center items-center flex-wrap flex-col mt-8">
                                    <NoDataFound createText="Create Sub Sub Class" />
                                </div>
                        }



                        {/* Links Box */}
                        <div className="mt-0 flex  w-full hidden">
                            <div className="flex flex-wrap flex-row w-full justify-end">
                                <Link
                                    href={{
                                        pathname: '/dashboard/eopswatch/eopswatchmodel',
                                        query: {
                                            objectID: parentAsset.class,
                                            key: parentAsset.id
                                        }
                                    }}
                                    className="rounded-lg h-20 w-auto bg-red-951 flex justify-center items-center px-2 py-2 mr-4 flex-wrap flex-col"
                                >
                                    <Image
                                        src="/img/clockwhite.svg"
                                        alt="eops watch"
                                        height={24}
                                        width={24}
                                        className="mb-2"
                                    />
                                    <span className="text-white text-[14px]">eOps Watch</span>
                                </Link>

                                <Link
                                    href={{
                                        pathname: '/dashboard/eopswatch/eopswatchmodel',
                                        query: {
                                            objectID: parentAsset.class,
                                            key: parentAsset.id
                                        }
                                    }}
                                    className="rounded-lg h-20 w-auto bg-green-952 flex justify-center items-center px-2 py-2 mr-4 flex-wrap flex-col"
                                >
                                    <Image
                                        src="/img/airplaywhite.svg"
                                        alt="eops watch"
                                        height={24}
                                        width={24}
                                        className="mb-2"
                                    />
                                    <span className="text-white text-[14px]">eOps Trace</span>
                                </Link>

                                <div className="rounded-lg h-20 w-auto bg-blue-953 flex justify-center items-center px-2 py-2 flex-wrap flex-col mr-4">
                                    <Image
                                        src="/img/maximizewhite.svg"
                                        alt="eops Prosense"
                                        height={24}
                                        width={24}
                                        className="mb-2"
                                    />
                                    <span className="text-white text-[14px]">eOps Prosense</span>
                                </div>

                                <div className="rounded-lg h-20 w-auto bg-brown-951 flex justify-center items-center px-2 py-2 flex-wrap flex-col">
                                    <Image
                                        src="/img/bar-chart-white.svg"
                                        alt="eops Prosense"
                                        height={24}
                                        width={24}
                                        className="mb-2"
                                    />
                                    <span className="text-white text-[14px]">eOps Insight/Reports</span>
                                </div>

                            </div>
                        </div>
                        {/* Links Box Ends */}


                    </div>
                </div>

                <div className="w-[16%] pl-5 hidden">
                    <Template />
                </div>


                {/* ===== Delete Modal starts ===== */}
                {deleteModal ?
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
                                            className="p-1 ml-auto bg-transparent border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none transition-opacity duration-[100ms] outline-none transform active:scale-75 transition-transform"
                                            onClick={() => setDeleteModal(false)}
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
                                            <p className="flex justify-center items-center text-lg">Are you sure want to delete this record?</p>
                                            <div className="mt-10 relative flex justify-center items-center w-full">
                                                <button
                                                    className="border border-black rounded-lg bg-black text-white text-lg w-[70px] h-[47px] mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-[100ms] disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                                                    onClick={() => { setDeleteModal(false); }}
                                                >
                                                    Yes
                                                </button>
                                                <button
                                                    className="border border-black rounded-lg bg-white text-black text-lg w-[70px] h-[47px] hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-[100ms]"
                                                    onClick={() => { setDeleteModal(false); }}
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
                {/* ===== Delete Modal Ends ===== */}


            </div>
        </>
    )
}

ChildObject.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}