import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Link from 'next/link';

export default function Breadcrumb(props: any) {
    // console.log({
    //     "__PROPS_IN_BREADCRUMBS": props
    // })
    const [nav, setNav] = useState({} as any);

    const getSelClass = useSelector((state: any) => state.classReducer);

    useEffect(() => {
        setNav(props?.breadcrumbs || getSelClass?.classBreadcrumbs)
    }, [props?.breadcrumbs || getSelClass?.classBreadcrumbs])

    return (
        <>
            {nav ?
                <div className="relative bg-white rounded-lg px-3 py-1 inline-flex border border-[#E3E3E3] mb-5">
                    <ul className="flex justify-start items-center text-sm">
                        <li className="flex justify-start items-center">
                            <Link
                                href="/dashboard/assetmanagement"
                                className="font-semibold"
                            >
                                {nav.flow}
                            </Link>
                        </li>

                        <li className="flex justify-start items-center">
                            <Image
                                src="/img/chevron-right.svg"
                                alt="chevron-right"
                                height={28}
                                width={28}
                            />
                            <button
                                className="font-semibold"
                            >
                                <span>{nav.class}</span>
                            </button>
                        </li>

                        <li className="flex justify-start items-center">
                            <Image
                                src="/img/chevron-right.svg"
                                alt="chevron-right"
                                height={28}
                                width={28}
                            />
                            <button
                                className="font-semibold"
                            >
                                {
                                    nav.classObjKey ?
                                        <span>{nav.classObjKey}: {nav.classObjValue}</span>
                                        :
                                        <span>{nav.classObjValue}</span>
                                }
                            </button>
                        </li>

                        <li className="flex justify-start items-center">
                            <Image
                                src="/img/chevron-right.svg"
                                alt="chevron-right"
                                height={28}
                                width={28}
                            />
                            <button
                                className="font-semibold"
                            >
                                <span>{nav.subClass}</span>
                            </button>
                        </li>

                        <li className="flex justify-start items-center">
                            <Image
                                src="/img/chevron-right.svg"
                                alt="chevron-right"
                                height={28}
                                width={28}
                            />
                            <button
                                className="font-semibold"
                            >
                                <span>{nav.subClassObjValue}</span>
                            </button>
                        </li>

                        {props?.current &&
                            <li className="flex justify-start items-center">
                                <Image
                                    src="/img/chevron-right.svg"
                                    alt="chevron-right"
                                    height={28}
                                    width={28}
                                />
                                <span className="text-gray-967 capitalize">
                                    {props?.current}
                                </span>
                            </li>
                        }

                    </ul>
                </div>
                : null
            }
        </>
    )

}