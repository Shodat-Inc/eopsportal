import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'
import axios from 'axios';
import NoDataFound from "../../../common/nodatafound";
import { setClassBreadcrumb, setDataForeOpsWatchAction } from "@/store/actions/classAction";

const batteryJSON = [
    {
        "SerialNo": "LI7481",
        "VIN": "5PVBN3TK3R6Y67222",
        "modal": "Battery Life Prediction",
        "ID": "5PVBE7AJ8R5T50001",
        "object": "Battery",
        "className": "Vehicles",
        "Manufacturer": "Cummins",
        "Capacity(AH)": "230",
        "Voltage(V)": "600",
        "subData": [
            {
                "ID": 1,
                "Capacity": "1.856",
                "VoltageMeasured": "3.97",
                "CurrentMeasured": "2.012528",
                "TemperatureMeasured": "24.39",
                "CurrentLoad": "1.99",
                "VoltageLoad": "3.06",
                "DateTime": "2022-07-02 15:25:4",
            },

            {
                "ID": 2,
                "Capacity": "1.38",
                "VoltageMeasured": "3.402",
                "CurrentMeasured": "2",
                "TemperatureMeasured": "33.02",
                "CurrentLoad": "1.99",
                "VoltageLoad": "2.493",
                "DateTime": "2023-01-10 07:56:22",
            },
            {
                "ID": 3,
                "Capacity": "1.27",
                "VoltageMeasured": "3.19",
                "CurrentMeasured": "1.89",
                "TemperatureMeasured": "35.48",
                "CurrentLoad": "1.85",
                "VoltageLoad": "2.25",
                "DateTime": "2023-03-22 01:29:35",
            }
        ]
    }
]

