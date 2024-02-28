import React from 'react';
import Image from "next/image";
import Head from 'next/head'
import Header from './header';
import { useRouter } from 'next/router';

export default function Enterprise() {  
    const router = useRouter();
    const goBackToHome = () => {
        setTimeout(() => {
            router.push('/authentication/thankyou');
        }, 10)
    }

    return (
        <>
            {/* Head Information */}
            <Head>
                <title>eOps Fabric - Login</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <div className="font-OpenSans">
                {/* Header */}
                <Header />

                {/* MAIN Content */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Bg Image Information */}
                    {/* <BgInfo /> */}

                    <div className='h-full flex justify-center items-center mt-20'>
                        <Image
                            src="/img/contact-sales-image.svg"
                            alt='contact-sales-image'
                            height={320}
                            width={320}
                            className='inline-block'
                        />
                    </div>

                    {/* Content section */}
                    <div className='w-full mt-32 flex justify-center items-start'>
                        <div className='rounded-lg w-[70%] mb-10'>

                            <div className={`mb-6`}>
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
                                    <p className='font-bold text-3xl mb-2 text-black'>Thank you for contacting us!</p>
                                    <p className='text-xl text-[#0A0A0A]'>Our dedicated sales team will reach you as early as possible.</p>
                                </div>
                            </div>

                            <div className='flex flex-wrap flex-col justify-start items-start w-full text-xl text-[#0A0A0A]'>
                                <button onClick={goBackToHome}>Go Back</button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}