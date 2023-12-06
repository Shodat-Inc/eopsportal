"use client";
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
import { setSelectedClass, toggleAddNewObjectModel } from "@/store/actions/classAction";

export default function AssetManagement() {
    const dispatch = useDispatch<any>();
    const [tab, setTab] = useState(1);
    const [classData, setClassData] = useState([] as any);
    const [defaultClass, setDefaultClass] = useState("");
    const [nav, setNav] = useState({} as any)
    const getSelClass = useSelector((state: any) => state.classReducer);
    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }

    // GET ALL CLASS DATA
    async function fetchData() {
        try {
            await axios({
                method: 'GET',
                // url: `http://20.232.178.134:3000/api/getAssets`,
                url: `/api/getAssets`,
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                if (response) {
                    setClassData(response.data.data)
                }
            }).catch(function (error) {
                console.log({
                    "ERROR IN AXIOS CATCH": error
                })
            })
        } catch (err) {
            console.log({
                "ERROR IN TRY CATCH": err
            })
        }
    }
    useEffect(() => {
        fetchData();
    }, [access_token])

    useEffect(() => {
        setNav(getSelClass.classBreadcrumbs)
    }, [getSelClass.classBreadcrumbs])

    useEffect(() => {
        if (classData && classData.length > 0) {
            setDefaultClass(classData[0]?.className)
            dispatch(setSelectedClass(classData[0]?.id))
        }
    }, [classData, dispatch])

    const toggleTab = (item: any) => {
        setTab(item)
    }
    const [addClassModal, setAddClassModal] = useState(false);
    const openAddClassModal = () => {
        setAddClassModal(!addClassModal);
    }

    const [addSubClassModal, setAddSubClassModal] = useState(false);
    const openAddSubClassModal = () => {
        setAddSubClassModal(!addSubClassModal)
    }

    const handleaddClassModal = (item: any) => {
        setAddClassModal(item)
    }
    const handelObject = (item: any) => {
        if (item !== "") {
            setTab(3)
        } else {
            setTab(tab)
        }
    }
    const handleSubObject = (item: any) => {
        if (item !== "") {
            setTab(2)
        } else {
            setTab(tab)
        }
    }

    const redirectToObjects = () => {
        setTab(2);
    }
    const handleaddSubClassModal = (item: any) => {
        setAddSubClassModal(item)
    }
    const handelsubClass = (item: any) => {
        if (item !== "") {
            setTab(4)
        } else {
            setTab(tab)
        }
    }

    const openAddObjectModal = () => {
        dispatch(toggleAddNewObjectModel(true));
    }

    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%] min-h-full rounded-xl bg-gray-966">

                {/* Title */}
                <div className="columns-2 flex justify-between items-center mb-7">
                    <p className="text-black text-xl font-semibold">Asset Management</p>
                </div>

                {/* Breadcrumb */}
                {nav && tab === 3 ?
                    <div className="flex relative bg-white rounded rounded-lg px-3 py-1 inline-flex border border-[#E3E3E3] mb-5">
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
                                    onClick={redirectToObjects}
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
                                    onClick={redirectToObjects}
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
                                <span className="text-gray-967 capitalize">
                                    Sub Class: {nav.subClass}
                                </span>
                            </li>
                        </ul>
                    </div>
                    : null}

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
                                className="rounded rounded-xl bg-black h-[44px] px-4 flex justify-center items-center text-white text-sm hover:bg-[#303030] transition-all duration-[400ms] transition-opacity duration-300 outline-none transform active:scale-75 transition-transform"
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
                                className="rounded rounded-xl bg-black h-[44px] px-4 flex justify-center items-center text-white text-sm hover:bg-[#303030] transition-all duration-[400ms] transition-opacity duration-300 outline-none transform active:scale-75 transition-transform ml-4"
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
                                className="rounded rounded-xl bg-black h-[44px] px-4 flex justify-center items-center text-white text-sm hover:bg-[#303030] transition-all duration-[400ms] transition-opacity duration-300 outline-none transform active:scale-75 transition-transform"
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
                                className="rounded rounded-xl bg-black h-[44px] px-4 flex justify-center items-center text-white text-sm hover:bg-[#303030] transition-all duration-[400ms] transition-opacity duration-300 outline-none transform active:scale-75 transition-transform"
                                onClick={openAddObjectModal}
                            >
                                <Image
                                    src="/img/plus.svg"
                                    alt="Add Class"
                                    className="mr-2"
                                    height={24}
                                    width={24}
                                />
                                <span>Add Object</span>
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
                                classData={classData && classData.length > 0 ? classData : []}
                            />
                        }
                        {tab === 2 &&
                            <ObjectManagement
                                handelObject={handelObject}
                                defaultClass={defaultClass}
                                defaultClassID={defaultClass}
                                classData={classData}
                            />
                        }
                        {tab === 3 &&
                            <SubObjectManagement
                                handleSubObject={handleSubObject}
                                defaultClass={getSelClass.selectedClass}
                                classData={classData}
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