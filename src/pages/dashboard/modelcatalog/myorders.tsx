import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";

export default function MyOrders() {
    const [showModal, setShowModal] = useState(false);
    const [modelTitle, setModalTitle] = useState('Crack Deduction')
    const viewModal = (item: any) => {
        setShowModal(true);
        setModalTitle(item)
    }
    const [value, setValue] = useState(20);
    const handleRange = (e: any) => {
        console.log({
            value: e.target.value
        })
        setValue(e.target.value)
    }

    return (
        <div className="flex font-OpenSans">

            <div className="w-full">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">My Orders</p>
                </div>

                <div className="border border-gray-957 bg-gray-953 min-h-[450px] rounded-xl mt-3 px-4 py-4">
                    <div className="flex justify-start items-start">
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-1">
                                <li className="inline-flex items-center">
                                    <Link href="/dashboard/modelcatalog"
                                        className="inline-flex items-center text-sm font-medium text-black hover:text-yellow-950">
                                        <Image
                                            src="/img/arrow-left.svg"
                                            alt="home"
                                            className="h-6 mr-2"
                                            height={20}
                                            width={20}
                                        />
                                        <span>Model Catalog</span>
                                    </Link>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    {/* Content Goes Here */}

                    <div className="flex items-start justify-start flex-wrap mt-4">
                        <div className="bg-white rounded rounded-xl w-full flex items-start justify-start flex-wrap flex-row">
                            <div className="w-[75%] p-3 min-h-[300px]">
                                <div className="flex mb-8">
                                    <div className="w-[55%]">
                                        <p className="text-sm font-bold">Product</p>
                                    </div>
                                    <div className="w-[45%] pl-4">
                                        <p className="text-sm font-bold">Price</p>
                                    </div>
                                </div>
                                <div className="flex mb-8">
                                    <div className="w-[55%] flex justify-start items-center">
                                        <Image
                                            src="/img/crystallizatiod-detection.png"
                                            alt="crystallizatiod-detection"
                                            height={100}
                                            width={140}
                                            className="mr-2"
                                        />
                                        <div className="pr-1">
                                            <h4 className="mb-3 font-semibold">Crystallization Detection</h4>
                                            <p className="text-sm pr-2">Crystallization detection: Harnessing data insights to optimize processes and enhance material performance.</p>
                                        </div>
                                    </div>
                                    <div className="w-[45%] pl-4 flex justify-between items-center">
                                        <div className="font-semibold text-lg">$69</div>
                                        <div className={`${styles.form__wrap}`}>
                                            <select
                                                name="thresholdMeasure"
                                                id="thresholdMeasure"
                                                className="border border-black h-[50px] relative rounded rounded-xl w-[135px] px-1"
                                                value="1 Month"
                                            >
                                                <option value="">-Select-</option>
                                                <option value="1 Month">1 Month</option>
                                                <option value="3 Month">3 Month</option>
                                                <option value="6 Month">6 Month</option>
                                                <option value="1 Year">1 Year</option>
                                                <option value="2 Year">2 Year</option>
                                                <option value="3 Year">3 Year</option>
                                            </select>
                                        </div>
                                        <button>
                                            <Image
                                                src="/img/cart-delete-btn.svg"
                                                alt="cart-delete-btn"
                                                height={40}
                                                width={40}
                                            />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex mb-8">
                                    <div className="w-[55%] flex justify-start items-center">
                                        <Image
                                            src="/img/Battery-Life-Prediction.png"
                                            alt="Battery-Life-Prediction"
                                            height={100}
                                            width={140}
                                            className="mr-2"
                                        />
                                        <div className="pr-1">
                                            <h4 className="mb-3 font-semibold">Battery Life Prediction</h4>
                                            <p className="text-sm pr-2">Battery life prediction: Empowering sustainable technologies with accurate and proactive energy management.</p>
                                        </div>
                                    </div>
                                    <div className="w-[45%] pl-4 flex justify-between items-center">
                                        <div className="font-semibold text-lg">$69</div>
                                        <div className={`${styles.form__wrap}`}>
                                            <select
                                                name="thresholdMeasure"
                                                id="thresholdMeasure"
                                                className="border border-black h-[50px] relative rounded rounded-xl w-[135px] px-1"
                                                value="1 Month"
                                            >
                                                <option value="">-Select-</option>
                                                <option value="1 Month">1 Month</option>
                                                <option value="3 Month">3 Month</option>
                                                <option value="6 Month">6 Month</option>
                                                <option value="1 Year">1 Year</option>
                                                <option value="2 Year">2 Year</option>
                                                <option value="3 Year">3 Year</option>
                                            </select>
                                        </div>
                                        <button>
                                            <Image
                                                src="/img/cart-delete-btn.svg"
                                                alt="cart-delete-btn"
                                                height={40}
                                                width={40}
                                            />
                                        </button>
                                    </div>
                                </div>

                            </div>

                            <div className="w-[25%] p-2 border-l-[1px] border-gray-951 min-h-[300px]">
                                <h2 className="text-lg font-semibold mb-6 mt-[-46px]">Order Summary</h2>
                                <div className="h-[220px]">
                                    <div className="flex justify-between item-start mb-4">
                                        <div className="uppercase text-sm">Items {3}</div>
                                        <div className="uppercase text-sm">$ 138.00</div>
                                    </div>
                                    <div className="flex justify-between item-start mb-4">
                                        <div className="uppercase text-sm">Tax</div>
                                        <div className="uppercase text-sm">$ 9.00</div>
                                    </div>
                                </div>
                                <div className="relative mb-6">
                                    <p className="uppercase mb-2">Promo code</p>
                                    <input
                                        type="text"
                                        name="promocode"
                                        className="rounded-xl border border-gray-954 w-full p-2 h-[50px]"
                                        id="promocode"
                                    />
                                </div>

                                <div className="mb-5 border-b-[1px] border-gray-[#E1E1E1]"></div>

                                <div className="flex justify-between item-start mb-8">
                                    <div className="uppercase text-sm font-bold">Toal cost</div>
                                    <div className="uppercase text-sm font-bold">$ 147.00</div>
                                </div>

                                <button
                                    className="rounded-xl border border-yellow-951 bg-yellow-951 text-black flex items-center justify-center w-full h-[44px] transition-opacity duration-300 outline-none transform active:scale-75 transition-transform"
                                >
                                    Checkout
                                </button>

                            </div>

                        </div>

                        {/* <div className="p-0 bg-white rounded rounded-xl w-full flex items-center justify-start flex-wrap flex-col">
                            <div className="flex justify-start items-center w-full">
                                <div className="w-[75%] px-5 py-2 flex justify-start items-center">
                                    <div className="flex justify-start items-center w-[55%]">
                                        <p className="mb-2 font-semibold">Product Details</p>
                                    </div>
                                    <div className="flex justify-start items-center w-[45%]">
                                        <p className="mb-2 font-semibold pl-5">Price</p>
                                    </div>
                                </div>
                                <div className="w-[25%] p-4"></div>
                            </div>

                            <div>
                                <div className="w-[75%] p-5 flex justify-start items-center">
                                    <div className="flex justify-start items-center w-[55%]">
                                        <Image
                                            src="/img/crystallizatiod-detection.png"
                                            alt="crystallizatiod-detection"
                                            height={100}
                                            width={140}
                                            className="mr-2"
                                        />
                                        <div className="pr-1">
                                            <h4 className="mb-3 font-semibold">Crystallization Detection</h4>
                                            <p className="text-sm">Crystallization detection: Harnessing data insights to optimize processes and enhance material performance.</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center w-[45%] pl-5">
                                        <div className="font-semibold text-lg">$69</div>
                                        <div className={`${styles.form__wrap}`}>
                                            <select
                                                name="thresholdMeasure"
                                                id="thresholdMeasure"
                                                className="border border-black h-[50px] relative rounded rounded-xl w-[135px] px-1"
                                                value="1 Month"
                                            >
                                                <option value="">-Select-</option>
                                                <option value="1 Month">1 Month</option>
                                                <option value="3 Month">3 Month</option>
                                                <option value="6 Month">6 Month</option>
                                                <option value="1 Year">1 Year</option>
                                                <option value="2 Year">2 Year</option>
                                                <option value="3 Year">3 Year</option>
                                            </select>
                                        </div>
                                        <button>
                                            <Image
                                                src="/img/cart-delete-btn.svg"
                                                alt="cart-delete-btn"
                                                height={40}
                                                width={40}
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div className="w-[25%] p-4"></div>
                            </div>

                        </div> */}
                    </div>

                </div>
            </div>

        </div>
    )
}

MyOrders.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}