export default function EopsTracePreview() {

    const router = useRouter();
    const dispatch = useDispatch<any>();
    const parentAsset = router.query;
    const routerParams = router.query;
    const [showModal, setShowModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [data, setData] = useState([] as any);
    const [objdata, setObjdata] = useState([] as any);
    const [resImage, setResImage] = useState("");
    const [nav, setNav] = useState({} as any)
    const [expend, setExpend] = useState(false);

    const getSelClass = useSelector((state: any) => state.classReducer);
    const classSelector = useSelector((state: any) => state.classReducer);
    useEffect(() => {
        setNav(getSelClass.classBreadcrumbs)
    }, [getSelClass.classBreadcrumbs])

    const toggleExpend = () => {
        setExpend(!expend)
    }

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
    // Fetch Data from JSON
    const fetchObjectData = () => {
        axios.get("/api/getBattery").then((response) => {
            if (response.data) {

                console.log({
                    response: response.data
                })

                const filtered = response.data.filter((item: any) => {


                    // if (item.className === parentAsset.objectID && item.SerialNo === parentAsset.key && item.modal === parentAsset.model) {
                    //     return item;
                    // }

                    if (item.className === (routerParams.objectID || classSelector?.dataforeopswatchReducer?.class) &&
                        item.SerialNo === (routerParams.key || classSelector?.dataforeopswatchReducer?.subClassObjValue) &&
                        item.modal === (routerParams.model || classSelector?.dataforeopswatchReducer?.model)
                    ) {
                        return item;
                    }

                });

                console.log({
                    consition1: routerParams.objectID || classSelector?.dataforeopswatchReducer?.class,
                    consition2: routerParams.key || classSelector?.dataforeopswatchReducer?.subClassObjValue,
                    consition3: routerParams.model || classSelector?.dataforeopswatchReducer?.model,

                    response: response.data,
                    filtered: filtered
                })

                if (filtered && filtered.length > 0) {
                    setObjdata(filtered);
                }
            }
        });
    }
    useEffect(() => {
        fetchObjectData();
        if (fetchObjectData.length) return;
    }, [parentAsset])

    const goBacktoHome = () => {

        let abc = {
            "flow": "Object Management",
            "class": classSelector?.classBreadcrumbs?.class,
            "classObjKey": classSelector?.classBreadcrumbs?.classObjKey,
            "classObjValue": classSelector?.classBreadcrumbs?.classObjValue,
            "subClass": classSelector?.classBreadcrumbs?.subClass,
            "subClassObjKey": classSelector?.classBreadcrumbs?.subClassObjKey,
            "subClassObjValue": classSelector?.classBreadcrumbs?.subClassObjValue,
            "tab": 2,
            "parentTab": 0,
            "model": classSelector?.dataforeopswatchReducer?.model
        }
        dispatch(setClassBreadcrumb(abc))
        dispatch(setDataForeOpsWatchAction(abc))

        setTimeout(() => {
            router.push('/dashboard/assetmanagement');
        }, 100)
    }

    const backtoObjectManagementLevel = () => {
        let abc = {
            "flow": "Object Management",
            "class": classSelector?.classBreadcrumbs?.class,
            "classObjKey": classSelector?.classBreadcrumbs?.classObjKey,
            "classObjValue": classSelector?.classBreadcrumbs?.classObjValue,
            "subClass": classSelector?.classBreadcrumbs?.subClass,
            "subClassObjKey": classSelector?.classBreadcrumbs?.subClassObjKey,
            "subClassObjValue": classSelector?.classBreadcrumbs?.subClassObjValue,
            "tab": 2,
            "parentTab": 0,
            "model": classSelector?.dataforeopswatchReducer?.model
        }
        dispatch(setClassBreadcrumb(abc))
        dispatch(setDataForeOpsWatchAction(abc))
        setTimeout(() => {
            router.push('/dashboard/assetmanagement');
        }, 100)
    }


    const backtoSubObjectManagementLevel = () => {
        let abc = {
            "flow": "Object Management",
            "class": classSelector?.classBreadcrumbs?.class,
            "classObjKey": classSelector?.classBreadcrumbs?.classObjKey,
            "classObjValue": classSelector?.classBreadcrumbs?.classObjValue,
            "subClass": classSelector?.classBreadcrumbs?.subClass,
            "subClassObjKey": classSelector?.classBreadcrumbs?.subClassObjKey,
            "subClassObjValue": classSelector?.classBreadcrumbs?.subClassObjValue,
            "tab": 3,
            "parentTab": 2,
            "model": classSelector?.dataforeopswatchReducer?.model
        }
        dispatch(setClassBreadcrumb(abc))
        dispatch(setDataForeOpsWatchAction(abc))
        setTimeout(() => {
            router.push('/dashboard/assetmanagement');
        }, 100)
    }

    const backtoModelPage = () => {
        let abc = {
            "flow": "Object Management",
            "class": classSelector?.classBreadcrumbs?.class,
            "classObjKey": classSelector?.classBreadcrumbs?.classObjKey,
            "classObjValue": classSelector?.classBreadcrumbs?.classObjValue,
            "subClass": classSelector?.classBreadcrumbs?.subClass,
            "subClassObjKey": classSelector?.classBreadcrumbs?.subClassObjKey,
            "subClassObjValue": classSelector?.classBreadcrumbs?.subClassObjValue,
            "tab": 3,
            "parentTab": 2,
            "model": classSelector?.dataforeopswatchReducer?.model
        }
        dispatch(setClassBreadcrumb(abc))
        dispatch(setDataForeOpsWatchAction(abc))
        setTimeout(() => {
            router.push('/dashboard/assetmanagement/models');
        }, 100)
    }

    const handleModal = (item: any) => {
        setShowModal(false)
    }


    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOps Trace</p>
                </div>

                <div className="border min-h-full rounded-xl mt-3 px-4 py-4">
                    <div className="flex justify-start items-center mb-5">
                        {/* Breadcrumb */}
                        {nav ?
                            <>
                                <div className="relative bg-white rounded-lg px-3 py-1 inline-flex border border-[#E3E3E3] ">
                                    <ul className="flex justify-start items-center text-sm">
                                        <li className="flex justify-start items-center">
                                            <Link
                                                href="/dashboard/assetmanagement"
                                                className="font-semibold"
                                            >
                                                {nav.flow}
                                            </Link>
                                        </li>

                                        {
                                            !expend &&
                                            <li className=" flex justify-start items-center">
                                                <Image
                                                    src="/img/chevron-right.svg"
                                                    alt="chevron-right"
                                                    height={28}
                                                    width={28}
                                                />
                                                <span className=" ">[......]</span>
                                            </li>
                                        }

                                        {expend &&
                                            <>
                                                <li className="flex justify-start items-center">
                                                    <Image
                                                        src="/img/chevron-right.svg"
                                                        alt="chevron-right"
                                                        height={28}
                                                        width={28}
                                                    />
                                                    <button
                                                        onClick={goBacktoHome}
                                                        className="font-semibold"
                                                    >
                                                        <span>Class name: {nav.class}</span>
                                                    </button>
                                                </li>
                                                <li className="flex justify-start items-center">
                                                    <Image
                                                        src="/img/chevron-right.svg"
                                                        alt="chevron-right"
                                                        height={28}
                                                        width={28}
                                                    />
                                                    <button
                                                        onClick={backtoObjectManagementLevel}
                                                        className="font-semibold"
                                                    >
                                                        <span>{nav.classObjKey}: {nav.classObjValue}</span>
                                                    </button>
                                                </li>

                                                <li className="flex justify-start items-center">
                                                    <Image
                                                        src="/img/chevron-right.svg"
                                                        alt="chevron-right"
                                                        height={28}
                                                        width={28}
                                                    />
                                                    <button
                                                        onClick={backtoSubObjectManagementLevel}
                                                        className="font-semibold"
                                                    >
                                                        <span>
                                                            Sub Class: {nav.subClass}
                                                        </span>
                                                    </button>
                                                </li>

                                                <li className="flex justify-start items-center">
                                                    <Image
                                                        src="/img/chevron-right.svg"
                                                        alt="chevron-right"
                                                        height={28}
                                                        width={28}
                                                    />
                                                    <button
                                                        onClick={backtoSubObjectManagementLevel}
                                                        className="font-semibold"
                                                    >
                                                        <span>{nav.subClassObjKey}: {nav.subClassObjValue}</span>
                                                    </button>
                                                </li>

                                                <li className="flex justify-start items-center">
                                                    <Image
                                                        src="/img/chevron-right.svg"
                                                        alt="chevron-right"
                                                        height={28}
                                                        width={28}
                                                    />
                                                    <button
                                                        onClick={backtoModelPage}
                                                        className="font-semibold"
                                                    >
                                                        <span>{classSelector?.dataforeopswatchReducer?.model}</span>
                                                    </button>
                                                </li>

                                            </>
                                        }

                                        <li className="flex justify-start items-center">
                                            <Image
                                                src="/img/chevron-right.svg"
                                                alt="chevron-right"
                                                height={28}
                                                width={28}
                                            />
                                            <span className="text-gray-967 capitalize">Test</span>
                                        </li>

                                    </ul>
                                </div>
                                <button
                                    onClick={toggleExpend}
                                    className="bg-yellow-951 h-[22px] w-[22px] rounded-full inline-flex justify-center items-center cursor-pointer ml-1"
                                >
                                    {
                                        expend ?
                                            <Image
                                                src="/img/arrow-left-black.svg"
                                                alt="arrow"
                                                height={20}
                                                width={20}
                                            />
                                            :
                                            <Image
                                                src="/img/arrow-right-black.svg"
                                                alt="arrow"
                                                height={20}
                                                width={20}
                                            />
                                    }

                                </button>
                            </>
                            : null
                        }
                    </div>

                    <div className="flex items-end justify-end">
                        {/* Upload Button */}
                        <div className="flex items-end justify-end">
                            <button
                                className="flex justify-center items-center text-black bg-yellow-951 rounded-xl h-12 px-4 transition-opacity duration-300"
                                onClick={() => setShowModal(true)}
                            >
                                <Image
                                    src="/img/upload-black.svg"
                                    alt="activity"
                                    height={24}
                                    width={24}
                                    className="mr-2"
                                />
                                <span>Upload Data</span>
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

                    {/* Table Grid */}
                    {objdata && objdata.length > 0 ?
                        <div className={`relative mt-8 h-[400px] overflow-y-auto ${styles.scrollDes}`}>

                            <div className={`overflow-hidden rounded-xl w-full mb-12 pr-2 ${styles.scrollDes1}`}>
                                {
                                    objdata[0]?.subData.map((item: any, k: any) => (

                                        <table key={k} className={`table-auto min-w-full text-left ${styles.table} ${styles.table2} mb-10`}>
                                            <thead className="bg-gray-952 text-white rounded-xl h-10 text-[13px] font-light">
                                                <tr>
                                                    {
                                                        Object.keys(item?.batteryInfo[0]).map((items: any, i: any) => (
                                                            <th key={i}>{items}</th>
                                                        ))
                                                    }
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-[13px] ">
                                                <tr>
                                                    {
                                                        Object.values(item?.batteryInfo[0]).map((items: any, i: any) => (
                                                            <td key={i}>{items}</td>
                                                        ))
                                                    }
                                                    <td className="w-[200px] relative">
                                                        <span className={`${styles.testbtn}`}>
                                                            <Link
                                                                href={{
                                                                    pathname: "/dashboard/assetmanagement/eopstraceresult",
                                                                    query: {
                                                                        objectID: parentAsset.objectID,
                                                                        key: parentAsset.key,
                                                                        model: parentAsset.model,
                                                                        id: parentAsset.id,
                                                                        subObject: parentAsset.subObject,
                                                                        pid: item.ID
                                                                    }
                                                                }}
                                                                className="bg-yellow-951 rounded-md flex justify-center items-center texxt-black font-semibold text-sm p-2 w-24"
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
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    ))
                                }
                            </div>


                            <div className="overflow-hidden border rounded-xl w-full mb-12 hidden">
                                {
                                    batteryJSON[0].subData.map((item: any, k: any) => (
                                        <table key={k} className={`table-auto min-w-full text-left mb-14 ${styles.table}`}>
                                            <thead className="bg-gray-952 text-white rounded-xl h-10 text-sm font-light">
                                                <tr>
                                                    {
                                                        Object.keys(item).map((items: any, i: any) => (

                                                            <th className="capitalize" key={i}>
                                                                {
                                                                    items.split(/(?=[A-Z])/).join(" ")
                                                                }
                                                            </th>
                                                        ))
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className={`text-sm cursor-pointer`}>
                                                    {
                                                        Object.values(item).map((items: any, i: any) => (

                                                            <td key={i}>
                                                                <Link
                                                                    href={{
                                                                        pathname: "/dashboard/eopstrace/modelview",
                                                                        query: {
                                                                            objectID: parentAsset.objectID,
                                                                            key: parentAsset.key,
                                                                            model: parentAsset.model,
                                                                            id: parentAsset.id,
                                                                            subObject: parentAsset.subObject,
                                                                            pid: item.ID
                                                                        }
                                                                    }}
                                                                >
                                                                    {items}
                                                                </Link>
                                                            </td>

                                                        ))
                                                    }
                                                </tr>
                                            </tbody>
                                        </table>
                                    ))
                                }
                            </div>

                        </div>
                        :
                        <div className="h-72 flex justify-center items-center flex-wrap flex-col mt-8 w-full">
                            <NoDataFound createText="No data found!" />
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
                                                        className="border border-gray-951 h-12 text-md pl-2 pr-2 mt-2 w-full rounded-xl"
                                                    />
                                                    <div className="mt-8 mb-8 text-black text-center font-semibold">Or</div>
                                                    <p className="text-black text-lg font-semibold">Upload images from your local</p>
                                                    <div className="relative mt-10 w-[500px] items-center justify-center mb-10">
                                                        <input type="file" name="uploadImages" id="uploadImages" className="scale-150 relative left-32 z-10 opacity-0" />
                                                        <div className="text-white rounded-xl shadow-xl flex justify-center items-center bg-gray-955  w-full h-16 flex-wrap flex-col absolute top-[-13px]">
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

EopsTracePreview.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}