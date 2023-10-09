import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
export default function MyProduct(props: any) {
    const [edit, setEdit] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("+919571373757")
    // Toggle Edit & Save button
    const toggleSave = () => {
        setEdit(!edit)
    }
    // Save Form Data
    const saveDetails = () => {
        console.log("Save Details!")
    }
    return (
        <div className="relative bg-white p-5">

            <div className="flex justify-between items-start mb-5">
                <div className="text-lg font-semibold text-black w-[33%]">My Products</div>
                <div className='flex justify-start items-center'>
                    <span className='uppercase font-semibold'>Premium</span>
                    <button
                        className='bg-yellow-951 text-black text-sm rounded rounded-lg flex justify-center items-center h-[32px] w-[70px] ml-4'>
                        Upgrade
                    </button>
                </div>
            </div>

            <div className='w-full flex justify-start item-start border border-[#E1E1E1] py-3 flex-wrap flex-col'>
                <div className='flex justify-start items-start w-full px-4 border border-l-0 border-r-0 border-t-0 border-b-1 border-[#E1E1E1] pb-3'>

                    <div className='font-semibold w-[60%]'>Product Name</div>
                    <div className='font-semibold w-[20%]'>End Date</div>
                    <div className='font-semibold w-[20%]'>Status</div>
                </div>

                <div className='flex justify-start items-start w-full px-4 border border-l-0 border-r-0 border-t-0 border-b-1 border-[#E1E1E1] pb-3 py-3'>
                    <div className='font-semibold w-[60%] pr-8'>
                        <div className='font-semibold'>Crack Detection</div>
                        <p className='font-normal text-sm'>Automated crack detection: Enhancing infrastructure safety through advanced technology.</p>
                    </div>
                    <div className='font-semibold w-[20%]'>
                        <span className='font-normal text-sm'>30/12/2023</span>
                    </div>
                    <div className='font-semibold w-[20%]'>
                        <div className="flex items-center justify-start mr-5">
                            <div className={`${styles.radioWrap}`}>
                                <input
                                    type="checkbox"
                                />
                                <span className={`${styles.radioFrame}`}></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-start items-start w-full px-4 border border-l-0 border-r-0 border-t-0 border-b-0 border-[#E1E1E1] pb-3 py-3'>
                    <div className='font-semibold w-[60%] pr-8'>
                        <div className='font-semibold'>Crystallization Detection</div>
                        <p className='font-normal text-sm'>Crystallization detection: Harnessing data insights to optimize processes and enhance material performance.</p>
                    </div>
                    <div className='font-semibold w-[20%]'>
                        <span className='font-normal text-sm'>10/05/2024</span>
                    </div>
                    <div className='font-semibold w-[20%]'>
                        <div className="flex items-center justify-start mr-5">
                            <div className={`${styles.radioWrap}`}>
                                <input
                                    type="checkbox"
                                />
                                <span className={`${styles.radioFrame}`}></span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}