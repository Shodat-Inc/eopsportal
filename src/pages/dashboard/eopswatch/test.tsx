import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import NoDataFound from "../../../common/nodatafound";
import Link from "next/dist/client/link";

export default function Test(props: any) {
    const { data, routerParams } = props;
    const [showImageModal, setShowImageModal] = useState(false);
    const [resImage, setResImage] = useState("");
    const imageModalFunction = (image: any) => {
        setShowImageModal(true);
        setResImage(image);
    }
    // Hook that alerts clicks outside of the passed ref
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShowImageModal(false)
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
    return (
        <div>
            <div className="mt-5 relative flex flex-wrap justify-start items-start w-full h-full p-3">

                {
                    data && data.length > 0 ?
                        data.map((item: any, index: any) => (
                            <div className="w-[246px] overflow-hidden rounded rounded-xl mr-4 mb-4 relative" key={index}>
                                <div className="h-[200px] w-[246px] overflow-hidden rounded rounded-xl relative">
                                    <div className="flex justify-start items-center absolute top-0 right-0">
                                        <Link
                                            href={{
                                                pathname: "/dashboard/eopswatch/trainingview",
                                                query: {
                                                    objectID: routerParams.objectID,
                                                    key: routerParams.key,
                                                    model: routerParams.model,
                                                    id: routerParams.id,
                                                    subObject: routerParams.subObject,
                                                    result: item.resultImage ? item.resultImage : '',
                                                    imageID: item.imageID,
                                                    from:"eopswatch"
                                                }
                                            }}
                                            className="text-sm font-semibold h-[32px] px-2 rounded rounded-lg inline-flex justify-center items-center bg-yellow-951 mr-4">
                                            <Image
                                                src="/img/test-icon.svg"
                                                alt="Test Icon"
                                                height={20}
                                                width={20}
                                            />
                                            <span className="pl-2">Test</span>
                                        </Link>
                                        <button
                                            onClick={() => imageModalFunction(item.path)}
                                            className="text-sm font-semibold h-[32px] px-1 rounded rounded-lg inline-flex justify-center items-center bg-[#333333]">
                                            <Image
                                                src="/img/external-link-white.svg"
                                                alt="Test Icon"
                                                height={26}
                                                width={26}
                                            />
                                        </button>
                                    </div>
                                    <Image
                                        src={item.path}
                                        alt="Crack Detection"
                                        height={200}
                                        width={246}
                                        className="object-cover h-full w-full"
                                    />
                                </div>
                                <p className="mt-1 text-[13px] text-[#666666]">Uploaded Date: {item.dateUploaded}</p>
                            </div>
                        ))
                        :
                        <div className="h-72 flex justify-center items-center flex-wrap flex-col mt-8 w-full">
                            <NoDataFound createText="No image found!" />
                        </div>
                }

                {/* <div className="w-[246px] overflow-hidden rounded rounded-xl mr-4 mb-4 relative">
                    <div className="h-[200px] w-[246px] overflow-hidden rounded rounded-xl relative">
                        <div className="flex justify-start items-center absolute top-0 right-0">
                            <button className="text-sm font-semibold h-[32px] px-2 rounded rounded-lg inline-flex justify-center items-center bg-yellow-951 mr-4">
                                <Image
                                    src="/img/test-icon.svg"
                                    alt="Test Icon"
                                    height={20}
                                    width={20}
                                />
                                <span className="pl-2">Test</span>
                            </button>
                            <button
                                onClick={() => imageModalFunction('/img/CrackDetection/TPC71810-01-012/Test/WallTest1.png')}
                                className="text-sm font-semibold h-[32px] px-1 rounded rounded-lg inline-flex justify-center items-center bg-[#333333]">
                                <Image
                                    src="/img/external-link-white.svg"
                                    alt="Test Icon"
                                    height={26}
                                    width={26}
                                />
                            </button>
                        </div>
                        <Image
                            src="/img/CrackDetection/TPC71810-01-012/Test/WallTest1.png"
                            alt="Crack Detection"
                            height={200}
                            width={246}
                            className="object-cover h-full w-full"
                        />
                    </div>
                    <p className="mt-1 text-[13px] text-[#666666]">Uploaded Date: 30-05-2023</p>
                </div>

                <div className="w-[246px] overflow-hidden rounded rounded-xl mr-4 mb-4 relative">
                    <div className="h-[200px] w-[246px] overflow-hidden rounded rounded-xl relative">
                        <div className="flex justify-start items-center absolute top-0 right-0">
                            <button className="text-sm font-semibold h-[32px] px-2 rounded rounded-lg inline-flex justify-center items-center bg-yellow-951 mr-4">
                                <Image
                                    src="/img/test-icon.svg"
                                    alt="Test Icon"
                                    height={20}
                                    width={20}
                                />
                                <span className="pl-2">Test</span>
                            </button>
                            <button
                                onClick={() => imageModalFunction('/img/CrackDetection/TPC71810-01-012/Test/WallTest2.png')}
                                className="text-sm font-semibold h-[32px] px-1 rounded rounded-lg inline-flex justify-center items-center bg-[#333333]">
                                <Image
                                    src="/img/external-link-white.svg"
                                    alt="Test Icon"
                                    height={26}
                                    width={26}
                                />
                            </button>
                        </div>
                        <Image
                            src="/img/CrackDetection/TPC71810-01-012/Test/WallTest2.png"
                            alt="Crack Detection"
                            height={200}
                            width={246}
                            className="object-cover h-full w-full"
                        />
                    </div>
                    <p className="mt-1 text-[13px] text-[#666666]">Uploaded Date: 30-05-2023</p>
                </div>

                <div className="w-[246px] overflow-hidden rounded rounded-xl mr-4 mb-4 relative">
                    <div className="h-[200px] w-[246px] overflow-hidden rounded rounded-xl relative">
                        <div className="flex justify-start items-center absolute top-0 right-0">
                            <button className="text-sm font-semibold h-[32px] px-2 rounded rounded-lg inline-flex justify-center items-center bg-yellow-951 mr-4">
                                <Image
                                    src="/img/test-icon.svg"
                                    alt="Test Icon"
                                    height={20}
                                    width={20}
                                />
                                <span className="pl-2">Test</span>
                            </button>
                            <button
                                onClick={() => imageModalFunction('/img/CrackDetection/TPC71810-01-012/Test/WallTest3.png')}
                                className="text-sm font-semibold h-[32px] px-1 rounded rounded-lg inline-flex justify-center items-center bg-[#333333]">
                                <Image
                                    src="/img/external-link-white.svg"
                                    alt="Test Icon"
                                    height={26}
                                    width={26}
                                />
                            </button>
                        </div>
                        <Image
                            src="/img/CrackDetection/TPC71810-01-012/Test/WallTest3.png"
                            alt="Crack Detection"
                            height={200}
                            width={246}
                            className="object-cover h-full w-full"
                        />
                    </div>
                    <p className="mt-1 text-[13px] text-[#666666]">Uploaded Date: 30-05-2023</p>
                </div> */}

            </div>

            {/* Image Modal */}
            {showImageModal &&
                <div ref={wrapperRef}>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative my-0 w-[450px] bg-transparent border border-yellow-951 rounded rounded-xl">
                            <div className="border-0 shadow-lg-1 relative flex flex-col w-full bg-white outline-none focus:outline-none w-[450px] h-[420px] overflow-hidden-1 bg-transparent rounded rounded-xl">
                                {/*header*/}
                                <div className="flex items-start justify-between p-0">
                                    <button
                                        className="bg-transparent border border-white hover:border-yellow-951 text-black float-right leading-none font-semibold outline-none focus:outline-none bg-white absolute right-[-40px] top-[-40px] rounded rounded-full p-1 hover:bg-yellow-951"
                                        onClick={() => setShowImageModal(false)}
                                    >
                                        <Image
                                            src="/img/close.svg"
                                            alt="close"
                                            className="h-6 h-[24px] w-[24px]"
                                            height={24}
                                            width={24}
                                        />
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-0 flex items-center jusifiy-center h-full w-full">
                                    {
                                        resImage ?
                                            <Image
                                                src={resImage}
                                                alt="result"
                                                className="h-[100%] w-[100%] object-cover rounded rounded-xl"
                                                height={420}
                                                width={450}
                                            />
                                            :
                                            <div className="text-xl font-semibold w-full text-center flex flex-wrap flex-col items-center justify-center">
                                                <Image
                                                    src="/img/no_image_icon.svg"
                                                    alt="no image"
                                                    height={100}
                                                    width={100}
                                                    className="h-[100%] w-[100%] object-cover rounded rounded-xl"
                                                />
                                                <span className="mt-3">No Image Found!! </span>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
            }
        </div>
    )
}