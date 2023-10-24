import React, { useState } from "react";
import Layout from "../../../components/Layout";
import Image from "next/dist/client/image";
import ClassManagement from "./classmanagement";
import ObjectManagement from "./objectmanagement";

export default function AssetManagement() {
    const [tab, setTab] = useState(1);
    const toggleTab = (item: any) => {
        setTab(item)
    }
    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%] min-h-full rounded-xl bg-gray-966">

                {/* Title */}
                <div className="columns-2 flex justify-between items-center mb-7">
                    <p className="text-black text-xl font-semibold">Asset Management</p>
                </div>

                {/* Tabs */}
                <div className="flex justify-start items-center z-[1] relative top-[1px] text-sm">
                    <button
                        onClick={() => toggleTab(1)}
                        className={`rounded-tr-xl rounded-tl-xl mr-1 h-[56px] min-w-[100px] px-4 inline-flex jsutify-center items-center bg-white font-semibold ${tab === 1 ? "bg-white border border-[#E1E1E1] border-b-0" : "bg-yellow-951 bg-opacity-50 hover:bg-opacity-100"}`}>
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
                        className={`rounded-tr-xl rounded-tl-xl mr-1 h-[56px] min-w-[100px] px-4 inline-flex jsutify-center items-center bg-white font-semibold ${tab === 2 ? "bg-white border border-[#E1E1E1] border-b-0" : "bg-yellow-951 bg-opacity-50 hover:bg-opacity-100"}`}>
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

                {/* Tab Contect */}
                <div className="w-full min-h-[500px] bg-white border border-gray-957 overflow-hidden1 rounded-tr-xl rounded-br-xl rounded-bl-xl">
                    <div className=" bg-white w-full h-full rounded-tr-xl rounded-br-xl rounded-bl-xl overflow-hidden">
                        {tab === 1 && <ClassManagement />}
                        {tab === 2 && <ObjectManagement />}
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