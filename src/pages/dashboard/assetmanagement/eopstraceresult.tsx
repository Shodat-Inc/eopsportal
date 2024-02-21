import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'
import axios from 'axios';

import { setDataForeOpsWatchAction } from "@/store/actions/classAction";
import {
    setDataFromResultEopsWatchAction,
    setClassBreadcrumb
} from "@/store/actions/classAction";
import exp from "constants";

export default function EopsTraceResult() {
    const dispatch = useDispatch<any>();
    const router = useRouter();
    const parentAsset = router.query;
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([] as any);
    const [nav, setNav] = useState({} as any);
    const [expend, setExpend] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 3000)
    }, [])

    const getSelClass = useSelector((state: any) => state.classReducer);
    const classSelector = useSelector((state: any) => state.classReducer);
    useEffect(() => {
        setNav(getSelClass.classBreadcrumbs)
    }, [getSelClass.classBreadcrumbs])

    const fetchObjectData = () => {
        axios.get("/api/getBattery").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    if (item.className === parentAsset.objectID && item.SerialNo === parentAsset.key) {
                        return item;
                    }
                });
                if (filtered && filtered.length > 0) {
                    const arr = filtered[0].subData.filter((item: any) => {
                        if (item.ID.toString() === parentAsset.pid) {
                            return item
                        }
                    })
                    setData(arr);
                }
            }
        });
    }
    useEffect(() => {
        fetchObjectData();
        if (fetchObjectData.length) return;
    }, [parentAsset])

    const goBackToSubObjectManagement = () => {

        let type = "";
        let type2 = "";
        let abc = {} as any;
        if (classSelector?.dataforeopswatchReducer?.class === "Manufacturing Plants") {
            type = "PlantID",
                type2 = "ID"
        } else {
            if (classSelector?.dataforeopswatchReducer?.subClass === "Battery") {
                type = "VIN",
                    type2 = "SerialNo"
            } else {
                type = "VIN",
                    type2 = "SerialID"
            }
        }
        abc = {
            "flow": "Object Management",
            "class": classSelector?.dataforeopswatchReducer?.class,
            "classObjKey": type,
            "classObjValue": classSelector?.dataforeopswatchReducer?.classObject,
            "subClass": classSelector?.dataforeopswatchReducer?.subClass,
            "subClassObjKey": type2,
            "subClassObjValue": classSelector?.dataforeopswatchReducer?.object
        }
        dispatch(setClassBreadcrumb(abc));

        let data = {
            "comingFrom": "result",
        }
        setTimeout(() => {
            router.push('/dashboard/assetmanagement');
        }, 1000)
        dispatch(setDataFromResultEopsWatchAction(data));

    }


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

    const backtoPreviewPage = () => {
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
            router.push('/dashboard/assetmanagement/eopstracepreview');
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


    const toggleExpend = () => {
        setExpend(!expend)
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
                                <div className="relative bg-white rounded-lg px-3 py-1 inline-flex border border-[#E3E3E3]">
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
                                            <button
                                                onClick={backtoPreviewPage}
                                                className="font-semibold"
                                            >
                                                <span>Test</span>
                                            </button>
                                        </li>
                                        <li className="flex justify-start items-center">
                                            <Image
                                                src="/img/chevron-right.svg"
                                                alt="chevron-right"
                                                height={28}
                                                width={28}
                                            />
                                            <span className="text-gray-967 capitalize">Result</span>
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
                    <div className="flex justify-end items-center">
                        <div className="flex justify-center items-center">
                            <button className="bg-yellow-951 text-black rounded-xl border b order-yellow-951 flex justify-center items-center px-3 h-[44px] ml-2  mr-3  duration-300 outline-none transform active:scale-75 transition-transform">Generate RCA</button>
                            <button className="bg-yellow-951 text-black rounded-xl border b order-yellow-951 flex justify-center items-center px-3 h-[44px] ml-2  mr-3  duration-300 outline-none transform active:scale-75 transition-transform">Track Issue</button>
                        </div>
                    </div>


                    {/* Images */}
                    {
                        loader ?
                            <div className="relative w-full flex justify-center items-center h-96">
                                <Image
                                    src="/img/loading-gif.gif"
                                    alt="loader"
                                    height={124}
                                    width={124}
                                    className=""
                                />
                            </div>
                            :
                            <>
                                {
                                    data ?
                                        <div className="relative mt-10 overflow-hidden rounded-xl text-center flex flex-wrap flex-rpw items-center justify-around">

                                            <div className="border border-gray-951 rounded-xl p-4 w-56 h-48 flex items-center justify-center flex-wrap flex-col">
                                                <p className="text-black font-bold mb-2">{data[0]?.result.batteryUtilization}</p>
                                                <Image
                                                    src="/img/BatteryUtilization.svg"
                                                    alt="no image"
                                                    height={60}
                                                    width={75}
                                                    className="h-auto w-auto inline-block mb-2"
                                                />
                                                <p className="text-black font-semibold mb-10">Battery Utilization</p>
                                            </div>

                                            <div className="border border-gray-951 rounded-xl p-4 w-56 h-48 flex items-center justify-center flex-wrap flex-col">
                                                <p className="text-black font-bold mb-2">{data[0]?.result.remainingCyclesLeft}</p>
                                                <Image
                                                    src="/img/RemainingCycle.svg"
                                                    alt="no image"
                                                    height={60}
                                                    width={75}
                                                    className="h-auto w-auto inline-block mb-2"
                                                />
                                                <p className="text-black font-semibold mb-10">Remaining cycles left</p>
                                            </div>

                                            <div className="border border-gray-951 rounded-xl p-4 w-56 h-48 flex items-center justify-center flex-wrap flex-col">
                                                <p className="text-black font-bold mb-2">{data[0]?.result.estTotalCycle}</p>
                                                <Image
                                                    src="/img/totalCycle.svg"
                                                    alt="no image"
                                                    height={75}
                                                    width={75}
                                                    className="h-auto w-auto inline-block mb-2"
                                                />
                                                <p className="text-black font-semibold mb-10">Est. total cycle</p>
                                            </div>
                                        </div>
                                        : null
                                }
                            </>
                    }

                </div>
            </div>

            <div className="w-[16%] pl-5 hidden">
                <Template />
            </div>

        </div>
    )
}

EopsTraceResult.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}