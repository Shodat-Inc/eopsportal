import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
export default function CancelSubscription(props: any) {
    const [deleteModal, setDeleteModal] = useState(false);
    const [revokeSubscription, setRevokeSubscription] = useState(false);
    const deleteAsset = () => {
        setDeleteModal(true);
    }
    return (
        <div className="relative bg-white p-5">

            <div className="flex justify-between items-start mb-5">
                <div className="text-lg font-semibold text-black w-[33%]">Subscription</div>
            </div>

            <div className='w-full flex justify-center item-center p-3 '>

                {
                    !revokeSubscription &&
                    <div className='w-[65%] min-h-[200px] flex flex-wrap flex-col'>

                        {/* Information */}
                        <div className='flex justify-start items-start mb-5 '>
                            <Image
                                src="/img/sad.svg"
                                alt='sad'
                                height={70}
                                width={70}
                                className='mr-3'
                            />
                            <div className='flex justify-start items-start flex-wrap flex-col'>
                                <p className='text-sm font-semibold mb-1'>We are sad to see you go...</p>
                                <p className='text-sm font-normal'>Before you cancel, please let us know the reason you are leaving. Every bit of feedback helps!</p>
                            </div>
                        </div>

                        {/* Radio Buttions */}
                        <div className='flex justify-start items-start flex-wrap flex-col pl-7'>

                            <div className="flex justify-start items-center pt-1 pb-2 w-full">
                                <div className={`${styles.customRadio} mr-2`}>
                                    <input
                                        type="radio"
                                        name="datatype"
                                        className="scale-150"
                                        value="Technical issues"
                                        id='technicalIssues'
                                    />
                                    <span></span>
                                </div>
                                <label htmlFor='technicalIssues' className="text-black font-normal text-sm relative top-[1px]">Technical issues</label>
                            </div>

                            <div className="flex justify-start items-center pt-1 pb-2 w-full">
                                <div className={`${styles.customRadio} mr-2`}>
                                    <input
                                        type="radio"
                                        name="datatype"
                                        className="scale-150"
                                        value="Too expensive"
                                        id='tooExpensive'
                                    />
                                    <span></span>
                                </div>
                                <label htmlFor='tooExpensive' className="text-black font-normal text-sm relative top-[1px]">Too expensive</label>
                            </div>

                            <div className="flex justify-start items-center pt-1 pb-2 w-full">
                                <div className={`${styles.customRadio} mr-2`}>
                                    <input
                                        type="radio"
                                        name="datatype"
                                        className="scale-150"
                                        value="Switching to another product"
                                        id='switching'
                                    />
                                    <span></span>
                                </div>
                                <label htmlFor='switching' className="text-black font-normal text-sm relative top-[1px]">Switching to another product</label>
                            </div>

                            <div className="flex justify-start items-center pt-1 pb-2 w-full">
                                <div className={`${styles.customRadio} mr-2`}>
                                    <input
                                        type="radio"
                                        name="datatype"
                                        className="scale-150"
                                        value="Shutting down the company"
                                        id='shuttinDown'
                                    />
                                    <span></span>
                                </div>
                                <label htmlFor='shuttinDown' className="text-black font-normal text-sm relative top-[1px]">Shutting down the company</label>
                            </div>

                            <div className="flex justify-start items-center pt-1 pb-2 w-full">
                                <div className={`${styles.customRadio} mr-2`}>
                                    <input
                                        type="radio"
                                        name="datatype"
                                        className="scale-150"
                                        value="Not sure how to use the data & tools"
                                        id='notSure'
                                    />
                                    <span></span>
                                </div>
                                <label htmlFor='notSure' className="text-black font-normal text-sm relative top-[1px]">Not sure how to use the data & tools</label>
                            </div>

                            <div className="flex justify-start items-center pt-1 pb-2 w-full">
                                <div className={`${styles.customRadio} mr-2`}>
                                    <input
                                        type="radio"
                                        name="datatype"
                                        className="scale-150"
                                        value="More features I need (please explain below)"
                                        id='moreFeatures'
                                    />
                                    <span></span>
                                </div>
                                <label htmlFor='moreFeatures' className="text-black font-normal text-sm relative top-[1px]">More features I need (please explain below)</label>
                            </div>

                            <div className="flex justify-start items-center pt-1 pb-4 w-full">
                                <div className={`${styles.customRadio} mr-2`}>
                                    <input
                                        type="radio"
                                        name="datatype"
                                        className="scale-150"
                                        value="Other (please explain below)"
                                        id='others'
                                    />
                                    <span></span>
                                </div>
                                <label htmlFor='others' className="text-black font-normal text-sm relative top-[1px]">Other (please explain below)</label>
                            </div>

                            <div className="flex justify-start items-center pt-1 pb-3 w-full">
                                <textarea
                                    placeholder='Message'
                                    className='min-h-[70px] rounded rounded-xl border border-[#A7A7A7] p-3 w-full text-sm'
                                >
                                </textarea>
                            </div>

                            <div className="flex justify-start items-center pt-1 pb-3 w-full">
                                <div className={`${styles.customCheck} mt-2`}>
                                    <input
                                        type='checkbox'
                                        name="agreement"
                                    />
                                    <span></span>
                                </div>
                                <label className="ml-2 text-sm text-black block relative top-[1px]">I understand that the subscription terms and conditions.</label>
                            </div>

                            <div className="flex justify-start items-center pt-1 w-full">
                                <button
                                    onClick={deleteAsset}
                                    className='h-[44px] rounded rounded-xl w-full bg-yellow-951 text-black text-sm flex justify-center items-center'>Cancel subscription</button>
                            </div>

                        </div>
                    </div>
                }

                {
                    revokeSubscription &&
                    <div className='w-[65%] min-h-[200px] flex flex-wrap flex-col'>
                        {/* Information */}
                        <div className='flex justify-start items-start mb-5'>
                            <Image
                                src="/img/smile.svg"
                                alt='smile'
                                height={70}
                                width={70}
                                className='mr-3'
                            />
                            <div className='flex justify-start items-start flex-wrap flex-col'>
                                <p className='text-sm font-semibold mb-1'>Welcome Back!</p>
                                <p className='text-sm font-normal'>Dear, Amit Pandey</p>
                            </div>
                        </div>
                        <div className='flex justify-start items-start flex-wrap flex-col mb-7'>
                            <p className='text-sm'>Currently, you don't have a subscription. Please review the available plans and choose one to continue.</p>
                        </div>
                        <div className="flex justify-start items-center w-full">
                            <a
                                href="/dashboard/pricing"
                                className='h-[44px] rounded rounded-xl px-4 bg-yellow-951 text-black text-sm flex justify-center items-center'>
                                Subscribe Now!
                            </a>
                        </div>
                    </div>
                }

            </div>


            {/* ===== Delete Modal starts ===== */}
            {deleteModal ?
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative my-6 w-[580px]">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-2">
                                    <h3 className="text-lg font-medium"></h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setDeleteModal(false)}
                                    >
                                        <Image
                                            src="/img/close.svg"
                                            alt="close"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative pt-2 pb-8 flex-auto">
                                    <div className="flex justify-start items-center flex-wrap flex-col">
                                        <p className="flex justify-center items-center text-lg">Are you sure you want to <span className='text-red-500 px-1 font-semibold'>cancel</span> your subscription?</p>
                                        <div className="mt-10 relative flex justify-center items-center w-full">
                                            <button
                                                className="border border-black rounded-lg bg-black text-white text-lg w-[70px] h-[47px] mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                                                onClick={() => { setRevokeSubscription(true); setDeleteModal(false); }}
                                            >
                                                Yes
                                            </button>
                                            <button
                                                className="border border-black rounded-lg bg-white text-black text-lg w-[70px] h-[47px] hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300"
                                                onClick={() => { setDeleteModal(false); }}
                                            >
                                                No
                                            </button>
                                        </div>
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