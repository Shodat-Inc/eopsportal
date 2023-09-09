import React, { useState, useRef, useEffect } from "react";
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";

export default function EopsInsight() {
    return (
        <div className="flex font-OpenSans">

<<<<<<< HEAD
            <div className="w-[84%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOPS Insights/Reports</p>
                </div>

                <div className="border min-h-full rounded-xl mt-3 px-4 py-4">
                    <div className="flex justify-start items-start">
=======
            <div className="w-full">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOps Insights/Reports</p>
                </div>

                <div className="mt-4 bg-white min-h-[450px] rounded rounded-xl lg:p-4 md:p-4 sm:p-4">
                    <div className="flex justify-start items-start hidden">
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-1">
                                <li className="inline-flex items-center">
                                    <Link href="/dashboard/assetmanagement"
                                        className="inline-flex items-center text-sm font-medium text-black hover:text-yellow-950">
                                        <Image
                                            src="/img/home.svg"
                                            alt="home"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                    </Link>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    {/* Content Goes Here */}
                    <div className="mt-12 flex justify-center items-center flex-wrap">
<<<<<<< HEAD
                        <Link href="/dashboard/eopsinsight/livetracking" className="rounded rounded-xl p-5 bg-yellow-951 h-[150px] w-[340px] text-black font-semibold text-xl flex items-center justify-between mr-10">
                            <span>Live <br />Tracking</span>
                            <Image
                                src="/img/LiveTracking.svg"
=======
                        <Link href="" className="rounded rounded-xl p-5 bg-yellow-951 h-[150px] w-[340px] text-black font-semibold text-xl flex items-center justify-between mr-10">
                            <span>Security & <br />Compliance</span>
                            <Image
                                src="/img/security_icon.svg"
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                                alt="Live Tracking"
                                height={60}
                                width={60}
                            />
                        </Link>
<<<<<<< HEAD
                        <Link href="" className="rounded rounded-xl p-5 bg-yellow-951 h-[150px] w-[340px] text-black font-semibold text-xl flex items-center justify-between">
                            <span>Problem <br />Management</span>
=======
                        <Link href="/dashboard/eopsinsight/ticketmanagement" className="rounded rounded-xl p-5 bg-yellow-951 h-[150px] w-[340px] text-black font-semibold text-xl flex items-center justify-between">
                            <span>Ticket <br />Management</span>
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                            <Image
                                src="/img/ProblemManagement.svg"
                                alt="Problem Management"
                                height={60}
                                width={60}
                            />
                        </Link>
                    </div>

                    <div className="mt-10 flex justify-center items-center flex-wrap">
                        <Link href="" className="rounded rounded-xl p-5 bg-yellow-951 h-[150px] w-[340px] text-black font-semibold text-xl flex items-center justify-between mr-10">
                            <span>Warranty <br />Claims</span>
                            <Image
                                src="/img/WarrantyClaims.svg"
                                alt="Warranty Claims"
                                height={60}
                                width={60}
                            />
                        </Link>
                        <Link href="/dashboard/eopsinsight/customreport" className="rounded rounded-xl p-5 bg-yellow-951 h-[150px] w-[340px] text-black font-semibold text-xl flex items-center justify-between">
                            <span>Custom <br />Reports</span>
                            <Image
                                src="/img/CustomReports.svg"
                                alt="Custom Reports"
                                height={60}
                                width={60}
                            />
                        </Link>
                    </div>

                </div>
            </div>

<<<<<<< HEAD
            <div className="w-[16%] pl-5">
=======
            <div className="w-[16%] pl-5 hidden">
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                <Template />
            </div>

        </div>
    )
}

EopsInsight.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}