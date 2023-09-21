import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";

export default function Thankyou() {

    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">

                <div className="border border-gray-957 min-h-[650px] rounded-xl mt-3 px-4 py-4 bg-gray-953 flex justify-center items-start w-full">

                    <div className="flex justify-center items-center w-[540px] flex-wrap flew-col mt-20">
                        <p className="text-sm text-black mb-6">24/7 Support 01 123 456 7890</p>
                        <div className="bg-white px-4 py-8 rounded rounded-xl">
                            <p className="mb-6 font-bold text-black text-2xl"> Thanks for your order, <span className="block">Narendra N </span> </p>
                            <p className="text-sm text-black mb-6">Here is your confirmation for order number 11223300. Review your receipt and get started using your product.</p>
                            <button className="text-black text-sm rounded rounded-lg bg-yellow-951 h-[44px] w-full flex justify-center items-center">Access my products</button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

Thankyou.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}