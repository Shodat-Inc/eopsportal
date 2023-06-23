import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import RangeSlider from "@/common/rangeSlider";

// const RangeSlider = ({ min, max, value, step, onChange }) => {
//     const [minValue, setMinValue] = React.useState(value ? value.min : min);
//     const [maxValue, setMaxValue] = React.useState(value ? value.max : max);

//     React.useEffect(() => {
//         if (value) {
//             setMinValue(value.min);
//             setMaxValue(value.max);
//         }
//     }, [value]);

//     const handleMinChange = e => {
//         e.preventDefault();
//         const newMinVal = Math.min(+e.target.value, maxValue - step);
//         if (!value) setMinValue(newMinVal);
//         onChange({ min: newMinVal, max: maxValue });
//     };

//     const handleMaxChange = e => {
//         e.preventDefault();
//         const newMaxVal = Math.max(+e.target.value, minValue + step);
//         if (!value) setMaxValue(newMaxVal);
//         onChange({ min: minValue, max: newMaxVal });
//     };

//     const minPos = ((minValue - min) / (max - min)) * 100;
//     const maxPos = ((maxValue - min) / (max - min)) * 100;

//     return (
//         <div className="wrapper">
//             <div className="input-wrapper">
//                 {/* <input
//                     className="input"
//                     type="range"
//                     value={minValue}
//                     min={min}
//                     max={max}
//                     step={step}
//                     onChange={handleMinChange}
//                 /> */}
//                 <input
//                     className="input"
//                     type="range"
//                     value={maxValue}
//                     min={min}
//                     max={max}
//                     step={step}
//                     onChange={handleMaxChange}
//                 />
//             </div>

//             <div className="control-wrapper">
//                 <div className="control" style={{ left: `${minPos}%` }} />
//                 <div className="rail">
//                     <div
//                         className="inner-rail"
//                         style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
//                     />
//                 </div>
//                 <div className="control" style={{ left: `${maxPos}%` }} />
//             </div>
//         </div>
//     );
// };

