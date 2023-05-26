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
    }, [localData.localData])


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
                setChildObject(response.data)
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
        // var formData = new FormData(e.target);
        // const form_values = Object.fromEntries(formData);
        console.log("HERE", e.target);
    }

    // Storing data in json for sub class
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        var formData = new FormData(e.target);
        const form_values = Object.fromEntries(formData);
        console.log("form_values", form_values)
        const response = await fetch('/api/createChildObject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    class: parentAsset.class,
                    object: parentAsset.subObject,
                    VIN: parentAsset.object,
                    tags: form_values,
                    dateCreated: new Date().toLocaleString() + ""
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


    return (
        <>
            <div className="flex font-OpenSans">

                <div className="w-[84%]">
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
                                                <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">VIN {parentAsset.object}</span>
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
                                    <input type="hidden" name="dateCreated" value={new Date().toLocaleString() + ""} />
                                    <input type="hidden" name="dateModified" value={new Date().toLocaleString() + ""} />
                                    <input type="hidden" name="class" value={parentAsset.class} />
                                    <input type="hidden" name="VIN" value={parentAsset.object} />
                                    <input type="hidden" name="object" value={parentAsset.subObject} />
                                    <input type="hidden" name="mfdDate" value={mfdDate ? mfdDate : new Date().toLocaleString() + ""} />

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
                                                    if (item == "Mfd Date") {
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
                                        <table className={`table-auto min-w-full w-full text-left ${styles.table}`}>
                                            <thead className="bg-gray-950 rounded-lg h-10 text-sm font-light">
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Battery Type</th>
                                                    <th>Size</th>
                                                    <th>Mfd Date</th>
                                                    <th>Date Created</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    childObject.map((item: any, index: any) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item?.tags?.BatteryType}</td>
                                                            <td>{item?.tags.Size}</td>
                                                            <td>{item?.tags.mfdDate}</td>
                                                            <td>{item?.dateCreated}</td>
                                                            <td>
                                                                <button className="mr-8">
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
                                                    ))
                                                }                                               

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                :
                                <div className="h-72 flex justify-center items-center flex-wrap flex-col mt-8">
                                    <NoDataFound createText="Create Sub Asset" />
                                </div>
                        }

                    </div>
                </div>

                <div className="w-[16%] pl-5">
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