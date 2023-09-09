import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";

export default function Payment() {
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

                    {/* Breadcrumb */}
                    <div className="flex justify-start items-start">
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-1">
                                <li className="inline-flex items-center">
                                    <Link href="/dashboard/pricing"
                                        className="inline-flex items-center text-sm font-medium text-black hover:text-yellow-950">
                                        <Image
                                            src="/img/arrow-left.svg"
                                            alt="home"
                                            className="h-6 mr-2"
                                            height={20}
                                            width={20}
                                        />
                                        <span>Back</span>
                                    </Link>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    {/* Content */}

                    <div className="mt-10 relative flex justify-start items-start">
                        <div className="w-[50%] px-10">
                            <h1 className="text-2xl mb-5">Complete Payment</h1>
                            <ul className="list-disc pl-4">
                                <li className="text-sm text-gray-967 mb-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores autem beatae eum id deleniti neque libero iusto. Lorem ipsum dolor sit amet consectetur, adipisicing elit.</li>
                                <li className="text-sm text-gray-967 mb-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores autem beatae eum id deleniti neque libero iusto. Lorem ipsum dolor sit amet consectetur, adipisicing elit.</li>
                                <li className="text-sm text-gray-967 mb-0">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores autem beatae eum id deleniti neque libero iusto. Lorem ipsum dolor sit amet consectetur, adipisicing elit.</li>
                            </ul>
                        </div>
                        <div className="w-[50%] px-10">
                            <div className="w-[418px] flex flex-col items-center justify-start border border-gray-957 rounded rounded-xl overflow-hidden">
                                <div className="h-[64px] px-5 w-full flex justify-between items-center">
                                    <span className="text-sm text-black">Your plan</span>
                                    <span className="text-sm font-semibold uppercase flex items-center justify-center">
                                        PREMIUM
                                        <Image
                                            src="/img/yellow-check-circular.svg"
                                            alt="yellow-check-circular"
                                            height={24}
                                            width={24}
                                            className="ml-2"
                                        />
                                    </span>
                                </div>
                                <div className="bg-white px-5 py-4 w-full">
                                    <div className={`mb-5 ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type="text"
                                                id="cardnumber"
                                                name="cardnumber"
                                                className={`${styles.form__field} border border-black `}
                                                placeholder="Card Number"
                                                value="1234 1234 1234 1234"
                                            />
                                            <label htmlFor="cardnumber" className={`${styles.form__label}`}>Card Number</label>
                                        </div>
                                    </div>

                                    <div className="flex justify-start items-center">
                                        <div className={`mb-5 ${styles.form__wrap} w-[40%]`}>
                                            <div className={`relative w-full ${styles.form__group} font-OpenSans`}>
                                                <input
                                                    type="text"
                                                    id="cardnumber"
                                                    name="cardnumber"
                                                    className={`${styles.form__field} border border-black `}
                                                    placeholder="Expiration date"
                                                    value="MM/YY"
                                                />
                                                <label htmlFor="cardnumber" className={`${styles.form__label}`}>Expiration date</label>
                                            </div>
                                        </div>
                                        <div className={`mb-5 ${styles.form__wrap} w-[40%] ml-2`}>
                                            <div className={`relative w-full ${styles.form__group} font-OpenSans`}>
                                                <input
                                                    type="text"
                                                    id="cardnumber"
                                                    name="cardnumber"
                                                    className={`${styles.form__field} border border-black `}
                                                    placeholder="Security code"
                                                    value="CVV"
                                                />
                                                <label htmlFor="cardnumber" className={`${styles.form__label}`}>Security code</label>
                                            </div>
                                        </div>
                                        <div className={`mb-5 ${styles.form__wrap} w-[20%] ml-2`}>
                                            <Image
                                                src="/img/atmcard.png"
                                                alt="atmcard"
                                                height={46}
                                                width={65}
                                                className="ml-1 relative top-2"
                                            />
                                        </div>

                                    </div>

                                    <div className="flex justify-start items-center mb-6">
                                        <button className="font-semibold w-full bg-yellow-951 flex justify-center items-center text-sm text-black rounded rounded-xl h-[44px] hover:bg-black hover:text-white transition-opacity duration-300 outline-none transform active:scale-75 transition-transform">Pay</button>
                                    </div>

                                    <div className="flex justify-start items-center w-full">
                                        <span className="text-sm text-black text-center w-full">Secure by <strong>Stipe</strong></span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </div>

        </div>
    )
}

Payment.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}