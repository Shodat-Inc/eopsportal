import React, { useState, useRef, useEffect } from "react";
import Layout from "../../../components/Layout";
import Image from "next/image";
import MyProduct from "./myproduct";

export default function ManageProducts() {
    const [tab, setTab] = useState(1);
    // Toggle Tab function
    const toggleTab = (item: any) => {
        setTab(item)
    }

    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">Manage Products</p>
                </div>

                <div className="border border-gray-957 min-h-full rounded-xl mt-3 px-4 py-4 bg-gray-953">
                    <div className="w-full flex justify-start items-start">
                        <div className="w-[25%]">
                            {/* Tabs Buttons */}
                            <div className="border-gray-957 border-l-[1px] border-t-[1px] border-b-[1px] rounded-tl-xl rounded-bl-xl w-full h-full overflow-hidden">
                                <button
                                    onClick={() => toggleTab(1)}
                                    className={`h-[56px] px-4 text-left relative w-full border-gray-957 border-b-[1px] ${tab === 1 ? 'bg-white' : 'bg-transparent'} `}>
                                    <span>My Products</span>
                                    {tab === 1 &&
                                        <Image
                                            src="/img/angle_right_icon_black.svg"
                                            alt="angle_right_icon"
                                            height={8}
                                            width={8}
                                            className="absolute right-2 top-5"
                                        />
                                    }
                                </button>
                                <button
                                    onClick={() => toggleTab(2)}
                                    className={`h-[56px] px-4 text-left relative w-full border-gray-957 border-b-[1px] ${tab === 2 ? 'bg-white' : 'bg-transparent'} `}>
                                    <span>Billing History</span>
                                    {tab === 2 &&
                                        <Image
                                            src="/img/angle_right_icon_black.svg"
                                            alt="angle_right_icon"
                                            height={8}
                                            width={8}
                                            className="absolute right-2 top-5"
                                        />
                                    }
                                </button>
                                <button
                                    onClick={() => toggleTab(3)}
                                    className={`h-[56px] px-4 text-left relative w-full ${tab === 3 ? 'bg-white' : 'bg-transparent'} `}>
                                    <span>Cancel Subscription</span>
                                    {tab === 3 &&
                                        <Image
                                            src="/img/angle_right_icon_black.svg"
                                            alt="angle_right_icon"
                                            height={8}
                                            width={8}
                                            className="absolute right-2 top-5"
                                        />
                                    }
                                </button>
                                <button
                                    onClick={() => toggleTab(4)}
                                    className={`h-[56px] px-4 text-left relative w-full ${tab === 4 ? 'bg-white' : 'bg-transparent'} `}>
                                    <span>Support</span>
                                    {tab === 4 &&
                                        <Image
                                            src="/img/angle_right_icon_black.svg"
                                            alt="angle_right_icon"
                                            height={8}
                                            width={8}
                                            className="absolute right-2 top-5"
                                        />
                                    }
                                </button>                                
                            </div>
                        </div>

                        <div className="w-[70%] min-h-[300px] bg-white border border-gray-957 overflow-hidden rounded-tr-xl rounded-br-xl rounded-bl-xl">
                            {/* Tab Contents */}
                            <div className=" bg-white w-full h-full rounded-tr-xl rounded-br-xl rounded-bl-xl overflow-hidden">
                                {tab === 1 && <MyProduct />}
                                {/* {tab === 2 && <ManageTeams />}
                                {tab === 3 && <Notification />}
                                {tab === 4 && <ChangePassword />}
                                {tab === 4 && <ChangeEmail />} */}
                            </div>
                        </div>
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