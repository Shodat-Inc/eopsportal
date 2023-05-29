import React, { useState, useRef, useEffect } from "react";
import Layout from "../../components/Layout";
import NoDataFound from "../../common/nodatafound";
import styles from '../../styles/Common.module.css';
import { getChildObjectsData } from "../../lib/getchildobjects";
import { useRouter } from 'next/router'
import Link from "next/link";
import Image from "next/image";
import Template from "./template";
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
            "objectName" : "Manufacturing Plants",
            "key": "PlantID",
        }, 
        {
            "objectName" : "Vehicles",
            "key": "VIN",
        },
        {
            "objectName" : "Gas Station",
            "key": "ABC",
        }
    ]

    var linkKey = joinKey.filter(function (items:any) { return items.objectName === parentAsset.class; });
    
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
                                                    pathname: '/dashboard/objects',
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
                                                    pathname: '/dashboard/subobject',
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
                                                className="flex justify-center items-center bg-white text-black rounded-t-md w-[130px] h-[50px] font-semibold cursor-pointer mr-7"
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
                                                className="flex justify-center items-center bg-yellow-950 text-black rounded-t-md w-[130px] h-[50px] font-semibold"
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
                                    <div className="shadow-lg bg-white p-5 w-full rounded-lg rounded-tr-none min-h-[170px]">
                                        <div className="flex justify-start items-center flex-wrap flex-row">
                                            {
                                                subClassData.map((item: any, key: any) => {
                                                    if (item == "Mfd Date" || item === "mfdDate" || item === "MfgDate") {
                                                        return (
                                                            <div className="relative w-[50%] mb-5" key={key}>
                                                                <div className="rounded-lg border border-gray-954 h-[44px] w-[320px] focus:outline-none focus:border-yellow-951">
                                                                    <Datepicker
                                                                        toggleClassName="absolute bg-yellow-951 rounded-r-lg text-white right-0 h-[42px] px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
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
                                                            <div className="relative w-[50%] mb-5" key={key}>
                                                                <input
                                                                    type="text"
                                                                    placeholder={item}
                                                                    name={item.split(" ").join("")}
                                                                    className="rounded-lg border border-gray-954 h-[44px] pl-5 pr-5 w-[320px] focus:outline-none focus:border-yellow-951"
                                                                    onChange={(e) => (VIN.current = e.target.value)}
                                                                />
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
                                    <div className="overflow-x-auto border rounded-md w-full">
                                        <table className={`table-auto min-w-full w-full text-left ${styles.table} ${styles.tableObject}`}>
                                            <thead className="bg-gray-950 rounded-lg h-10 text-sm font-light">

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
                                            <tbody>

                                                {
                                                    childObject.map((items: any, index: any) => {
                                                        return (
                                                            <tr key={index} className={`text-sm`}>
                                                                <td>{index + 1}</td>
                                                                {
                                                                    Object.values(items?.tags).map((item: any, i: any) => (
                                                                        <td className="">
                                                                            <Link
                                                                                key={i}
                                                                                href={{
                                                                                    pathname: '/dashboard/subchildobject',
                                                                                    query: {
                                                                                        class: parentAsset.class,
                                                                                        object: parentAsset.object,
                                                                                        subObject: parentAsset.subObject,
                                                                                        id: parentAsset.class === "Manufacturing Plants" ? items.tags.PlantID : items.tags.VIN
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <span className="font-medium">{item}</span>
                                                                            </Link>
                                                                        </td>

                                                                    ))
                                                                }
                                                                <td>
                                                                    <button className="mr-2">
                                                                        <Image
                                                                            src="/img/edit.svg"
                                                                            alt="Edit"
                                                                            height={18}
                                                                            width={18}
                                                                        />
                                                                    </button>
                                                                    <button>
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
                        <div className="mt-0 flex  w-full">
                            <div className="flex flex-wrap flex-row w-full justify-end">
                                <Link
                                    href={{
                                        pathname: '/dashboard/eopswatch/eopswatchmodel',
                                        query: {
                                            objectID: parentAsset.class,
                                            key: parentAsset.object
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
                                            key: parentAsset.object
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


            </div>
        </>
    )
}

ChildObject.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}