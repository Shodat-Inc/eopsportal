import React, { useState, useRef, useEffect } from "react";
import Layout from "../../../components/Layout";
import Image from "next/image";
import MyProduct from "./myproduct";
import CancelSubscription from "./cancelsubscription";
import Support from "./support";
import BillingHistory from "./billinghistory";

export default function ManageProducts() {
    const [tab, setTab] = useState(1);
    // Toggle Tab function
    const toggleTab = (item: any) => {
        setTab(item)
    }

    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%] border border-gray-957 min-h-full rounded-xl mt-3 px-4 py-4 bg-gray-953">

                {/* Title */}
                <div className="columns-2 flex justify-between items-center mb-7">
                    <p className="text-black text-lg font-semibold">Manage Products</p>
                </div>

                {/* Tabs */}
                <div className="flex justify-start items-center z-[1] relative top-[1px]">
                    <button
                        onClick={() => toggleTab(1)}
                        className={`rounded-tr-xl rounded-tl-xl mr-1 h-[48px] min-w-[100px] px-4 inline-flex jsutify-center items-center bg-white font-semibold ${tab === 1 ? "bg-white border border-[#E1E1E1] border-b-0" : "bg-yellow-951 bg-opacity-50 hover:bg-opacity-100"}`}>
                        My Order
                    </button>
                    <button
                        onClick={() => toggleTab(2)}
                        className={`rounded-tr-xl rounded-tl-xl mr-1 h-[48px] min-w-[100px] px-4 inline-flex jsutify-center items-center bg-white font-semibold ${tab === 2 ? "bg-white border border-[#E1E1E1] border-b-0" : "bg-yellow-951 bg-opacity-50 hover:bg-opacity-100"}`}>
                        Order History
                    </button>
                    <button
                        onClick={() => toggleTab(3)}
                        className={`rounded-tr-xl rounded-tl-xl mr-1 h-[48px] min-w-[100px] px-4 inline-flex jsutify-center items-center bg-white font-semibold ${tab === 3 ? "bg-white border border-[#E1E1E1] border-b-0" : "bg-yellow-951 bg-opacity-50 hover:bg-opacity-100"}`}>
                        Subscription
                    </button>
                    <button
                        onClick={() => toggleTab(4)}
                        className={`rounded-tr-xl rounded-tl-xl mr-1 h-[48px] min-w-[100px] px-4 inline-flex jsutify-center items-center bg-white font-semibold ${tab === 4 ? "bg-white border border-[#E1E1E1] border-b-0" : "bg-yellow-951 bg-opacity-50 hover:bg-opacity-100"}`}>
                        Support
                    </button>
                </div>

                {/* Tab Contect */}
                <div className="w-full min-h-[500px] bg-white border border-gray-957 overflow-hidden rounded-tr-xl rounded-br-xl rounded-bl-xl">
                    <div className=" bg-white w-full h-full rounded-tr-xl rounded-br-xl rounded-bl-xl overflow-hidden">
                        {tab === 1 && <MyProduct />}
                        {tab === 2 && <BillingHistory />}
                        {tab === 3 && <CancelSubscription />}
                        {tab === 4 && <Support />}
                    </div>
                </div>
            </div>

        </div>
    )
}

ManageProducts.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}