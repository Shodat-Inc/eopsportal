import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
<<<<<<< HEAD
import Template from "../template";
import Image from "next/image";
import Link from "next/link";

export default function ModelCatalog() {
    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
=======
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";

const automotiveModels = [
    {
        "id": 1,
        "model": "Crack Detection",
        "desc": "Automated crack detection: Enhancing infrastructure safety through advanced technology.",
        "price": "0",
        "subscribe": true,
        "image": "crack-detection-modal-catalog.png"
    },
    {
        "id": 2,
        "model": "Tire Wear Detection",
        "desc": "Smart tire wear detection: Prolonging tire life and improving road safety with innovative sensing technology.",
        "price": "0",
        "subscribe": false,
        "image": "tyre-wear-modal-catalog.png"
    },
    {
        "id": 3,
        "model": "Crystallization Detection",
        "desc": "Smart tire wear detection: Prolonging tire life and improving road safety with innovative sensing technology.",
        "price": "69",
        "subscribe": false,
        "image": "crystallizatiod-detection.png"
    },
    {
        "id": 4,
        "model": "Parts Detection",
        "desc": "Parts detection: Streamlining assembly lines and ensuring quality through efficient automated identification.",
        "price": "49",
        "subscribe": false,
        "image": "Parts-Detection.png"
    },
    {
        "id": 5,
        "model": "Battery Life Prediction",
        "desc": "Battery life prediction: Empowering sustainable technologies with accurate and proactive energy management.",
        "price": "79",
        "subscribe": false,
        "image": "Battery-Life-Prediction.png"
    }
]

export default function ModelCatalog() {
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
        console.log({
            value: e.target.value
        })
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
        console.log({
            arr:arr
        })
        setAddCart(arr)
    }
    // Remove from cart
    const removeToCart = (item: any) => {
        let arr = addCart;
        removeDuplicates(arr)
        if (item) {
            arr.pop(item)
        }
        console.log({
            arr:arr
        })
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
    console.log({
        addCart: addCart
        // automotiveModels: automotiveModels
    })

    return (
        <div className="flex font-OpenSans">

            <div className="w-full">
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">Model Catalog</p>
                </div>

<<<<<<< HEAD
                <div className="border border-gray-957 bg-gray-953 min-h-[450px] rounded-xl mt-3 px-4 py-4">
                    <div className="flex justify-start items-start">
=======
                <div className="hidden">
                    <div className={`${styles.rangeSlider}`}>
                        <input
                            type="range"
                            max={100}
                            min={0}
                            step={1}
                            value={value}
                            defaultValue={value}
                            onChange={handleRange}
                            title={value.toString()}
                        />
                    </div>
                    <div className="relative mb-5 mt-5 h-[20px] w-[380px] inline-block">
                        <span className={`absolute left-[${value}%]  top-0`}>{value.toString()}</span>
                    </div>
                </div>

                <div className="border border-gray-957 bg-gray-953 min-h-[450px] rounded-xl mt-3 px-4 py-4">
                    <div className="flex justify-start items-start hidden">
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-1">
                                <li className="inline-flex items-center">
                                    <Link href="/dashboard/assetmanagement"
                                        className="inline-flex items-center text-sm font-medium text-black hover:text-yellow-950">
                                        <Image
                                            src="/img/home.svg"
                                            alt="home"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                    </Link>
<<<<<<< HEAD
                                </li>                                
=======
                                </li>
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                            </ol>
                        </nav>
                    </div>

                    {/* Content Goes Here */}
<<<<<<< HEAD
                    <p>Content Goes Here!!</p>                    

                </div>
            </div>

            <div className="w-[16%] pl-5 hidden">
                <Template />
            </div>

        </div>
=======

                    <div className="flex items-center justify-center flex-wrap">

                        <div className="flex items-center justify-end w-full">
                            <Link
                                href="/dashboard/modelcatalog/myorders"
                                className="text-sm text-black w-[200px] h-[45px] inline-flex justify-center items-center rounded-xl border border-yellow-951 bg-yellow-951 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform relative">
                                <Image
                                    src="/img/shopping-cart.svg"
                                    alt="shopping-cart"
                                    height={25}
                                    width={25}
                                    className="mr-4"
                                />
                                <span className="absolute left-7 top-0 text-black bg-white rounded-full flex justify-center items-center h-5 w-5">{cart}</span>
                                <p>Continue to checkout</p>
                            </Link>
                        </div>

                        {/* Automative Models Slider */}
                        <div className="relative mt-5 w-[97%] mb-4">
                            <h1 className="mb-5 text-2xl font-semibold">Automotive Models</h1>
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

                                {
                                    splitEvery(automotiveModels, 3).map((itemsChunk: any) => (
                                        <div className="flex justify-start items-center mb-5">
                                            {itemsChunk.map((item: any, i: any) => (
                                                <div key={i} className={`h-[422px] w-[320px] overflow-hidden rounded rounded-xl relative bg-white p-3 shadow ${i % 3 === 0 ? 'ml-0' : 'ml-5'}`}>
                                                    <Image
                                                        src={`/img/${item.image}`}
                                                        alt="crack detection"
                                                        height={300}
                                                        width={300}
                                                    />
                                                    <div className="mt-3">
                                                        <p className="text-black font-semibold mb-2">{item.model}</p>
                                                        <p className="text-sm mb-4">{item.desc}</p>
                                                        <div className="flex justify-between items-center">
                                                            {
                                                                item.price === "0" ?
                                                                    <span className="text-green-500">Free trial</span>
                                                                    :
                                                                    <span className="text-black text-sm">
                                                                        price: <strong className="text-lg">${item.price}</strong>/month
                                                                    </span>
                                                            }
                                                            {
                                                                item.subscribe === true ?

                                                                    <button className="text-sm text-black w-[90px] h-[39px] inline-flex justify-center items-center rounded-xl border border-black">Subscribe</button>
                                                                    :
                                                                    <>
                                                                        {
                                                                            // checkItemsInArray(addCart, item.model) ?
                                                                            addCart.includes(item.model) ?
                                                                                <button
                                                                                    onClick={() => removeToCart(item.model)}
                                                                                    className="text-sm text-[#138A00] w-[130px] h-[39px] inline-flex justify-center items-center rounded-xl border border-[#138A00] bg-white">
                                                                                    <Image
                                                                                        src="/img/check-green.svg"
                                                                                        alt="shopping-cart"
                                                                                        height={20}
                                                                                        width={20}
                                                                                        className="mr-2"
                                                                                    />
                                                                                    <span className="text-[#138A00]">Selected</span>
                                                                                </button>
                                                                                :
                                                                                <button
                                                                                    onClick={() => addToCart(item.model)}
                                                                                    className="text-sm text-black w-[130px] h-[39px] inline-flex justify-center items-center rounded-xl border border-yellow-951 bg-yellow-951 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform">
                                                                                    <Image
                                                                                        src="/img/shopping-cart.svg"
                                                                                        alt="shopping-cart"
                                                                                        height={20}
                                                                                        width={20}
                                                                                        className="mr-2"
                                                                                    />
                                                                                    <span>Add to cart</span>
                                                                                </button>
                                                                        }
                                                                    </>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                            }

                                        </div>
                                    ))
                                }
                            </Carousel>
                        </div>

                        {/* Manufacturing Plant Models */}
                        <div className="relative mt-5 w-[97%] mb-5">
                            <h1 className="mb-5 text-2xl font-semibold">Manufacturing Plant Models</h1>
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
                                <div className="flex justify-between items-center mb-5">
                                    <div className="h-[422px] w-[320px] overflow-hidden rounded rounded-xl relative bg-white p-3 shadow shadow">
                                        <Image
                                            src="/img/Crack-Detection.png"
                                            alt="Crack Detection"
                                            height={300}
                                            width={300}
                                        />
                                        <div className="mt-3">
                                            <p className="text-black font-semibold mb-2">Crack Detection</p>
                                            <p className="text-sm mb-4">Automated crack detection: Enhancing infrastructure safety through advanced technology.</p>
                                            <div className="flex justify-end items-ends">
                                                <button
                                                    className="text-sm text-black w-[130px] h-[39px] inline-flex justify-center items-center rounded-xl border border-yellow-951 bg-yellow-951 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform">
                                                    <Image
                                                        src="/img/shopping-cart.svg"
                                                        alt="shopping-cart"
                                                        height={20}
                                                        width={20}
                                                        className="mr-2"
                                                    />
                                                    <span>Add to cart</span>
                                                </button>
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
                                                <button
                                                    className="text-sm text-black w-[130px] h-[39px] inline-flex justify-center items-center rounded-xl border border-yellow-951 bg-yellow-951 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform">
                                                    <Image
                                                        src="/img/shopping-cart.svg"
                                                        alt="shopping-cart"
                                                        height={20}
                                                        width={20}
                                                        className="mr-2"
                                                    />
                                                    <span>Add to cart</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="h-[422px] w-[320px] overflow-hidden rounded rounded-xl relative bg-white p-3 shadow shadow">
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
                                                <button
                                                    className="text-sm text-black w-[130px] h-[39px] inline-flex justify-center items-center rounded-xl border border-yellow-951 bg-yellow-951 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform">
                                                    <Image
                                                        src="/img/shopping-cart.svg"
                                                        alt="shopping-cart"
                                                        height={20}
                                                        width={20}
                                                        className="mr-2"
                                                    />
                                                    <span>Add to cart</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </Carousel>
                        </div>



                        {/* Custom Models */}
                        <div className="relative mt-5 w-[97%] mb-5">
                            <h1 className="mb-5 text-2xl font-semibold">Custom Models</h1>
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
                                        className="!absolute top-[40%] -translate-y-2/4 left-4 bg-white bg-opacity-90 rounded rounded-full hidden"
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
                                        className="!absolute top-[40%] -translate-y-2/4 !right-4 bg-white bg-opacity-90 rounded rounded-full z-10 hidden"
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
                                <div className="flex justify-between items-center mb-5">
                                    <div className="h-[422px] w-[320px] overflow-hidden rounded rounded-xl relative bg-white p-3 shadow shadow">
                                        <Image
                                            src="/img/custom-model-img.png"
                                            alt="Crack Detection"
                                            height={300}
                                            width={300}
                                        />
                                        <div className="mt-3 flex flex-wrap flex-col justify-center items-center ">
                                            <p className="text-black text-center font-semibold mt-5 h-[50px]">Upload your custom model</p>
                                             <div className="flex justify-end items-end w-full">
                                                <button
                                                    className="mt-10 text-sm text-black w-[130px] h-[39px] inline-flex justify-center items-center rounded-xl border border-yellow-951 bg-yellow-951 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform">
                                                    <Image
                                                        src="/img/shopping-cart.svg"
                                                        alt="shopping-cart"
                                                        height={20}
                                                        width={20}
                                                        className="mr-2"
                                                    />
                                                    <span>Add to cart</span>
                                                </button>
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
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
    )
}

ModelCatalog.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}