import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
export default function Notification(props: any) {
    return (
        <div className="relative bg-white p-5">
            <div className="flex justify-between items-start mb-8">
                <div className="text-lg font-semibold text-black w-[33%]">Notification</div>
            </div>

            <div className={`${styles.scroll} overflow-x-auto h-96 px-5`}>

                <div className='flex justify-between items-center mb-8'>
                    <div className='w-[80%]'>
                        <p className='text-sm font-semibold mb-1'>Weekly newsletter</p>
                        <p className='text-sm w-[300px]'>A small text about what the newsletters might contain about product updates </p>
                    </div>
                    <div className='w-[20%] flex items-end justify-end'>
                        <div className={`${styles.radioWrap}`}>
                            <input
                                type="checkbox"
                                checked
                            />
                            <span className={`${styles.radioFrame}`}></span>
                        </div>
                    </div>
                </div>

                <div className='flex justify-between items-center mb-8'>
                    <div className='w-[80%]'>
                        <p className='text-sm font-semibold mb-1'>Account summary</p>
                        <p className='text-sm w-[300px]'>A small text about what the newsletters might contain about product updates </p>
                    </div>
                    <div className='w-[20%] flex items-end justify-end'>
                        <div className={`${styles.radioWrap}`}>
                            <input
                                type="checkbox"
                                checked
                            />
                            <span className={`${styles.radioFrame}`}></span>
                        </div>
                    </div>
                </div>

                <div className='flex justify-between items-center mb-8'>
                    <div className='w-[80%]'>
                        <p className='text-sm font-semibold mb-1'>Model activities</p>
                        <p className='text-sm w-[300px]'>A small text about what the newsletters might contain about product updates </p>
                    </div>
                    <div className='w-[20%] flex items-end justify-end'>
                        <div className={`${styles.radioWrap}`}>
                            <input
                                type="checkbox"
                                checked
                            />
                            <span className={`${styles.radioFrame}`}></span>
                        </div>
                    </div>
                </div>

                <div className='flex justify-between items-center'>
                    <div className='w-[80%]'>
                        <p className='text-sm font-semibold mb-1'>Analytics updates</p>
                        <p className='text-sm w-[300px]'>A small text about what the newsletters might contain about product updates </p>
                    </div>
                    <div className='w-[20%] flex items-end justify-end'>
                        <div className={`${styles.radioWrap}`}>
                            <input
                                type="checkbox"
                                checked={false}
                            />
                            <span className={`${styles.radioFrame}`}></span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}