import React, { useState, useEffect, useRef } from 'react';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
export default function MyProduct(props: any) {
    const [toggleDrop, setToggleDrop] = useState(false);
    const [selectedOption, setSelectedOption] = useState(1);
    const [agreement, setAgreement] = useState(false);
    const toggleDropFunction = (item: any) => {
        setToggleDrop(!toggleDrop);
        setSelectedOption(item)
    }

    // Hook that alerts clicks outside of the passed ref
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setToggleDrop(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    // Handel Check all
    const handleCheckAll = (event: any) => {
        setAgreement(event.target.checked);
    }

    return (
        <div className="relative bg-white pt-5 w-full flex justify-start items-start flex-wrap flex-col px-3">
            {agreement ?
                <div className='flex justify-center items-center mb-2'>
                    <button className='rounded rounded-xl text-white inline-flex justify-center items-center h-[44px] px-2 bg-black min-w-[100px] text-sm mr-2'>Renew Now</button>
                    <button className='rounded rounded-xl text-white inline-flex justify-center items-center h-[44px] px-2 bg-black min-w-[100px] text-sm mr-2'>Auto Renew Off</button>
                    <button className='rounded rounded-xl text-white inline-flex justify-center items-center h-[44px] px-2 bg-black min-w-[100px] text-sm mr-2'>Cancel Order</button>
                </div> : null}
            <table className={`w-full ${styles.tablePro}`}>
                <thead>
                    <tr>
                        <th className='w-[5%]'>
                            <div className={`${styles.customCheck} mt-2`}>
                                <input
                                    onChange={handleCheckAll}
                                    type='checkbox'
                                    name="agreement"
                                />
                                <span></span>
                            </div>
                        </th>
                        <th className='w-[60%] text-left'>Description</th>
                        <th className='w-[15%] text-left'>Billing Date</th>
                        <th className='w-[10%] text-left'>Auto Renew</th>
                        <th className='w-[10%] text-left'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='w-[5%] text-center'>
                            <div className={`${styles.customCheck} mt-2`}>
                                <input
                                    type='checkbox'
                                    name="agreement"
                                    onChange={handleCheckAll}
                                />
                                <span></span>
                            </div>
                        </td>
                        <td className='w-[60%] text-left'>
                            <div className='font-semibold w-[80%]'>
                                <div className='font-semibold'>Crack Detection</div>
                                <p className='font-normal text-sm'>Automated crack detection: Enhancing infrastructure safety through advanced technology.</p>
                            </div>
                        </td>
                        <td className='w-[15%] text-left'>
                            <div className='font-semibold w-full'>
                                <div className='font-semibold'>Expire On</div>
                                <p className='font-normal text-sm'>30/12/2023</p>
                            </div>
                        </td>
                        <td className='w-[10%] text-left'>
                            <div className={`${styles.radioWrap}`}>
                                <input
                                    type="checkbox"
                                />
                                <span className={`${styles.radioFrame}`}></span>
                            </div>
                        </td>
                        <td className='w-[10%] text-left relative'>
                            <div className="flex justify-start items-center relative">
                                <button
                                    onClick={() => toggleDropFunction(1)}
                                    className='hover:bg-yellow-951 h-7 w-7 flex justify-center items-center'>
                                    <Image
                                        src="/img/more-vertical.svg"
                                        alt='more-vertical'
                                        height={24}
                                        width={24}
                                    />
                                </button>
                                {(toggleDrop && selectedOption === 1) &&
                                    <div ref={wrapperRef} className="bg-white text-black overflow-hidden rounded rounded-xl w-[160px] flex flex-col flex-wrap items-start justify-start shadow-lg absolute top-[30px] right-[80px] z-[1] border border-[#E1E1E1] py-3">
                                        <button
                                            className="text-black text-[14px] hover:bg-white hover:text-black h-[40px] px-4 w-full text-left">
                                            <span>Renew Order</span>
                                        </button>
                                        <button
                                            className="text-black text-[14px] hover:bg-white hover:text-black h-[40px] px-4 w-full text-left">
                                            <span>Cancel Order</span>
                                        </button>
                                    </div>
                                }
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className='w-[5%] text-center'>
                            <div className={`${styles.customCheck} mt-2`}>
                                <input
                                    type='checkbox'
                                    name="agreement"
                                    onChange={handleCheckAll}
                                />
                                <span></span>
                            </div>
                        </td>
                        <td className='w-[60%] text-left'>
                            <div className='font-semibold w-[80%]'>
                                <div className='font-semibold'>Crack Detection</div>
                                <p className='font-normal text-sm'>Automated crack detection: Enhancing infrastructure safety through advanced technology.</p>
                            </div>
                        </td>
                        <td className='w-[15%] text-left'>
                            <div className='font-semibold w-full'>
                                <div className='font-semibold'>Expire On</div>
                                <p className='font-normal text-sm'>30/12/2023</p>
                            </div>
                        </td>
                        <td className='w-[10%] text-left'>
                            <div className={`${styles.radioWrap}`}>
                                <input
                                    type="checkbox"
                                />
                                <span className={`${styles.radioFrame}`}></span>
                            </div>
                        </td>
                        <td className='w-[10%] text-left relative'>
                            <div className="flex justify-start items-center relative">
                                <button
                                    onClick={() => toggleDropFunction(2)}
                                    className='hover:bg-yellow-951 h-7 w-7 flex justify-center items-center'>
                                    <Image
                                        src="/img/more-vertical.svg"
                                        alt='more-vertical'
                                        height={24}
                                        width={24}
                                    />
                                </button>
                                {(toggleDrop && selectedOption === 2) &&
                                    <div ref={wrapperRef} className="bg-white text-black overflow-hidden rounded rounded-xl w-[160px] flex flex-col flex-wrap items-start justify-start shadow-lg absolute top-[30px] right-[80px] z-[1] border border-[#E1E1E1] py-3">
                                        <button
                                            className="text-black text-[14px] hover:bg-white hover:text-black h-[40px] px-4 w-full text-left">
                                            <span>Renew Order</span>
                                        </button>
                                        <button
                                            className="text-black text-[14px] hover:bg-white hover:text-black h-[40px] px-4 w-full text-left">
                                            <span>Cancel Order</span>
                                        </button>
                                    </div>
                                }
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className='w-[5%] text-center'>
                            <div className={`${styles.customCheck} mt-2`}>
                                <input
                                    type='checkbox'
                                    name="agreement"
                                    onChange={handleCheckAll}
                                />
                                <span></span>
                            </div>
                        </td>
                        <td className='w-[60%] text-left'>
                            <div className='font-semibold w-[80%]'>
                                <div className='font-semibold'>Crack Detection</div>
                                <p className='font-normal text-sm'>Automated crack detection: Enhancing infrastructure safety through advanced technology.</p>
                            </div>
                        </td>
                        <td className='w-[15%] text-left'>
                            <div className='font-semibold w-full'>
                                <div className='font-semibold'>Expire On</div>
                                <p className='font-normal text-sm'>30/12/2023</p>
                            </div>
                        </td>
                        <td className='w-[10%] text-left'>
                            <div className={`${styles.radioWrap}`}>
                                <input
                                    type="checkbox"
                                />
                                <span className={`${styles.radioFrame}`}></span>
                            </div>
                        </td>
                        <td className='w-[10%] text-left relative'>
                            <div className="flex justify-start items-center relative">
                                <button
                                    onClick={() => toggleDropFunction(3)}
                                    className='hover:bg-yellow-951 h-7 w-7 flex justify-center items-center'>
                                    <Image
                                        src="/img/more-vertical.svg"
                                        alt='more-vertical'
                                        height={24}
                                        width={24}
                                    />
                                </button>
                                {(toggleDrop && selectedOption === 3) &&
                                    <div ref={wrapperRef} className="bg-white text-black overflow-hidden rounded rounded-xl w-[160px] flex flex-col flex-wrap items-start justify-start shadow-lg absolute top-[30px] right-[80px] z-[1] border border-[#E1E1E1] py-3">
                                        <button
                                            className="text-black text-[14px] hover:bg-white hover:text-black h-[40px] px-4 w-full text-left">
                                            <span>Renew Order</span>
                                        </button>
                                        <button
                                            className="text-black text-[14px] hover:bg-white hover:text-black h-[40px] px-4 w-full text-left">
                                            <span>Cancel Order</span>
                                        </button>
                                    </div>
                                }
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className='w-[5%] text-center'>
                            <div className={`${styles.customCheck} mt-2`}>
                                <input
                                    type='checkbox'
                                    name="agreement"
                                    onChange={handleCheckAll}
                                />
                                <span></span>
                            </div>
                        </td>
                        <td className='w-[60%] text-left'>
                            <div className='font-semibold w-[80%]'>
                                <div className='font-semibold'>Crack Detection</div>
                                <p className='font-normal text-sm'>Automated crack detection: Enhancing infrastructure safety through advanced technology.</p>
                            </div>
                        </td>
                        <td className='w-[15%] text-left'>
                            <div className='font-semibold w-full'>
                                <div className='font-semibold'>Expire On</div>
                                <p className='font-normal text-sm'>30/12/2023</p>
                            </div>
                        </td>
                        <td className='w-[10%] text-left'>
                            <div className={`${styles.radioWrap}`}>
                                <input
                                    type="checkbox"
                                />
                                <span className={`${styles.radioFrame}`}></span>
                            </div>
                        </td>
                        <td className='w-[10%] text-left relative'>
                            <div className="flex justify-start items-center relative">
                                <button
                                    onClick={() => toggleDropFunction(4)}
                                    className='hover:bg-yellow-951 h-7 w-7 flex justify-center items-center'>
                                    <Image
                                        src="/img/more-vertical.svg"
                                        alt='more-vertical'
                                        height={24}
                                        width={24}
                                    />
                                </button>
                                {(toggleDrop && selectedOption === 4) &&
                                    <div ref={wrapperRef} className="bg-white text-black overflow-hidden rounded rounded-xl w-[160px] flex flex-col flex-wrap items-start justify-start shadow-lg absolute top-[30px] right-[80px] z-[1] border border-[#E1E1E1] py-3">
                                        <button
                                            className="text-black text-[14px] hover:bg-white hover:text-black h-[40px] px-4 w-full text-left">
                                            <span>Renew Order</span>
                                        </button>
                                        <button
                                            className="text-black text-[14px] hover:bg-white hover:text-black h-[40px] px-4 w-full text-left">
                                            <span>Cancel Order</span>
                                        </button>
                                    </div>
                                }
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}