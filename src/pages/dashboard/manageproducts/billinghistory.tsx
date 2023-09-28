import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Link from 'next/dist/client/link';
export default function BillingHistory(props: any) {
    const [exportCSV, setExportCSV] = useState(false);
    // Handel Check all
    const handleCheckAll = (event: any) => {
        setExportCSV(event.target.checked);
    }
    return (
        <div className="relative bg-white">

            <div className='w-full flex justify-start item-start p-3 flex-wrap flex-col'>
                { exportCSV &&
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
                                <Link href="#" className='font-semibold'>2501870940</Link>
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
                                <Link href="#" className='font-semibold'>2501870941</Link>
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
                                <Link href="#" className='font-semibold'>2501870944</Link>
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
                                <Link href="#" className='font-semibold'>2501870956</Link>
                            </td>
                            <td className='w-[32%] text-left'>22/11/2023</td>
                            <td className='w-[32%] text-left'>$344.49</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}