import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import styles from '../../styles/Common.module.css';
import Head from 'next/head';
import axios from 'axios';
import AlertMessage from '@/common/alertMessage';
export default function SuccessSales(props: any) {






    return (
        <>
            <Head>
                <title>eOps Fabric - Contact Sales</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <div className="flex font-Inter h-full">
                <div className='w-[50%] relative pb-16'>
                    <div className='flex justify-start items-start p-3 mb-16'>
                        <Image
                            src="/img/logoNew.svg"
                            alt='logoNew'
                            height={35}
                            width={131}
                            className='inline-block'
                        />
                    </div>
                    <div className='h-full flex justify-center items-start'>
                        <Image
                            src="/img/contact-sales-image.svg"
                            alt='contact-sales-image'
                            height={525}
                            width={525}
                            className='inline-block'
                        />
                    </div>
                </div>

                <div className='w-[50%] relative p-8 pb-16'>
                    {/* Top */}
                    <div className='flex justify-between items-center mb-3'>
                        <Link href="/" className="flex items-center justify-start">
                            <Image
                                src="/img/angle_left_icon.svg"
                                alt="angle left"
                                className="mr-2"
                                width={10}
                                height={10}
                            />
                            <span className='text-gray-972 text-lg'>Back</span>
                        </Link>
                        <div className='text-lg'>
                            <span className="text-gray-500 font-normal"> Already have an account? </span>
                            <Link href="/authentication/signin">Sign In</Link>
                        </div>
                    </div>

                    {/* SUccess Block */}
                    <div className='h-full flex justify-center items-center flex-wrap flex-col px-24'>
                        <div className='flex justify-start items-start w-full'>
                            <Image
                                src="/img/success_tick_icon.svg"
                                alt="success_tick_icon"
                                height={100}
                                width={100}
                                className='mb-4'
                            />
                        </div>
                        <div className='flex flex-wrap flex-col justify-start items-start w-full'>
                            <p className='font-semibold text-3xl mb-2 text-black'>Thank you for contacting us!</p>
                            <p className='font-semibold text-sm mb-2 text-[#0A0A0A]'>Our dedicated sales team will reach you as early as possible.</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}