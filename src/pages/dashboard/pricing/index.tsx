import React, { useState, useRef, useEffect } from "react";
import styles from '../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";

export default function Pricing() {
    const [duration, setDuration] = useState('1')

    const handleDuration = (event: any) => {
        setDuration(event.target.value)
    }
    console.log({
        duration: duration
    })

    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOps Plans and Pricing</p>
                </div>

                <div className="border border-gray-957 min-h-full rounded-xl mt-3 px-4 py-4 bg-gray-953 flex justify-center items-center">
                    <div className="w-[980px] relative flex justify-center items-center flex-wrap flex-col">

                        {/* Pricing Top Heading */}
                        <div className="w-full flex-wrap flex-col flex justify-center items-center mb-5">
                            <h2 className="text-2xl font-normal mb-1">Choose Your Plan</h2>
                            <p className="text-sm">To fix your business problems forever...</p>
                        </div>

                        {/* Pricing Duration checkboxes */}
                        <div className="w-[85%] shadow shadow-xl bg-white h-[61px] rounded rounded-xl overflow-hidden flex justify-between items-center mb-16">
                            <div className={`relative h-[61px] w-[15%] flex justify-center items-center ${duration === '1' ? 'bg-yellow-951' : 'bg-white'}`}>
                                <input type="radio" id="month1" name="duration" className="transform scale-150" value={1} onChange={handleDuration} checked={duration == '1'} />
                                <label htmlFor="month1" className="text-sm ml-3 h-full inline-flex justify-start items-center">1 Month</label>
                            </div>
                            <div className={`relative h-[61px] w-[30%] flex justify-center items-center bg-white ${duration === '12' ? 'bg-yellow-951' : 'bg-white'}`}>
                                <input type="radio" id="month12" name="duration" className="transform scale-150" value={12} onChange={handleDuration} checked={duration == '12'} />
                                <label htmlFor="month12" className="text-sm ml-3 h-full inline-flex justify-start items-center">12 Months (Save upto 30%)</label>
                            </div>
                            <div className={`relative h-[61px] w-[30%] flex justify-center items-center bg-white ${duration === '24' ? 'bg-yellow-951' : 'bg-white'}`}>
                                <input type="radio" id="month24" name="duration" className="transform scale-150" value={24} onChange={handleDuration} checked={duration == '24'} />
                                <label htmlFor="month24" className="text-sm ml-3 h-full inline-flex justify-start items-center">24 Months (Save upto 30%)</label>
                            </div>
                            <div className={`relative h-[61px] w-[30%] flex justify-center items-center bg-white ${duration === '36' ? 'bg-yellow-951' : 'bg-white'}`}>
                                <input type="radio" id="month36" name="duration" className="transform scale-150" value={36} onChange={handleDuration} checked={duration == '36'} />
                                <label htmlFor="month36" className="text-sm ml-3 h-full inline-flex justify-start items-center">36 Months (Save upto 30%)</label>
                            </div>
                        </div>

                        {/* Pricing Table */}
                        { duration === "1" &&
                        <div className="flex justify-between items-center mb-10 w-full">

                            <div className="h-[530px] w-[300px] flex flex-col items-center justify-start bg-white border border-yellow-951 rounded rounded-xl overflow-hidden">
                                <p className="bg-white text-sm text-black flex justify-center items-center p-1 uppercase w-full h-[32px]"></p>
                                <div className="p-5 flex flex-col items-center justify-center">
                                    <div className="h-[200px] w-full flex flex-col items-center justify-center">
                                        <p className="mb-3 text-sm uppercase text-center font-bold">PRO</p>
                                        <p className="mb-3 text-sm uppercase text-center font-bold">$<span className="text-4xl">99</span>/ monthly</p>
                                        <p className="mb-6 text-gray-967 text-sm w-[75%] text-center leading-6">
                                            For the new marketer on a budget who just wants basic tracking ...
                                        </p>
                                    </div>
                                    <p className="mb-6">
                                        <button className="text-sm bg-yellow-951 text-black flex items-center justify-center rounded rounded-xl h-10 px-3 w-[184px]">Buy now</button>
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
                                        <p className="mb-3 text-sm uppercase text-center font-bold">$<span className="text-4xl">189</span>/ monthly</p>
                                        <p className="mb-6 text-gray-967 text-sm w-[75%] text-center leading-6">
                                            For growing business who want the best of the best to scale fast...
                                        </p>
                                    </div>
                                    <p className="mb-6">
                                        <Link href="/dashboard/pricing/payment" className="text-sm bg-yellow-951 text-black flex items-center justify-center rounded rounded-xl h-10 px-3 w-[184px]">Buy now</Link>
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
                                        <p className="mb-3 text-sm uppercase text-center font-bold">$<span className="text-4xl">299</span>/ monthly</p>
                                        <p className="mb-6 text-gray-967 text-sm w-[75%] text-center leading-6">
                                            For power user who want more Everything in standard plus...
                                        </p>
                                    </div>
                                    <p className="mb-6">
                                        <button className="text-sm bg-yellow-951 text-black flex items-center justify-center rounded rounded-xl h-10 px-3 w-[184px]">Buy Now</button>
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

                        </div> }

                        { duration === "12" &&
                        <div className="flex justify-between items-center mb-10 w-full">

                            <div className="h-[530px] w-[300px] flex flex-col items-center justify-start bg-white border border-yellow-951 rounded rounded-xl overflow-hidden">
                                <p className="bg-white text-sm text-black flex justify-center items-center p-1 uppercase w-full h-[32px]"></p>
                                <div className="p-5 flex flex-col items-center justify-center">
                                    <div className="h-[200px] w-full flex flex-col items-center justify-center">
                                        <p className="mb-3 text-sm uppercase text-center font-bold">PRO</p>
                                        <p className="mb-3 text-sm uppercase text-center font-bold">$<span className="text-4xl">89</span>/ monthly</p>
                                        <p className="mb-6 text-gray-967 text-sm w-[75%] text-center leading-6">
                                            For the new marketer on a budget who just wants basic tracking ...
                                        </p>
                                    </div>
                                    <p className="mb-6">
                                        <button className="text-sm bg-yellow-951 text-black flex items-center justify-center rounded rounded-xl h-10 px-3 w-[184px]">Buy now</button>
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
                                        <p className="mb-3 text-sm uppercase text-center font-bold">$<span className="text-4xl">149</span>/ monthly</p>
                                        <p className="mb-6 text-gray-967 text-sm w-[75%] text-center leading-6">
                                            For growing business who want the best of the best to scale fast...
                                        </p>
                                    </div>
                                    <p className="mb-6">
                                        <Link href="/dashboard/pricing/payment" className="text-sm bg-yellow-951 text-black flex items-center justify-center rounded rounded-xl h-10 px-3 w-[184px]">Buy now</Link>
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
                                        <p className="mb-3 text-sm uppercase text-center font-bold">$<span className="text-4xl">169</span>/ monthly</p>
                                        <p className="mb-6 text-gray-967 text-sm w-[75%] text-center leading-6">
                                            For power user who want more Everything in standard plus...
                                        </p>
                                    </div>
                                    <p className="mb-6">
                                        <button className="text-sm bg-yellow-951 text-black flex items-center justify-center rounded rounded-xl h-10 px-3 w-[184px]">Buy Now</button>
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

                        </div> }

                        { duration === "24" &&
                        <div className="flex justify-between items-center mb-10 w-full">

                            <div className="h-[530px] w-[300px] flex flex-col items-center justify-start bg-white border border-yellow-951 rounded rounded-xl overflow-hidden">
                                <p className="bg-white text-sm text-black flex justify-center items-center p-1 uppercase w-full h-[32px]"></p>
                                <div className="p-5 flex flex-col items-center justify-center">
                                    <div className="h-[200px] w-full flex flex-col items-center justify-center">
                                        <p className="mb-3 text-sm uppercase text-center font-bold">PRO</p>
                                        <p className="mb-3 text-sm uppercase text-center font-bold">$<span className="text-4xl">129</span>/ monthly</p>
                                        <p className="mb-6 text-gray-967 text-sm w-[75%] text-center leading-6">
                                            For the new marketer on a budget who just wants basic tracking ...
                                        </p>
                                    </div>
                                    <p className="mb-6">
                                        <button className="text-sm bg-yellow-951 text-black flex items-center justify-center rounded rounded-xl h-10 px-3 w-[184px]">Buy now</button>
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
                                        <p className="mb-3 text-sm uppercase text-center font-bold">$<span className="text-4xl">289</span>/ monthly</p>
                                        <p className="mb-6 text-gray-967 text-sm w-[75%] text-center leading-6">
                                            For growing business who want the best of the best to scale fast...
                                        </p>
                                    </div>
                                    <p className="mb-6">
                                        <Link href="/dashboard/pricing/payment" className="text-sm bg-yellow-951 text-black flex items-center justify-center rounded rounded-xl h-10 px-3 w-[184px]">Buy now</Link>
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
                                        <p className="mb-3 text-sm uppercase text-center font-bold">$<span className="text-4xl">399</span>/ monthly</p>
                                        <p className="mb-6 text-gray-967 text-sm w-[75%] text-center leading-6">
                                            For power user who want more Everything in standard plus...
                                        </p>
                                    </div>
                                    <p className="mb-6">
                                        <button className="text-sm bg-yellow-951 text-black flex items-center justify-center rounded rounded-xl h-10 px-3 w-[184px]">Buy Now</button>
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

                        </div> }

                        { duration === "36" &&
                        <div className="flex justify-between items-center mb-10 w-full">

                            <div className="h-[530px] w-[300px] flex flex-col items-center justify-start bg-white border border-yellow-951 rounded rounded-xl overflow-hidden">
                                <p className="bg-white text-sm text-black flex justify-center items-center p-1 uppercase w-full h-[32px]"></p>
                                <div className="p-5 flex flex-col items-center justify-center">
                                    <div className="h-[200px] w-full flex flex-col items-center justify-center">
                                        <p className="mb-3 text-sm uppercase text-center font-bold">PRO</p>
                                        <p className="mb-3 text-sm uppercase text-center font-bold">$<span className="text-4xl">189</span>/ monthly</p>
                                        <p className="mb-6 text-gray-967 text-sm w-[75%] text-center leading-6">
                                            For the new marketer on a budget who just wants basic tracking ...
                                        </p>
                                    </div>
                                    <p className="mb-6">
                                        <button className="text-sm bg-yellow-951 text-black flex items-center justify-center rounded rounded-xl h-10 px-3 w-[184px]">Buy now</button>
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
                                        <p className="mb-3 text-sm uppercase text-center font-bold">$<span className="text-4xl">349</span>/ monthly</p>
                                        <p className="mb-6 text-gray-967 text-sm w-[75%] text-center leading-6">
                                            For growing business who want the best of the best to scale fast...
                                        </p>
                                    </div>
                                    <p className="mb-6">
                                        <Link href="/dashboard/pricing/payment" className="text-sm bg-yellow-951 text-black flex items-center justify-center rounded rounded-xl h-10 px-3 w-[184px]">Buy now</Link>
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
                                        <p className="mb-3 text-sm uppercase text-center font-bold">$<span className="text-4xl">2169</span>/ monthly</p>
                                        <p className="mb-6 text-gray-967 text-sm w-[75%] text-center leading-6">
                                            For power user who want more Everything in standard plus...
                                        </p>
                                    </div>
                                    <p className="mb-6">
                                        <button className="text-sm bg-yellow-951 text-black flex items-center justify-center rounded rounded-xl h-10 px-3 w-[184px]">Buy Now</button>
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

                        </div> }

                    </div>
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