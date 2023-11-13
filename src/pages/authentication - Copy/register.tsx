import React from 'react';
import styles from '../../styles/Common.module.css';
import Link from "next/link";
import Image from "next/image";
import FabricInfo from './fabricInfo';
import Head from 'next/head'
import Account from './account';

export default function Register() {
    return (
        <>
            <Head>
                <title>eOps Fabric - Register</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="column-2 flex font-Inter">
                <div className={`lg:w-[50%] lg:block md:hidden md:hidde sm:hidden ${styles.fabricInfo}`}>
                    <FabricInfo />
                </div>

                <div className={`lg:w-[50%] md:w-full sm:w-full sm:mt-0 relative ${styles.formContent}`}>
                    <div className="flex justify-start items-center h-full flex-wrap flex-col">

                        <div className="pt-5 pr-2 text-left text-gray-951 text-lg font-medium mb-5 md:w-full lg:pl-0 md:pl-5 lg:w-[490px]">
                            <Link href="/" className="flex items-center justify-start">
                                <Image
                                    src="/img/angle_left_icon.svg"
                                    alt="angle left"
                                    className="mr-2"
                                    width={10}
                                    height={10}
                                />
                                <span>Back</span>
                            </Link>
                        </div>

                        <div className="text-left w-[490px] lg:w-[490px] md:w-full sm:w-full lg:px-0 lg:py-0 md:px-5 md:py-5 sm:px-5 sm:py-5 sm:text-left">
                            <p className="font-[700] text-2xl md:text-3xl md:text-left text-black mb-2 capitalize sm:text-center sm:text-2xl">
                                Register an Individual Account!
                            </p>
                            <p className="font-normal text-lg text-gray-500">For the purpose of industry regulation, your details are required.</p>
                            <div className="mb-4 mt-5 border border-gray-100 w-full h-[1px]"></div>
                            <div className="signinform relative">
                                <Account />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
}
