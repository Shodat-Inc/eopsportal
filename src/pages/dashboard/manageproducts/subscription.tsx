import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Link from 'next/dist/client/link';
export default function Subscription(props: any) {
    const [premiumModal, setPremiumModal] = useState(false);
    const [revokeSubscription, setRevokeSubscription] = useState(false);
    const [refundStatus, setRefundStatus] = useState(false);
    const [premiumPlans, setPremiumPlans] = useState(false)
    const cancelModal = () => {
        setPremiumModal(true);
    }
    const cancelSubscriptionFunction = () => {
        setPremiumModal(false);
        setRevokeSubscription(true);
    }
    const refundStatusFunction = () => {
        setRefundStatus(!refundStatus)
    }
    const togglePremiumPlans = () => {
        setPremiumPlans(!premiumPlans)
    }
    return (
        <div className="relative bg-white">

            <div className='w-full flex justify-start item-start p-3 flex-wrap flex-col relative'>
                {/* Table */}
                <table className={`w-full ${styles.tableBilling} mb-7 px-3`}>
                    <thead>
                        <tr>
                            <th className='w-[40%] text-left'>Description</th>
                            <th className='w-[15%] text-left'>Months</th>
                            <th className='w-[15%] text-left'>Billing Date</th>
                            <th className='w-[15%] text-left'>Amount</th>
                            <th className='w-[15%] text-left'>Actions</th>
                        </tr>
                    </thead>
                    {
                        revokeSubscription ?
                            <tbody>
                                <tr>
                                    <td colSpan={5} align='center'>
                                        <div className='py-5'>
                                            <p className='text-[#666666] mb-5'>You don't have any active subscriptions</p>
                                            <button
                                                className='h-[44px] rounded rounded-xl  bg-yellow-951 border border-yellow-951 text-black text-sm flex justify-center items-center px-8'>
                                                <span>Subscription Now</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            :
                            <tbody className='text-sm'>
                                <tr>
                                    <td className='w-[40%] text-left'>
                                        <div className='cursor-pointer' onClick={togglePremiumPlans} >
                                            <p className='uppercase font-semibold flex mb-2'>
                                                <span>Premium</span>
                                                <Image
                                                    src="/img/info-yellow.svg"
                                                    alt='info'
                                                    height={22}
                                                    width={22}
                                                    className='ml-2'
                                                />
                                            </p>
                                            <p className='text-[#666666] font-[12px]'>Order ID 2501870940</p>
                                        </div>
                                    </td>
                                    <td className='w-[15%] text-left'>12</td>
                                    <td className='w-[15%] text-left'>
                                        <div className='w-full'>
                                            <div className='font-semibold'>Expire On</div>
                                            <p className='font-normal text-sm'>30/12/2023</p>
                                        </div>
                                    </td>
                                    <td className='w-[15%] text-left'>$149.00</td>
                                    <td className='w-[15%] text-left'>
                                        <button onClick={cancelModal} className='border border-black text-black h-[44px] rounded rounded-lg px-3 flex justify-center items-center text-sm'>Cancel</button>
                                    </td>
                                </tr>
                            </tbody>
                    }
                </table>

                {/* Premium Plans */}
                {premiumPlans &&
                    <div className='h-[432px] w-[537px] border border-[#E1E1E1] rounded rounded-xl shadow shadow-lg p-5 absolute top-[131px] left-[8px] bg-white'>
                        <div className='flex justify-end items-end w-full'>
                            <button onClick={() => setPremiumPlans(false)}>
                                <Image
                                    src="/img/x.svg"
                                    alt='close'
                                    height={30}
                                    width={30}
                                />
                            </button>
                        </div>
                        <div className='h-full w-full flex justify-center items-center'>
                            <p className='uppercase text-lg font-semibold'>PREMIUM PLAN DETAILS HERE</p>
                        </div>
                    </div>
                }
                {/* Premium Plan Ends */}


                {/* Cancelled Order */}
                {revokeSubscription &&
                    <div className="flex justify-start items-start flex-wrap flex-col w-full mb-10 relative">
                        <div className='font-semibold mb-3 px-3 w-full'>Cancelled Orders</div>

                        <div className='bg-[#FBEBEB] flex justify-between items-start w-full py-4 px-6'>
                            <div className='flex justify-start items-start flex-wrap flex-col w-[60%]'>
                                <div className='font-semibold w-[85%]'>Crack Detection</div>
                                <p className='font-normal text-sm w-[85%]'>Automated crack detection: Enhancing infrastructure safety through advanced technology.</p>
                            </div>
                            <div className='flex justify-start items-center flex-wrap flex-col w-[20%]'>
                                <div className='font-semibold text-sm'>Expire On</div>
                                <p className='font-normal text-sm'>30/12/2023</p>
                            </div>
                            <div className='w-[20%] flex justify-center items-center relative'>
                                <button
                                    onClick={refundStatusFunction}
                                    className='bg-[#DE0000] text-white text-sm rounded rounded-xl flex justify-center items-center h-[44px] px-3 min-w-[100px]'>
                                    <span>Refund status</span>
                                </button>
                                {refundStatus &&
                                    <div className='h-[345px] w-[340px] rounded rounded-xl shadow shadow-xl py-7 px-5 bg-white border border-[#E1E1E1] absolute top-[-360px] right-[45px]'>
                                        <button
                                            className='absolute top-2 right-2'
                                            onClick={() => setRefundStatus(false)}>
                                            <Image
                                                src="/img/x.svg"
                                                alt="close"
                                                height={25}
                                                width={25}
                                            />
                                        </button>
                                        <div className={`${styles.progessWrap}`}>
                                            <div className={`${styles.processBox} ${styles.completed} pl-2 pt-0 pb-2 relative flex justify-start items-start`}>
                                                <span className='mr-4'>
                                                    <Image
                                                        src="/img/radio-check-green.svg"
                                                        alt="close"
                                                        height={18}
                                                        width={18}
                                                    />
                                                </span>
                                                <div className='relative'>
                                                    <p className='text-sm font-semibold mb-1'>Refund Requested</p>
                                                    <p className='text-sm'>Thu, 21st  Sep 23, 22.30 PM</p>
                                                </div>
                                            </div>
                                            <div className={`${styles.processBox} ${styles.completed} pl-2 pt-2 pb-2 relative flex justify-start items-start`}>
                                                <span className='mr-4'>
                                                    <Image
                                                        src="/img/radio-check-green.svg"
                                                        alt="close"
                                                        height={18}
                                                        width={18}
                                                    />
                                                </span>
                                                <div className='relative'>
                                                    <p className='text-sm font-semibold mb-1'>Refund Initiated</p>
                                                    <p className='text-sm'>Thu, 21st  Sep 23, 22.30 PM</p>
                                                </div>
                                            </div>
                                            <div className={`${styles.processBox} ${styles.completed} pl-2 pt-2 pb-2 relative flex justify-start items-start`}>
                                                <span className='mr-4'>
                                                    <Image
                                                        src="/img/radio-check-green.svg"
                                                        alt="close"
                                                        height={18}
                                                        width={18}
                                                    />
                                                </span>
                                                <div className='relative'>
                                                    <p className='text-sm font-semibold mb-1'>Refund Approved</p>
                                                    <p className='text-sm'>Thu, 21st  Sep 23, 22.30 PM</p>
                                                </div>
                                            </div>
                                            <div className={`${styles.processBox} pl-2 pt-2 pb-2 relative flex justify-start items-start`}>
                                                <span className='mr-4 h-[18px] w-[18px] rounded rounded-full border border-[#E1E1E1] bg-white'></span>
                                                <div className='relative'>
                                                    <p className='text-sm font-semibold mb-1'>Refund Under Processing</p>
                                                    <p className='text-sm'>Thu, 21st  Sep 23, 22.30 PM</p>
                                                </div>
                                            </div>
                                            <div className={`${styles.processBox} pl-2 pt-2 pb-0 relative flex justify-start items-start`}>
                                                <span className='mr-4 h-[18px] w-[18px] rounded rounded-full border border-[#E1E1E1] bg-white'></span>
                                                <div className='relative'>
                                                    <p className='text-sm font-semibold mb-1'>Refund Credited to Your Bank</p>
                                                    <p className='text-sm hidden'>Thu, 21st  Sep 23, 22.30 PM</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                }


                {/* ===== Premium Modal starts ===== */}
                {premiumModal ?
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative my-3 w-[580px]">
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none py-4">
                                    {/*header*/}
                                    <div className="absolute right-0 top-0 z-10">
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none relative"
                                            onClick={() => setPremiumModal(false)}
                                        >
                                            <Image
                                                src="/img/x.svg"
                                                alt="close"
                                                className="h-6"
                                                height={24}
                                                width={24}
                                            />
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative flex-auto">
                                        <div className='w-full flex justify-center item-center p-3 '>
                                            <div className='w-[80%] min-h-[200px] flex flex-wrap flex-col'>

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
                                                        <p className='text-lg font-semibold mb-1'>We are sad to see you go...</p>
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

                                                    <div className="flex justify-between items-center pt-1 w-full">
                                                        <button
                                                            onClick={() => setPremiumModal(false)}
                                                            className='h-[44px] rounded rounded-xl bg-white border border-black text-black text-sm flex justify-center items-center px-4'>
                                                            <span>Don't Cancel</span>
                                                        </button>
                                                        <button
                                                            onClick={cancelSubscriptionFunction}
                                                            className='h-[44px] rounded rounded-xl  bg-yellow-951 border border-yellow-951 text-black text-sm flex justify-center items-center px-8'>
                                                            <span>Cancel subscription</span>
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
                    </>
                    : null}
                {/* ===== Premium Modal Ends ===== */}


            </div>

        </div>
    )
}