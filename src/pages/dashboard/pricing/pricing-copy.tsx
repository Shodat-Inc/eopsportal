import React, { useState, useRef, useEffect } from "react";
import styles from '../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";

export default function Pricing() {
    const [plan, setPlan] = useState(0);
    const [active, setActive] = useState(false)
    const togglePlan = (item: any) => {
        setPlan(item);
        setActive(true)
    }
    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOps Plans and Pricing</p>
                </div>

                <div className="border border-gray-957 min-h-full rounded-xl mt-3 px-4 py-4 bg-gray-953">

                    <div className="flex justify-between items-center mb-20">
                        <div className="w-[34%]"></div>
                        <div className="text-center w-[32%]">
                            <h1 className="mb-1 text-black text-2xl">Choose your plan</h1>
                            <p className="mb-3 text-black text-sm">To fix your business problem forever...</p>
                            <div className="rounded rounded-lg shadow-lg bg-white p-2 flex justify-between items-center h-12">
                                <button
                                    onClick={() => togglePlan(0)}
                                    className={`text-sm ${plan === 0 ? 'bg-black text-white' : 'bg-white text-black'} flex items-center justify-center rounded rounded-xl h-9 px-3`}>
                                    Monthly Billing
                                </button>
                                <button
                                    onClick={() => togglePlan(1)}
                                    className={`text-sm ${plan === 1 ? 'bg-black text-white' : 'bg-white text-black'} flex items-center justify-center rounded rounded-xl h-9 px-3`}>
                                    Yearly <span className={`${plan != 1 ? 'text-green-400' : 'text-white'} ml-1`}>(Save upto 30%)</span>

                                </button>
                            </div>
                        </div>
                        <div className="w-[34%] flex items-end justify-end relative top-[-15px]">
                            <div className="w-[256px] min-h-[80px] flex flex-col items-end justify-start border border-gray-957 rounded rounded-lg p-3 bg-white">
                                <p className="text-sm mb-1">Your current plan is: <strong>PREMIUM</strong></p>
                                <p className="text-sm mb-1">Expires on 29 July 2024</p>
                                <button className="text-black bg-yellow-951 px-2 py-1 rounded rounded-lg flex items-center justify-center text-sm">Upgrade my plan</button>
                            </div>
                        </div>
                    </div>
                    {
                        plan === 0 ?

                            <div className="flex justify-between items-center mb-10 w-full px-8">
                                <div className="h-[530px] w-[300px] flex flex-col items-center justify-start bg-white border border-yellow-951 rounded rounded-xl overflow-hidden">
                                    <p className="bg-white text-sm text-black flex justify-center items-center p-1 uppercase w-full h-[32px]"></p>
                                    <div className="p-5 flex flex-col items-center justify-center">
                                        <div className="h-[200px] w-full flex flex-col items-center justify-center">
                                            <p className="mb-3 text-sm uppercase text-center font-bold">PRO</p>
                                            <p className="mb-3 text-sm uppercase text-center font-bold">$<span className="text-4xl">99</span>/ month</p>
                                            <p className="mb-6 text-gray-967 text-sm w-[75%] text-center leading-6">
                                                For the new marketer on a budget who just wants basic tracking ...
                                            </p>
                                        </div>
                                        <p className="mb-6">
                                            <button className="text-sm bg-black text-white flex items-center justify-center rounded rounded-xl h-10 px-3 w-[184px]">Select</button>
                                        </p>
                                        <ul className="mb-0 text-gray-967 text-sm w-full text-right pr-10">
                                            <li className="mb-2">Up to 50 clicks/month</li>
                                            <li className="mb-2">eOps Watch Platform</li>
                                            <li className="mb-2">Real-Time Insights/Report</li>
                                            <li className="mb-2">5 Team Members</li>
                                            <li className="mb-2">1 Asset Tracking Project</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="h-[530px] w-[300px] flex flex-col items-center justify-center bg-white border border-yellow-951 rounded rounded-xl overflow-hidden">
                                    <p className="bg-yellow-951 text-sm text-black flex justify-center items-center p-1 uppercase w-full h-[32px]">Our most popular plan</p>
                                    <div className="p-5 flex flex-col items-center justify-center">
                                        <div className="h-[200px] w-full flex flex-col items-center justify-center">
                                            <p className="mb-3 text-sm uppercase text-center font-bold">PREMIUM</p>
                                            <p className="mb-3 text-sm uppercase text-center font-bold">$<span className="text-4xl">199</span>/ month</p>
                                            <p className="mb-6 text-gray-967 text-sm w-[75%] text-center leading-6">
                                                For growing business who want the best of the best to scale fast...
                                            </p>
                                        </div>
                                        <p className="mb-6">
                                            <Link href="/dashboard/pricing/payment" className="text-sm bg-black text-white flex items-center justify-center rounded rounded-xl h-10 px-3 w-[184px]">Select</Link>
                                        </p>
                                        <ul className="mb-0 text-gray-967 text-sm w-full text-right pr-10">
                                            <li className="mb-2">Up to 1000 clicks/month</li>
                                            <li className="mb-2">eOps Watch Platform</li>
                                            <li className="mb-2">eOps Trace Platform</li>
                                            <li className="mb-2">eOps Prosense Platform</li>
                                            <li className="mb-2">Real-Time Insights/Report</li>
                                            <li className="mb-2">15 Team Members</li>
                                            <li className="mb-2">5 Asset Tracking Project</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="h-[530px] w-[300px] flex flex-col items-center justify-center bg-white border border-yellow-951 rounded rounded-xl overflow-hidden">
                                    <p className="bg-white text-sm text-black flex justify-center items-center p-1 uppercase w-full h-[32px]"></p>
                                    <div className="p-5 flex flex-col items-center justify-center">
                                        <div className="h-[200px] w-full flex flex-col items-center justify-center">
                                            <p className="mb-3 text-sm uppercase text-center font-bold">ENTERPRISE</p>
                                            <p className="mb-3 text-sm uppercase text-center font-bold">$<span className="text-4xl">369</span>/ month</p>
                                            <p className="mb-6 text-gray-967 text-sm w-[75%] text-center leading-6">
                                                For power user who want more Everything in standard plus...
                                            </p>
                                        </div>
                                        <p className="mb-6">
                                            <button className="text-sm bg-black text-white flex items-center justify-center rounded rounded-xl h-10 px-3 w-[184px]">Select</button>
                                        </p>
                                        <ul className="mb-0 text-gray-967 text-sm w-full text-right pr-10">
                                            <li className="mb-2">Up to 1 million clicks/month</li>
                                            <li className="mb-2">eOps Watch Platform</li>
                                            <li className="mb-2">eOps Trace Platform</li>
                                            <li className="mb-2">eOps Prosense Platform</li>
                                            <li className="mb-2">Real-Time Insights/Report</li>
                                            <li className="mb-2">Unlimited Team Members</li>
                                            <li className="mb-2">Unlimited Asset Tracking Project</li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                            :
                            <div className="flex justify-between items-center mb-10 w-full px-8">
                                <div className="h-[550px] w-[300px] flex flex-col items-center justify-start bg-white border border-yellow-951 rounded rounded-xl overflow-hidden">
                                    <p className="bg-white text-sm text-black flex justify-start items-center p-1 uppercase w-full h-[32px]"></p>
                                    <div className="p-5 flex flex-col items-center justify-center">
                                        <div className="h-[200px] w-full flex flex-col items-center justify-center">

                                            <p className="mb-3 text-sm uppercase text-center font-bold">PRO</p>
                                            <p className="mb-3 text-sm uppercase text-center font-bold">$<span className="text-4xl">599</span>/ yearly</p>
                                            <p className="mb-6 text-gray-967 text-sm w-[75%] text-center leading-6">
                                                For the new marketer on a budget who just wants basic tracking ...
                                            </p>
                                        </div>
                                        <p className="mb-6">
                                            <button className="text-sm bg-black text-white flex items-center justify-center rounded rounded-xl h-10 px-3 w-[184px]">Select</button>
                                        </p>
                                        <ul className="mb-0 text-gray-967 text-sm w-full text-right pr-10">
                                            <li className="mb-2">Up to 50 clicks/month</li>
                                            <li className="mb-2">eOps Watch Platform</li>
                                            <li className="mb-2">Real-Time Insights/Report</li>
                                            <li className="mb-2">5 Team Members</li>
                                            <li className="mb-2">1 Asset Tracking Project</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="h-[550px] w-[300px] flex flex-col items-center justify-start bg-white border border-yellow-951 rounded rounded-xl overflow-hidden">
                                    <p className="bg-yellow-951 text-sm text-black flex justify-center items-center p-1 uppercase w-full">Our most popular plan</p>
                                    <div className="p-5 flex flex-col items-center justify-center">
                                        <div className="h-[200px] w-full flex flex-col items-center justify-center">
                                            <p className="mb-3 text-sm uppercase text-center font-bold">PREMIUM</p>
                                            <p className="mb-3 text-sm uppercase text-center font-bold">$<span className="text-4xl">899</span>/ yearly</p>
                                            <p className="mb-6 text-gray-967 text-sm w-[75%] text-center leading-6">
                                                For growing business who want the best of the best to scale fast...
                                            </p>
                                        </div>
                                        <p className="mb-6">
                                            <button className="text-sm bg-black text-white flex items-center justify-center rounded rounded-xl h-10 px-3 w-[184px]">Select</button>
                                        </p>
                                        <ul className="mb-0 text-gray-967 text-sm w-full text-right pr-10">
                                            <li className="mb-2">Up to 1000 clicks/month</li>
                                            <li className="mb-2">eOps Watch Platform</li>
                                            <li className="mb-2">eOps Trace Platform</li>
                                            <li className="mb-2">eOps Prosense Platform</li>
                                            <li className="mb-2">Real-Time Insights/Report</li>
                                            <li className="mb-2">15 Team Members</li>
                                            <li className="mb-2">5 Asset Tracking Project</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="h-[550px] w-[300px] p-5 flex flex-col items-center justify-start bg-white border border-gray-957 rounded rounded-xl">
                                    <p className="bg-white text-sm text-black flex justify-center items-center p-1 uppercase w-full h-[32px]"></p>
                                    <div className="p-5 flex flex-col items-center justify-center">
                                        <div className="h-[200px] w-full flex flex-col items-center justify-center">
                                            <p className="mb-3 text-sm uppercase text-center font-bold">ENTERPRISE</p>
                                            <p className="mb-3 text-sm uppercase text-center font-bold">$<span className="text-4xl">3199</span>/ yearly</p>
                                            <p className="mb-6 text-gray-967 text-sm w-[75%] text-center leading-6">
                                                For power user who want more Everything in standard plus...
                                            </p>
                                        </div>
                                        <p className="mb-6">
                                            <button className="text-sm bg-black text-white flex items-center justify-center rounded rounded-xl h-10 px-3 w-[184px]">Select</button>
                                        </p>
                                        <ul className="mb-0 text-gray-967 text-sm w-full text-right pr-2">
                                            <li className="mb-2">Up to 1 million clicks/month</li>
                                            <li className="mb-2">eOps Watch Platform</li>
                                            <li className="mb-2">eOps Trace Platform</li>
                                            <li className="mb-2">eOps Prosense Platform</li>
                                            <li className="mb-2">Real-Time Insights/Report</li>
                                            <li className="mb-2">Unlimited Team Members</li>
                                            <li className="mb-2">Unlimited Asset Tracking Project</li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                    }

                </div>

            </div>

        </div>
    )
}

Pricing.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}