import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
export default function Support(props: any) {

    return (
        <div className="relative bg-white p-5">

            <div className="flex justify-between items-start mb-5">
                <div className="text-lg font-semibold text-black w-[33%]">Support</div>
            </div>

            <div className='w-full flex justify-center items-center p-3 flex-wrap flex-col'>
                <div className='w-[85%] min-h-[200px] w-full flex justify-between items-center'>
                    <div className='flex justify-center items-center flex-wrap flex-col w-[30%]'>
                        <Image
                            src="/img/raise-a-ticket.svg"
                            alt="raise-a-ticket"
                            className="mb-4"
                            height={120}
                            width={120}
                        />
                        <p className='mb-4 text-center'>Lorem ipsum dolor sit amet consectetur. Congue egestas lectus volutpat dui.</p>
                        <button
                            className='h-[44px] rounded rounded-xl px-4 bg-yellow-951 text-black text-sm flex justify-center items-center'>
                            Raise a ticket
                        </button>
                    </div>                    
                    <div className='flex justify-center items-center flex-wrap flex-col w-[30%]'>
                        <Image
                            src="/img/chat-bubble.svg"
                            alt="chat-bubble"
                            className="mb-4"
                            height={120}
                            width={120}
                        />
                        <p className='mb-4 text-center'>Lorem ipsum dolor sit amet consectetur. Congue egestas lectus volutpat dui.</p>
                        <button
                            className='h-[44px] rounded rounded-xl px-4 bg-yellow-951 text-black text-sm flex justify-center items-center'>
                            Chat with us
                        </button>
                    </div>
                    <div className='flex justify-center items-center flex-wrap flex-col w-[30%]'>
                        <Image
                            src="/img/new-support.svg"
                            alt="new-support"
                            className="mb-4"
                            height={120}
                            width={120}
                        />
                        <p className='mb-4 text-center'>Lorem ipsum dolor sit amet consectetur. Congue egestas lectus volutpat dui.</p>
                        <button
                            className='h-[44px] rounded rounded-xl px-4 bg-yellow-951 text-black text-sm flex justify-center items-center'>
                            Request a call back
                        </button>
                    </div>

                </div>
            </div>

        </div>
    )
}