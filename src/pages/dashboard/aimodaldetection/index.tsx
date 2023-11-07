import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import EopsWatch from "./eopswatch";
import EopsTrace from "./eopstrace";

export default function AiModelDetection() {
    const [tab, setTab] = useState(1);
    const toggleTab = (item: any) => {
        setTab(item)
    }
    return (
        <div className="font-OpenSans w-full">

            <div className="w-full text-[20px] font-semibold mb-5">AI Model Detection</div>
            <div className="w-full text-md font-semibold mb-2">Find your object</div>
            <div className="border border-yellow-951 min-h-[120px] bg-white rounded rounded-lg w-full p-4 flex justify-start items-center mb-6">
                <div className="flex relative">
                    <Image
                        src="/img/search-icon-gray.svg"
                        alt="search"
                        height={22}
                        width={22}
                        className="absolute top-[17px] left-3"
                    />
                    <input
                        type="text"
                        placeholder="Search by ID or Name"
                        id="searchobjects"
                        name="searchobjects"
                        className="border border-gray-[#A7A7A7] rounded-lg h-[56px] w-[310px] pl-10 pr-2 text-[#666666]"
                        autoComplete="off"
                    />
                </div>
                <div className="text-md text-[#666666] ml-5 mr-5">Or</div>
                <select
                    name="selectClass"
                    id="selectClass"
                    className="border border-gray-[#A7A7A7] rounded-lg h-[56px] w-[310px] pl-2 pr-2 text-[#000000]"
                >
                    <option value="">Select Class</option>
                    <option value="Vehicles">Vehicles</option>
                    <option value="Manufacturing Plants">Manufacturing Plants</option>
                </select>
                <div className="flex justify-start items-center ml-4">
                    <Image
                        src="/img/arrow-left-black.svg"
                        alt="arrow-left"
                        height={20}
                        width={30}
                        className="mr-3"
                    />
                    <button className="text-white bg-[#404040] border border-[#666666] rounded rounded-md flex justify-center items-center h-[30px] px-3">Reset</button>
                </div>
            </div>

            <div className="w-full text-md font-semibold mb-2">AI Models</div>
            {/* Tabs */}
            <div className="flex justify-between items-center w-full">
                <div className="flex justify-start items-center z-[1] relative top-[1px] text-sm">
                    <button
                        onClick={() => toggleTab(1)}
                        className={`rounded-tr-xl rounded-tl-xl mr-1 h-[46px] min-w-[100px] px-4 inline-flex jsutify-center items-center bg-white font-semibold ${tab === 1 ? "bg-white border border-[#E1E1E1] border-b-0" : "bg-[#474B52] bg-opacity-50 hover:bg-opacity-100"}`}>
                        <span>eOps Watch</span>
                    </button>
                    <button
                        onClick={() => toggleTab(2)}
                        className={`rounded-tr-xl rounded-tl-xl mr-1 h-[46px] min-w-[100px] px-4 inline-flex jsutify-center items-center bg-white font-semibold ${tab === 2 || tab === 3 ? "bg-white border border-[#E1E1E1] border-b-0" : "bg-[#474B52] bg-opacity-50 hover:bg-opacity-100"}`}>
                        <span>eOps Trace</span>
                    </button>
                </div>
            </div>

            {/* Tab Contect */}
            <div className="w-full min-h-[500px] bg-white border border-gray-957 overflow-hidden1 rounded-tr-xl rounded-br-xl rounded-bl-xl pb-32 bg-[#F2F2F2]" >
                    <div className="bg-white w-full h-full rounded-tr-xl rounded-br-xl rounded-bl-xl overflow-hidden">
                        {tab === 1 &&
                            <EopsWatch />
                        }
                        {tab === 2 &&
                            <EopsTrace />
                        }
                    </div>
                </div>

        </div>
    )
}

AiModelDetection.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}