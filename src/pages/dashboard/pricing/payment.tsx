import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";

const premiumJson = [
    {
        "premiumID": "1",
        "price": "149",
        "premiumList": [
            "Up to 50 clicks/month",
            "eOps Watch Platform",
            "Real-Time Insights/Report",
            "5 Team Members",
            "1 Asset Tracking Project"
        ]
    },
    {
        "premiumID": "12",
        "price": "249",
        "premiumList": [
            "Up to 50 clicks/month",
            "eOps Watch Platform",
            "Real-Time Insights/Report",
            "5 Team Members",
            "1 Asset Tracking Project"
        ]
    },
    {
        "premiumID": "24",
        "price": "349",
        "premiumList": [
            "Up to 50 clicks/month",
            "eOps Watch Platform",
            "Real-Time Insights/Report",
            "5 Team Members",
            "1 Asset Tracking Project"
        ]
    },
    {
        "premiumID": "36",
        "price": "449",
        "premiumList": [
            "Up to 50 clicks/month",
            "eOps Watch Platform",
            "Real-Time Insights/Report",
            "5 Team Members",
            "1 Asset Tracking Project"
        ]
    }
]
const durationList = [
    "1",
    "12",
    "24",
    "36"
]

export default function Payment(props: any) {
    const [premium, setPremium] = useState(true);
    const [billing, setBilling] = useState(true);
    const [duration, setDuration] = useState("1");
    const [data, setData] = useState([] as any);
    const [premiumList, setPremiumList] = useState([] as any);
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState("29.59");
    const [edit, setEdit] = useState(false);
    useEffect(() => {
        setData(premiumJson[0]);
        let totl = parseFloat(premiumJson[0].price) + parseFloat(tax);
        setTotal(totl)

    }, [])
    const togglePremium = () => {
        setPremium(!premium)
    }
    const toggleBilling = () => {
        setBilling(!billing)
    }
    const handlePremiumDuration = (event: any) => {
        setDuration(event.target.value)
    }
    useEffect(() => {
        const filtered = premiumJson.filter((item: any) => {
            return item.premiumID === duration
        })
        if (filtered && filtered.length > 0) {
            setData(filtered);
            setPremiumList(filtered[0].premiumList);
            let totl = parseFloat(filtered[0].price) + parseFloat(tax);
            setTotal(totl)
        }

    }, [duration])
    const toggleEdit = () => {
        setEdit(!edit);
    }
    const handleClose = () => {
        setEdit(false)
    }

    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">

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

                <div className="border border-gray-957 min-h-full rounded-xl mt-3 px-4 py-4 bg-gray-953">

                    {/* Content */}
                    <div className="flex justify-between items-start w-full ">
                        <div className="w-[60%]">
                            <div className="bg-white rounded rounded-xl p-4 mb-6">
                                <div className="flex w-full justify-between items-center mb-5">
                                    <h3 className="text-sm font-semibold">Product details</h3>
                                    <button onClick={togglePremium}>
                                        <Image
                                            src="/img/arrow-down-black.svg"
                                            alt="Arrow Down"
                                            height={24}
                                            width={24}
                                            className={`rotate-180 ${premium && '!rotate-0'}`}
                                        />
                                    </button>
                                </div>
                                <div className="flex justify-between items-start w-full">
                                    <div className="w-[50%]">
                                        <h2 className="uppercase font-semibold mb-2">Premium</h2>
                                        {
                                            premium &&
                                            <ul className={`text-gray-967 text-[14px] list-disc space-y-1 ml-6 transition-all`}>
                                                {
                                                    data && data.length > 0 ?
                                                        premiumList.map((item: any, index: any) => (
                                                            <li key={index}>{item}</li>
                                                        ))
                                                        : null
                                                }
                                            </ul>

                                        }
                                    </div>
                                    <div className="w-[50%]">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex justify-between items-start flex-wrap flex-col">
                                                <span className="text-sm font-bold mb-2">Price</span>
                                                <span className="text-sm font-bold"><span>$</span>{data && data.length > 0 ? data[0].price : null}/monthly</span>
                                            </div>
                                            <select
                                                name="premiumDuration"
                                                id="premiumDuration"
                                                className="border border-[#A7A7A7] rounded rounded-xl h-[46px] w-[146px] text-sm px-2"
                                                value={duration}
                                                onChange={(e: any) => handlePremiumDuration(e)}
                                            >
                                                <option value="">-Select-</option>
                                                {
                                                    durationList && durationList.length > 0 ?
                                                        durationList.map((item: any, index: any) => (
                                                            <option
                                                                key={index}
                                                                value={item}
                                                                selected={duration === item}
                                                            >
                                                                {item}
                                                            </option>
                                                        ))
                                                        : null
                                                }
                                            </select>
                                        </div>
                                        {
                                            premium &&
                                            <div className="bg-[#E0FEDC] h-[40px] rounded rounded-xl flex justify-center items-center text-[#138A00] text-sm font-semibold transition-all">
                                                (Save up to  30%)
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded rounded-xl p-4">
                                <div className="flex w-full justify-between items-center mb-5">
                                    <h3 className="text-sm font-semibold">Billing information</h3>
                                    <button onClick={toggleBilling}>
                                        <Image
                                            src="/img/arrow-down-black.svg"
                                            alt="Arrow Down"
                                            height={24}
                                            width={24}
                                            className={`rotate-180 ${billing && '!rotate-0'}`}
                                        />
                                    </button>
                                </div>
                                {
                                    billing &&
                                    <div className="flex w-full justify-start items-start flex-wrap flex-col">
                                        {!edit &&
                                            <div className="flex w-full justify-between items-center">
                                                <div className="text-sm">
                                                    <p className="font-semibold mb-1">Narendra N</p>
                                                    <p>440 N, Wolfe Rd, Unit Ms234, Sunnyvale, CA 94085</p>
                                                </div>
                                                <button onClick={toggleEdit} className="bg-yellow-951 text-black text-sm px-2 py-1 rounded rounded-lg flex justify-center items-center">Edit</button>
                                            </div>
                                        }

                                        {edit &&
                                            <div className="mt-1 relative flex w-full justify-start items-start flex-wrap flex-col">

                                                <div>
                                                    <p className="text-[13px] mb-5">We collect this information to register your products, verify your identity, and calculate applicable taxes and fees.</p>
                                                    <p className="text-[13px]">All fields required unless otherwise stated.</p>
                                                </div>

                                                <div className="flex justify-between items-start mb-3 w-full">
                                                    <div className="w-[48%]">
                                                        <div className={`lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                                <input
                                                                    type="text"
                                                                    id="firstName"
                                                                    name="firstName"
                                                                    className={`${styles.form__field} border border-[#A7A7A7]`}
                                                                    placeholder="First Name"

                                                                />
                                                                <label htmlFor="description" className={`${styles.form__label} !text-[#A7A7A7]`}>First Name</label>
                                                            </div>
                                                            <span className='text-red-952 text-sm flex items-center justify-start'></span>
                                                        </div>
                                                    </div>
                                                    <div className="w-[48%]">
                                                        <div className={`lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                                <input
                                                                    type="text"
                                                                    id="lastName"
                                                                    name="lastName"
                                                                    className={`${styles.form__field} border border-[#A7A7A7]`}
                                                                    placeholder="Last Name"

                                                                />
                                                                <label htmlFor="description" className={`${styles.form__label} !text-[#A7A7A7]`}>Last Name</label>
                                                            </div>
                                                            <span className='text-red-952 text-sm flex items-center justify-start'></span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-start mb-3 w-full">
                                                    <div className="w-[48%]">
                                                        <div className={`lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                                <input
                                                                    type="text"
                                                                    id="email"
                                                                    name="email"
                                                                    className={`${styles.form__field} border border-[#A7A7A7]`}
                                                                    placeholder="Email"

                                                                />
                                                                <label htmlFor="description" className={`${styles.form__label} !text-[#A7A7A7]`}>Email</label>
                                                            </div>
                                                            <span className='text-red-952 text-sm flex items-center justify-start'></span>
                                                        </div>
                                                    </div>
                                                    <div className="w-[48%]">
                                                        <div className={`lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                                <input
                                                                    type="text"
                                                                    id="phoneNumner"
                                                                    name="phoneNumner"
                                                                    className={`${styles.form__field} border border-[#A7A7A7]`}
                                                                    placeholder="Phone Number"

                                                                />
                                                                <label htmlFor="description" className={`${styles.form__label} !text-[#A7A7A7]`}>Phone Number</label>
                                                            </div>
                                                            <span className='text-[#A7A7A7] text-[11px] flex items-center justify-start'>Used to register products and to validate your identity</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-start mb-3 w-full">
                                                    <div className={`lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                            <input
                                                                type="text"
                                                                id="houseNo"
                                                                name="houseNo"
                                                                className={`${styles.form__field} border border-[#A7A7A7]`}
                                                                placeholder="House no/Building"

                                                            />
                                                            <label htmlFor="description" className={`${styles.form__label} !text-[#A7A7A7]`}>House no/Building</label>
                                                        </div>
                                                        <span className='text-red-952 text-sm flex items-center justify-start'></span>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-start mb-3 w-full">
                                                    <div className="w-[48%]">
                                                        <div className={`lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                                <input
                                                                    type="text"
                                                                    id="street"
                                                                    name="street"
                                                                    className={`${styles.form__field} border border-[#A7A7A7]`}
                                                                    placeholder="Street/Landmark"

                                                                />
                                                                <label htmlFor="description" className={`${styles.form__label} !text-[#A7A7A7]`}>Street/Landmark</label>
                                                            </div>
                                                            <span className='text-red-952 text-sm flex items-center justify-start'></span>
                                                        </div>
                                                    </div>
                                                    <div className="w-[48%]">
                                                        <div className={`lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                                <input
                                                                    type="text"
                                                                    id="city"
                                                                    name="city"
                                                                    className={`${styles.form__field} border border-[#A7A7A7]`}
                                                                    placeholder="City"

                                                                />
                                                                <label htmlFor="description" className={`${styles.form__label} !text-[#A7A7A7]`}>City</label>
                                                            </div>
                                                            <span className='text-red-952 text-sm flex items-center justify-start'></span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-start mb-3 w-full">
                                                    <div className="w-[48%]">
                                                        <div className={`lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                                <input
                                                                    type="text"
                                                                    id="state"
                                                                    name="state"
                                                                    className={`${styles.form__field} border border-[#A7A7A7]`}
                                                                    placeholder="State"

                                                                />
                                                                <label htmlFor="description" className={`${styles.form__label} !text-[#A7A7A7]`}>State</label>
                                                            </div>
                                                            <span className='text-red-952 text-sm flex items-center justify-start'></span>
                                                        </div>
                                                    </div>
                                                    <div className="w-[48%]">
                                                        <div className={`lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                                <input
                                                                    type="text"
                                                                    id="pin"
                                                                    name="pin"
                                                                    className={`${styles.form__field} border border-[#A7A7A7]`}
                                                                    placeholder="PIN"

                                                                />
                                                                <label htmlFor="description" className={`${styles.form__label} !text-[#A7A7A7]`}>PIN</label>
                                                            </div>
                                                            <span className='text-red-952 text-sm flex items-center justify-start'></span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-start mb-3 w-full">
                                                    <div className={`lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                            <input
                                                                type="text"
                                                                id="companyName"
                                                                name="companyName"
                                                                className={`${styles.form__field} border border-[#A7A7A7]`}
                                                                placeholder="Company name (Optional)"

                                                            />
                                                            <label htmlFor="description" className={`${styles.form__label} !text-[#A7A7A7]`}>Company name (Optional)</label>
                                                        </div>
                                                        <span className='text-red-952 text-sm flex items-center justify-start'></span>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-start mb-3 w-full">
                                                    <div className={`lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                            <input
                                                                type="text"
                                                                id="taxID"
                                                                name="taxID"
                                                                className={`${styles.form__field} border border-[#A7A7A7]`}
                                                                placeholder="TAX ID"

                                                            />
                                                            <label htmlFor="description" className={`${styles.form__label} !text-[#A7A7A7]`}>TAX ID</label>
                                                        </div>
                                                        <span className='text-[#A7A7A7] text-[11px] flex items-center justify-start'>For currect tax calculation</span>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-start w-full">
                                                    <div className="w-[48%]">
                                                        <button className="rounded rounded-xl bg-yellow-951 border border-yellow-951 text-black text-sm h-[44px] w-full flex justify-center items-center">Save</button>
                                                    </div>
                                                    <div className="w-[48%]">
                                                        <button onClick={handleClose} className="rounded rounded-xl bg-white border border-black text-black text-sm h-[44px] w-full flex justify-center items-center">Cancel</button>
                                                    </div>
                                                </div>

                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="w-[37%]">
                            <div className="bg-white rounded rounded-xl p-4 min-h-[200px] mb-6">
                                <h3 className="font-bold text-sm pb-4 border  border-t-0 border-l-0 border-r-0 border-b-1 border-[#C4C1C1] mb-3">Order Summary</h3>
                                <div className="flex justify-between items-center mb-3">
                                    <div className="font-semibold text-sm">Subtotal (USD)</div>
                                    <div className="font-semibold text-sm"><span>$</span>{data && data.length > 0 ? data[0].price : null}</div>
                                </div>
                                <div className="flex justify-between items-center mb-3">
                                    <div className="text-sm">GST/TAX and Fees</div>
                                    <div className="text-sm"><span>$</span>{tax}</div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="font-semibold text-sm">Total</div>
                                    <div className="font-semibold text-sm"><span>$</span>{total}</div>
                                </div>
                                <div className={`mt-5 lg:full small:w-full small:w-full ${styles.form__wrap}`}>
                                    <div className={`relative ${styles.form__group} font-OpenSans`}>
                                        <input
                                            type="text"
                                            id="promoCode"
                                            name="promoCode"
                                            className={`${styles.form__field} border border-[#A7A7A7] !text-sm`}
                                            placeholder="Enter promo code"
                                        />
                                        <label htmlFor="promoCode" className={`${styles.form__label} !text-sm`}>Enter promo code</label>
                                    </div>
                                    <span className='text-red-952 text-sm flex items-center justify-start'></span>
                                </div>
                                <div className="mt-7">
                                    <button className="w-full bg-yellow-951 text-black rounded rounded-xl flex justify-center items-center text-sm h-[44px]">Pay</button>
                                </div>
                            </div>

                            <div className="bg-white rounded rounded-xl p-4 flex justify-center items-center flex-wrap flex-col">
                                <p className="text-sm font-semibold mb-2">We guarantee your satisfaction.</p>
                                <p className="text-sm text-center">our Shodat Guides are always on standby to help you resolve any issues, 24/7/365.</p>
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