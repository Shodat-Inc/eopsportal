import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";


export default function EopsTraceModel() {
    const [showModal, setShowModal] = useState(false);
    const [cart, setCart] = useState(0);
    const [addCart, setAddCart] = useState([] as any)
    const [modelTitle, setModalTitle] = useState('Crack Detection')
    const viewModal = (item: any) => {
        setShowModal(true);
        setModalTitle(item)
    }
    const [value, setValue] = useState(20);
    const handleRange = (e: any) => {
        setValue(e.target.value)
    }

    // remove duplicate items in array
    function removeDuplicates(arr: any) {
        return arr.filter((item: any, index: any) => arr.indexOf(item) === index);
    }

    // Add to cart
    const addToCart = (item: any) => {

        let arr = addCart;
        removeDuplicates(arr)
        if (item) {
            arr.push(item)
        }
        setAddCart(arr)
    }
    // Remove from cart
    const removeToCart = (item: any) => {
        let arr = addCart;
        removeDuplicates(arr)
        if (item) {
            arr.pop(item)
        }
        setAddCart(arr)
    }

    // Function to splict the div to 3
    const splitEvery = (array: any, length: any) =>
        array.reduce(
            (result: any, item: any, index: any) => {
                if (index % length === 0) result.push([])
                result[Math.floor(index / length)].push(item)
                return result
            },
            []
        )


    const checkItemsInArray = (arr: any, choice: any) => {
        if (arr.indexOf(choice) === -1) {
            return false;
        } else {
            return true
        }
    }

    removeDuplicates(addCart)
    

    return (
        <div className="flex font-OpenSans">

            <div className="w-full">

                <div className="min-h-[350px] rounded-xl mt-3 px-4 py-4">
                    {/* Content Goes Here */}
                    <div className="flex items-center justify-center flex-wrap">

                        <div className="flex items-center justify-between w-full">
                            <p className="w-[40%]">Please find your object using by search box or select class to run the available AI models below.</p>
                            <Link
                                href="/dashboard/modelcatalog/myorders"
                                className="text-sm text-black min-w-[100px] h-[45px] px-4 inline-flex justify-center items-center rounded-xl border border-yellow-951 bg-yellow-951 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform relative">
                                <p>Explore AI models</p>
                            </Link>
                        </div>

                        {/* Manufacturing Plant Models */}
                        <div className="relative mt-5 w-[97%] mb-5">
                            <Carousel
                                className="rounded-xl"
                                navigation={({ setActiveIndex, activeIndex, length }) => (
                                    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2 hidden">
                                        {new Array(length).fill("").map((_, i) => (
                                            <span
                                                key={i}
                                                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "bg-white w-8" : "bg-white/50 w-4"
                                                    }`}
                                                onClick={() => setActiveIndex(i)}
                                            />
                                        ))}
                                    </div>
                                )}
                                prevArrow={({ handlePrev }) => (
                                    <IconButton
                                        variant="text"
                                        color="white"
                                        size="lg"
                                        onClick={handlePrev}
                                        className="!absolute top-[40%] -translate-y-2/4 left-4 bg-white bg-opacity-90 rounded rounded-full"
                                    >
                                        <Image
                                            src="/img/arrow-left-black.svg"
                                            alt="prev arrow"
                                            height={30}
                                            width={30}
                                            className="mt-0"
                                        />
                                    </IconButton>
                                )}
                                nextArrow={({ handleNext }) => (
                                    <IconButton
                                        variant="text"
                                        color="white"
                                        size="lg"
                                        onClick={handleNext}
                                        className="!absolute top-[40%] -translate-y-2/4 !right-4 bg-white bg-opacity-90 rounded rounded-full z-10"
                                    >
                                        <Image
                                            src="/img/arrow-right-black.svg"
                                            alt="next arrow"
                                            height={30}
                                            width={30}
                                        />
                                    </IconButton>
                                )}
                            >
                                <div className="flex justify-start items-center mb-5 gap-5">
                                    <div className="h-[422px] w-[320px] overflow-hidden rounded rounded-xl relative bg-white p-3 shadow shadow">
                                        <Image
                                            src="/img/crystallizatiod-detection.png"
                                            alt="Crack Detection"
                                            height={300}
                                            width={300}
                                        />
                                        <div className="mt-3">
                                            <p className="text-black font-semibold mb-2">Crystallization Detection</p>
                                            <p className="text-sm mb-4">Smart tire wear detection: Prolonging tire life and improving road safety with innovative sensing technology</p>
                                            <div className="flex justify-end items-ends">
                                                <button className="text-sm text-black w-[90px] h-[39px] inline-flex justify-center items-center rounded-xl border border-black">Active</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-[422px] w-[320px] overflow-hidden rounded rounded-xl relative bg-white p-3 shadow shadow">
                                        <Image
                                            src="/img/Parts-Detection-2.png"
                                            alt="Parts Detection"
                                            height={300}
                                            width={300}
                                        />
                                        <div className="mt-3">
                                            <p className="text-black font-semibold mb-2">Parts Detection</p>
                                            <p className="text-sm mb-4">Parts detection: Streamlining assembly lines and ensuring quality through efficient automated identification.</p>
                                            <div className="flex justify-end items-ends">
                                                <button className="text-sm bg-yellow-951 text-black w-[90px] h-[39px] inline-flex justify-center items-center rounded-xl border border-yellow-951">Re-active</button>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="h-[422px] w-[320px] overflow-hidden rounded rounded-xl relative bg-white p-3 shadow shadow hidden">
                                        <Image
                                            src="/img/workplace_safety_img.png"
                                            alt="Workplace Safety Detection"
                                            height={300}
                                            width={300}
                                        />
                                        <div className="mt-3">
                                            <p className="text-black font-semibold mb-2">Workplace Safety Detection</p>
                                            <p className="text-sm mb-4">Safeguarding employees and promoting a secure work environment through intelligent monitoring systems.</p>
                                            <div className="flex justify-end items-ends">
                                                <button className="text-sm bg-yellow-951 text-black w-[90px] h-[39px] inline-flex justify-center items-center rounded-xl border border-yellow-951">Re-active</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </Carousel>
                        </div>


                        {/* ======= Modal Starts======= */}
                        {showModal ?
                            <>
                                <div
                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                >
                                    <div className="relative my-6 w-[1000px]">
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            {/*header*/}
                                            <div className="flex items-start justify-between p-2">
                                                <h3 className="text-lg font-medium"></h3>
                                                <button
                                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none"
                                                    onClick={() => setShowModal(false)}
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
                                            <div className="relative p-10 flex justify-start items-center">
                                                <div className="mr-10 w-[50%]">
                                                    <Image
                                                        src="/img/m-crack-2.png"
                                                        alt="crack Detection"
                                                        height={426}
                                                        width={426}
                                                    />
                                                </div>
                                                <div className="w-[50%]">
                                                    <div className="text-lg font-semibold text-black mb-8">{modelTitle}</div>
                                                    <p className="text-sm font-semibold">How It Works</p>
                                                    <p className="mb-8">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                                                    <p className="text-sm font-semibold">Benifits</p>
                                                    <ul className="list-disc pl-5 space-y-2 mb-8">
                                                        <li>Lorem Ipsum is simply dummy text</li>
                                                        <li>Text of the printing</li>
                                                        <li>Type Setting Industries</li>
                                                    </ul>
                                                    <div className="flex">
                                                        <button className="bg-yellow-951 border border-yellow-951 rounded rounded-xl text-black h-12 min-w-[108px] flex justify-center items-center py-2 px-4 mr-16">Subscribe Now</button>
                                                        <button className="bg-black border border-black rounded rounded-xl text-white h-12 min-w-[108px] flex justify-center items-center py-2 px-4">Request Demo</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
                            </>
                            : null}
                        {/* ======= Modal Ends ======= */}
                    </div>

                </div>
            </div >

        </div >
    )
}

EopsTraceModel.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}