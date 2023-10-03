import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Link from 'next/dist/client/link';
export default function BillingHistory(props: any) {
    const [exportCSV, setExportCSV] = useState(false);
    const [receiptModal, setReceiptModal] = useState(false);
    const [orderNo, setOrderNo] = useState("2501870940")
    // Handel Check all
    const handleCheckAll = (event: any) => {
        setExportCSV(event.target.checked);
    }
    const receiptModalFunction = (item:any) => {
        setReceiptModal(true);
        setOrderNo(item)
    }
    return (
        <div className="relative bg-white">

            <div className='w-full flex justify-start item-start p-3 flex-wrap flex-col'>
                {exportCSV &&
                    <div className='flex justify-start items-center mb-2'>
                        <button className='rounded rounded-xl text-white inline-flex justify-center items-center h-[44px] px-2 bg-black min-w-[100px] text-sm mr-2'>
                            <Image
                                src="/img/download.svg"
                                alt='export'
                                height={22}
                                width={22}
                                className='mr-2'
                            />
                            <span>Export to CSV</span>
                        </button>
                    </div>
                }
                {/* Table */}
                <table className={`w-full ${styles.tableBilling} mb-7 px-3`}>
                    <thead>
                        <tr>
                            <th className='w-[5%] text-left'>
                                <div className={`${styles.customCheck} mt-2`}>
                                    <input
                                        onChange={handleCheckAll}
                                        type='checkbox'
                                        name="order"
                                    />
                                    <span></span>
                                </div>
                            </th>
                            <th className='w-[32%] text-left'>Order#</th>
                            <th className='w-[32%] text-left'>Billing Date</th>
                            <th className='w-[31%] text-left'>Amount</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm'>
                        <tr>
                            <td className='w-[5%] text-left'>
                                <div className={`${styles.customCheck} mt-2`}>
                                    <input
                                        type='checkbox'
                                        name="agreement"
                                    />
                                    <span></span>
                                </div>
                            </td>
                            <td className='w-[32%] text-left'>
                                <button onClick={() => receiptModalFunction("2501870940")}className='font-semibold'>2501870940</button>
                            </td>
                            <td className='w-[32%] text-left'>4/12/2023</td>
                            <td className='w-[32%] text-left'>$120.44</td>
                        </tr>
                        <tr>
                            <td className='w-[5%] text-left'>
                                <div className={`${styles.customCheck} mt-2`}>
                                    <input
                                        type='checkbox'
                                        name="agreement"
                                    />
                                    <span></span>
                                </div>
                            </td>
                            <td className='w-[32%] text-left'>
                                <button onClick={() => receiptModalFunction("2501870941")} className='font-semibold'>2501870941</button>
                            </td>
                            <td className='w-[32%] text-left'>6/12/2023</td>
                            <td className='w-[32%] text-left'>$144.44</td>
                        </tr>
                        <tr>
                            <td className='w-[5%] text-left'>
                                <div className={`${styles.customCheck} mt-2`}>
                                    <input
                                        type='checkbox'
                                        name="agreement"
                                    />
                                    <span></span>
                                </div>
                            </td>
                            <td className='w-[32%] text-left'>
                                <button onClick={() => receiptModalFunction("2501870944")}className='font-semibold'>2501870944</button>
                            </td>
                            <td className='w-[32%] text-left'>7/12/2023</td>
                            <td className='w-[32%] text-left'>$256.66</td>
                        </tr>
                        <tr>
                            <td className='w-[5%] text-left'>
                                <div className={`${styles.customCheck} mt-2`}>
                                    <input
                                        type='checkbox'
                                        name="agreement"
                                    />
                                    <span></span>
                                </div>
                            </td>
                            <td className='w-[32%] text-left'>
                                <button onClick={() => receiptModalFunction("2501870956")} className='font-semibold'>2501870956</button>
                            </td>
                            <td className='w-[32%] text-left'>22/11/2023</td>
                            <td className='w-[32%] text-left'>$344.49</td>
                        </tr>
                    </tbody>
                </table>
            </div>



            {/* ===== Delete Modal starts ===== */}
            {receiptModal ?
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative my-6 w-[680px]">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5">
                                    <div>
                                        <h3 className="text-xl font-medium">Receipt</h3>
                                        <p className='text-[14px] text-gray-951'>No {orderNo}</p>
                                    </div>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setReceiptModal(false)}
                                    >
                                        <Image
                                            src="/img/x.svg"
                                            alt="close"
                                            height={32}
                                            width={32}
                                        />
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-5 pb-8 flex-auto">
                                    <div className="flex justify-start items-start flex-wrap flex-col">
                                        <div className='flex justify-start items-starts w-full'>
                                            <div className='w-[40%]'>
                                                <p className='text-sm font-semibold uppercase'>Date</p>
                                                <p className='text-sm font-normal'>12/3/2023</p>
                                            </div>
                                            <div className='w-[40%]'>
                                                <p className='text-sm font-semibold uppercase'>Customer#:</p>
                                                <p className='text-sm font-normal '>amitpandey@shodat.com</p>
                                            </div>
                                        </div>
                                        <div className='text-3xl text-gray-952 flex justify-center items-center w-full min-h-[350px]'>
                                            <span>Invoice Details</span>
                                        </div>

                                        <button className='rounded rounded-xl bg-yellow-951 text-black h-[44px] px-4 flex justify-center items-center'>
                                        <Image
                                            src="/img/printer.svg"
                                            alt="printer"
                                            height={20}
                                            width={20}
                                            className='mr-2'
                                        />
                                            <span>Print</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
                </>
                : null}

            {/* ===== Delete Modal Ends ===== */}

        </div>
    )
}