import React, { useState, useEffect } from 'react';
import styles from '../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/link";
import Head from 'next/head'
import Header from './header';
import BgInfo from './bginfo';

export default function Help() {
    return (
        <>
            {/* Head Information */}
            <Head>
                <title>eOps Fabric - Verify Individual</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <div className="font-OpenSans">
                {/* Header */}
                <Header />

                {/* MAIN Content */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Bg Image Information */}
                    <BgInfo />

                    {/* Content section */}
                    <div className="flex justify-center items-start w-full mt-10">
                        <div className="relative w-[70%]">
                            <Link href="/" className="flex justify-start items-center font-semibold mb-5">
                                <Image
                                    src="/img/auth/arrow-left-black.svg"
                                    alt="arrow-left-black"
                                    height={24}
                                    width={24}
                                    className='mr-2'
                                />
                                <span>Back</span>
                            </Link>
                            
                            <div className='rounded rounded-lg min-h-[400px] p-6 w-full mb-10'>
                            <h2 className='text-2xl font-semibold mb-2'>Help</h2>
                                <div className='text-[#8692A6] mb-12'>Help content</div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}