export default function ModelCatalog() {
    const [showModal, setShowModal] = useState(false);
    const [modelTitle, setModalTitle] = useState('Crack Deduction')
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

    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">Model Catalog</p>
                </div>

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
                                </li>
                            </ol>
                        </nav>
                    </div>

                    {/* Content Goes Here */}

                    <div className="flex items-center justify-center">
                        <div className="relative mt-20 w-[95%]">
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
                                        className="!absolute top-[40%] -translate-y-2/4 left-4 bg-yellow-951 bg-opacity-90 rounded rounded-full"
                                    >
                                        <Image
                                            src="/img/prev-arrow.svg"
                                            alt="prev arrow"
                                            height={30}
                                            width={30}
                                            className="mt-2"
                                        />
                                    </IconButton>
                                )}
                                nextArrow={({ handleNext }) => (
                                    <IconButton
                                        variant="text"
                                        color="white"
                                        size="lg"
                                        onClick={handleNext}
                                        className="!absolute top-[40%] -translate-y-2/4 !right-4 bg-yellow-951 bg-opacity-90 rounded rounded-full z-10"
                                    >
                                        <Image
                                            src="/img/next-arrow.svg"
                                            alt="next arrow"
                                            height={15}
                                            width={15}
                                        />
                                    </IconButton>
                                )}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="h-[300px] w-[300px] overflow-hidden rounded rounded-xl relative">
                                        <Image
                                            src="/img/m-crack-deduction.png"
                                            alt="crack deduction"
                                            height={300}
                                            width={300}
                                        />
                                        <div className="absolute h-[50%] bottom-0 left-0 w-full bg-black bg-opacity-75 p-3">
                                            <p className="text-white">Crack Deduction</p>
                                            <button
                                                onClick={() => { viewModal("Crack Deduction") }}
                                                className="bg-yellow-951 rounded rounded-md flex justify-center items-center h-[44px] min-w-[100px] pl-2 pr-2 text-black text-sm mt-7 ml-24">View Modal
                                            </button>
                                        </div>
                                    </div>
                                    <div className="h-[300px] w-[300px] overflow-hidden rounded rounded-xl relative">
                                        <Image
                                            src="/img/m-part-deduction.png"
                                            alt="crack deduction"
                                            height={300}
                                            width={300}
                                        />
                                        <div className="absolute h-[50%] bottom-0 left-0 w-full bg-black bg-opacity-75 p-3">
                                            <p className="text-white">Part Deduction</p>
                                            <button
                                                onClick={() => { viewModal("Part Deduction") }}
                                                className="bg-yellow-951 rounded rounded-md flex justify-center items-center h-[44px] min-w-[100px] pl-2 pr-2 text-black text-sm mt-7 ml-24">View Modal
                                            </button>
                                        </div>
                                    </div>
                                    <div className="h-[300px] w-[300px] overflow-hidden rounded rounded-xl relative">
                                        <Image
                                            src="/img/m-workplace.png"
                                            alt="crack deduction"
                                            height={300}
                                            width={300}
                                        />
                                        <div className="absolute h-[50%] bottom-0 left-0 w-full bg-black bg-opacity-75 p-3">
                                            <p className="text-white">Workplace safety Deduction</p>
                                            <button
                                                onClick={() => { viewModal("Workplace safety Deduction") }}
                                                className="bg-yellow-951 rounded rounded-md flex justify-center items-center h-[44px] min-w-[100px] pl-2 pr-2 text-black text-sm mt-7 ml-24">Coming Soon
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="h-[300px] w-[300px] overflow-hidden rounded rounded-xl relative">
                                        <Image
                                            src="/img/m-crack-deduction.png"
                                            alt="crack deduction"
                                            height={300}
                                            width={300}
                                        />
                                        <div className="absolute h-[50%] bottom-0 left-0 w-full bg-black bg-opacity-75 p-3">
                                            <p className="text-white">Crack Deduction</p>
                                            <button
                                                onClick={() => { viewModal("Crack Deduction") }}
                                                className="bg-yellow-951 rounded rounded-md flex justify-center items-center h-[44px] min-w-[100px] pl-2 pr-2 text-black text-sm mt-7 ml-24">View Modal
                                            </button>
                                        </div>
                                    </div>
                                    <div className="h-[300px] w-[300px] overflow-hidden rounded rounded-xl relative">
                                        <Image
                                            src="/img/m-part-deduction.png"
                                            alt="crack deduction"
                                            height={300}
                                            width={300}
                                        />
                                        <div className="absolute h-[50%] bottom-0 left-0 w-full bg-black bg-opacity-75 p-3">
                                            <p className="text-white">Part Deduction</p>
                                            <button
                                                onClick={() => { viewModal("Part Deduction") }}
                                                className="bg-yellow-951 rounded rounded-md flex justify-center items-center h-[44px] min-w-[100px] pl-2 pr-2 text-black text-sm mt-7 ml-24">View Modal
                                            </button>
                                        </div>
                                    </div>
                                    <div className="h-[300px] w-[300px] overflow-hidden rounded rounded-xl relative">
                                        <Image
                                            src="/img/m-workplace.png"
                                            alt="crack deduction"
                                            height={300}
                                            width={300}
                                        />
                                        <div className="absolute h-[50%] bottom-0 left-0 w-full bg-black bg-opacity-75 p-3">
                                            <p className="text-white">Workplace safety Deduction</p>
                                            <button
                                                onClick={() => { viewModal("Workplace safety Deduction") }}
                                                className="bg-yellow-951 rounded rounded-md flex justify-center items-center h-[44px] min-w-[100px] pl-2 pr-2 text-black text-sm mt-7 ml-24">Coming Soon
                                            </button>
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
                                                        alt="crack Deduction"
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
            </div>

            <div className="w-[16%] pl-5 hidden">
                <Template />
            </div>

        </div>
    )
}

ModelCatalog.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}