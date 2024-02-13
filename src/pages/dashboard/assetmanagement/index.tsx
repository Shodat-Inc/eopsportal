import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import ClassManagement from "./classmanagement";
import ObjectManagement from "./objectmanagement";
import SubObjectManagement from "./subobjectmanagement";
import SubClassManagement from "./subclassmanagement";
import {
    setSelectedClass,
    toggleAddNewObjectModel,
    getSingleUser,
    toggleAddNewClassObjectModel,
    openCloseNewClassModalAction,
    successMessageAction,
    successMessagAdvancedAction
} from "@/store/actions/classAction";

import { getClassDataAction } from "@/store/actions/apiAction";

export default function AssetManagement() {
    const dispatch = useDispatch<any>();
    const [tab, setTab] = useState(1);
    const [classData, setClassData] = useState([] as any);
    const [defaultClass, setDefaultClass] = useState("");
    const [nav, setNav] = useState({} as any)
    const getSelClass = useSelector((state: any) => state.classReducer);
    const [objectKey, setObjectKey] = useState('');
    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }

    // All class reducer states
    const apiSelector = useSelector((state: any) => state.apiReducer);


    useEffect(() => {
        dispatch(getClassDataAction())
    }, [access_token])

    useEffect(() => {
        setClassData(apiSelector?.classDataReducer);
    }, [apiSelector?.classDataReducer])

    useEffect(() => {
        setNav(getSelClass.classBreadcrumbs)
    }, [getSelClass.classBreadcrumbs])

    useEffect(() => {
        if (classData && classData.length > 0) {
            setDefaultClass(classData[0]?.id)
            dispatch(setSelectedClass(classData[0]?.id))
        }
    }, [classData])

    const toggleTab = (item: any) => {
        setTab(item)
    }
    const [addClassModal, setAddClassModal] = useState(false);
    const openAddClassModal = () => {
        // setAddClassModal(!addClassModal);
        dispatch(openCloseNewClassModalAction(true))
    }

    const [addSubClassModal, setAddSubClassModal] = useState(false);
    const openAddSubClassModal = () => {
        setAddSubClassModal(!addSubClassModal)
    }

    const handleaddClassModal = (item: any) => {
        setAddClassModal(item)
    }

    // Object Management Callback
    const handelObject = (item: any) => {
        setObjectKey(item)
        if (item !== "") {
            setTab(3)
        } else {
            setTab(tab)
        }
    }

    // Sub Object Management Callback
    const handleSubObject = (item: any) => {
        if (item !== "") {
            setTab(2)
        } else {
            setTab(tab)
        }
    }

    const handleaddSubClassModal = (item: any) => {
        setAddSubClassModal(item)
    }

    // Sub Class Management Callback
    const handelsubClass = (item: any) => {
        dispatch(setSelectedClass(item))
        setDefaultClass(item)
        if (item !== "") {
            setTab(4)
        } else {
            setTab(tab)
        }
    }

    const openAddObjectModal = () => {
        dispatch(toggleAddNewObjectModel(true));
    }

    const openAddClassObjectModal = () => {
        dispatch(toggleAddNewClassObjectModel(true));
    }

    const backToPrevComponent = (item: any) => {
        if (item === 4) {
            setTab(1);
        }
        if (item === 3) {
            setTab(2);
        }
    }


    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%] min-h-full rounded-xl bg-gray-966">

                {/* Title */}
                <div className="columns-2 flex justify-start items-center mb-2 relative">

                    <div className="flex justify-center items-center">
                        {
                            tab === 4 ?
                                <div className="flex justify-start items-center mr-3 absolute left-0 z-[99]">
                                    <button
                                        onClick={() => backToPrevComponent(4)}
                                        className="flex justify-start items-center border border-black"
                                    >
                                        <Image
                                            src="/img/arrow-left-black.svg"
                                            alt="arrow-left-black"
                                            height={22}
                                            width={22}
                                            className=""
                                        />
                                        {/* <span>Back</span> */}
                                    </button>
                                </div>
                                :
                                <div className="flex justify-start items-center mr-3 h-[22px] w-[24px] absolute left-0"></div>
                        }
                        {
                            tab === 3 ?
                                <div className="flex justify-start items-center mr-3 absolute left-0 z-[99]">
                                    <button
                                        onClick={() => backToPrevComponent(3)}
                                        className="flex justify-start items-center border border-black"
                                    >
                                        <Image
                                            src="/img/arrow-left-black.svg"
                                            alt="arrow-left-black"
                                            height={22}
                                            width={22}
                                        />
                                        {/* <span>Back</span> */}
                                    </button>
                                </div>
                                :
                                <div className="flex justify-start items-center mr-3 h-[22px] w-[24px] absolute left-0"></div>
                        }

                    </div>

                    <p className="text-black text-xl font-semibold pl-10">Asset Management</p>
                </div>

                {/* Breadcrumb */}
                {nav && tab === 3 ?
                    <div className="relative bg-white rounded-lg px-3 py-1 inline-flex border border-[#E3E3E3] mb-5">
                        <ul className="flex justify-start items-center text-sm">
                            <li className="flex justify-start items-center">
                                <Link
                                    href="/dashboard/assetmanagement"
                                    className="font-semibold"
                                >
                                    {nav.flow}
                                </Link>
                            </li>

                            <li className="flex justify-start items-center">
                                <Image
                                    src="/img/chevron-right.svg"
                                    alt="chevron-right"
                                    height={28}
                                    width={28}
                                />
                                <button
                                    onClick={() => toggleTab(2)}
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
                                    onClick={() => toggleTab(2)}
                                    className="font-semibold"
                                >
                                    {
                                        nav.classObjKey ?
                                            <span>{nav.classObjKey}: {nav.classObjValue}</span>
                                            :
                                            <span>{nav.classObjValue}</span>
                                    }
                                </button>
                            </li>

                            <li className="flex justify-start items-center">
                                <Image
                                    src="/img/chevron-right.svg"
                                    alt="chevron-right"
                                    height={28}
                                    width={28}
                                />
                                <span className="text-gray-967 capitalize">
                                    Sub Class: {nav.subClass}
                                </span>
                            </li>
                        </ul>
                    </div>
                    : null
                }

                {/* Tabs */}
                <div className="flex justify-between items-center w-full">
                    <div className="flex justify-start items-center z-[1] relative top-[1px] text-sm">
                        <button
                            onClick={() => toggleTab(1)}
                            className={`rounded-tr-xl rounded-tl-xl mr-1 h-[56px] min-w-[100px] px-4 inline-flex jsutify-center items-center bg-white font-semibold ${tab === 1 || tab === 4 ? "bg-white border border-[#E1E1E1] border-b-0" : "bg-yellow-951 bg-opacity-50 hover:bg-opacity-100"}`}>
                            <Image
                                src="/img/classmanagement/class.svg"
                                alt="class"
                                height={24}
                                width={24}
                                className="mr-2"
                            />
                            <span>Class Management</span>
                        </button>
                        <button
                            onClick={() => toggleTab(2)}
                            className={`rounded-tr-xl rounded-tl-xl mr-1 h-[56px] min-w-[100px] px-4 inline-flex jsutify-center items-center bg-white font-semibold ${tab === 2 || tab === 3 ? "bg-white border border-[#E1E1E1] border-b-0" : "bg-yellow-951 bg-opacity-50 hover:bg-opacity-100"}`}>
                            <Image
                                src="/img/classmanagement/object.svg"
                                alt="class"
                                height={24}
                                width={24}
                                className="mr-2"
                            />
                            <span>Object Management</span>
                        </button>
                    </div>

                    {
                        tab === 1 &&
                        <div className="flex justify-start items-center">
                            <button
                                className="rounded-xl bg-black h-[44px] px-4 flex justify-center items-center text-white text-sm hover:bg-[#303030] duration-100 outline-none transform active:scale-75 transition-transform "
                                onClick={openAddClassModal}
                            >
                                <Image
                                    src="/img/plus.svg"
                                    alt="Add Class"
                                    className="mr-2"
                                    height={24}
                                    width={24}
                                />
                                <span>Add Class</span>
                            </button>
                            <button
                                className="rounded-xl bg-black h-[44px] px-4 flex justify-center items-center text-white text-sm hover:bg-[#303030] duration-100 outline-none transform active:scale-75 transition-transform ml-4"
                            >
                                <Image
                                    src="/img/download.svg"
                                    alt="Import Class"
                                    className="mr-2"
                                    height={24}
                                    width={24}
                                />
                                Import Classes
                            </button>
                        </div>
                    }

                    {
                        tab === 4 &&
                        <div className="flex justify-start items-center">
                            <button
                                className="rounded-xl bg-black h-[44px] px-4 flex justify-center items-center text-white text-sm hover:bg-[#303030] duration-100 outline-none transform active:scale-75 transition-transform"
                                onClick={openAddSubClassModal}
                            >
                                <Image
                                    src="/img/plus.svg"
                                    alt="Add Class"
                                    className="mr-2"
                                    height={24}
                                    width={24}
                                />
                                <span>Add Sub Class</span>
                            </button>
                        </div>
                    }

                    {tab === 3 &&
                        <div className="flex justify-start items-center">
                            <button
                                className="rounded-xl bg-black h-[44px] px-4 flex justify-center items-center text-white text-sm hover:bg-[#303030] duration-100 outline-none transform active:scale-75 transition-transform"
                                onClick={openAddObjectModal}
                            >
                                <Image
                                    src="/img/plus.svg"
                                    alt="Add Class"
                                    className="mr-2"
                                    height={24}
                                    width={24}
                                />
                                <span>Add Sub Class Object</span>
                            </button>
                        </div>
                    }


                    {tab === 2 &&
                        <div className="flex justify-start items-center">
                            <button
                                className="rounded-xl bg-black h-[44px] px-4 flex justify-center items-center text-white text-sm hover:bg-[#303030] duration-300 outline-none transform active:scale-75 transition-transform"
                                onClick={openAddClassObjectModal}
                            >
                                <Image
                                    src="/img/plus.svg"
                                    alt="Add Class"
                                    className="mr-2"
                                    height={24}
                                    width={24}
                                />
                                <span>Add Class Object</span>
                            </button>
                        </div>
                    }
                </div>

                {/* Tab Contect */}
                <div className="w-full min-h-[500px] bg-white border border-gray-957 overflow-hidden1 rounded-tr-xl rounded-br-xl rounded-bl-xl">
                    <div className=" bg-white w-full h-full rounded-tr-xl rounded-br-xl rounded-bl-xl overflow-hidden">
                        {tab === 1 &&
                            <ClassManagement
                                handleaddClassModal={handleaddClassModal}
                                addClassModal={addClassModal}
                                classData={classData && classData.length > 0 ? classData : []}
                                handelsubClass={handelsubClass}
                            />
                        }
                        {
                            tab === 4 &&
                            <SubClassManagement
                                handleaddSubClassModal={handleaddSubClassModal}
                                addSubClassModal={addSubClassModal}
                                classData={classData || []}
                                selectedParentClass={defaultClass ? defaultClass : getSelClass.selectedClass}
                            />
                        }
                        {tab === 2 &&
                            <ObjectManagement
                                handelObject={handelObject}
                                classData={classData || []}
                                defaultClass={defaultClass ? defaultClass : getSelClass.selectedClass}
                            />
                        }
                        {tab === 3 &&
                            <SubObjectManagement
                                handleSubObject={handleSubObject}
                                defaultClass={getSelClass.objDefaultClassSelector}
                                objectKey={objectKey}
                            />
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

AssetManagement.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}