import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router'
export default function Breadcrumbs(props: any) {
    const router = useRouter();
    const routerParams = router.query;
    const hasParams = routerParams.hasOwnProperty("PlantID")
    return (
        <div className="flex relative bg-white rounded rounded-lg px-3 py-1 inline-flex border border-[#E3E3E3] mb-5">
            <ul className="flex justify-start items-center text-sm">
                <li className="flex justify-start items-center">
                    <Link
                        href="/dashboard/eopswatch"
                        className="font-semibold"
                    >
                        All Industries
                    </Link>
                </li>

                <li className="flex justify-start items-center">
                    <Image
                        src="/img/chevron-right.svg"
                        alt="chevron-right"
                        height={28}
                        width={28}
                    />
                    <Link
                        href={{
                            pathname: '/dashboard/eopswatch/',
                        }}
                        className="font-semibold"
                    >
                        {routerParams.objectID}
                    </Link>
                </li>
                <li className="flex justify-start items-center">
                    <Image
                        src="/img/chevron-right.svg"
                        alt="chevron-right"
                        height={28}
                        width={28}
                    />
                    <span className="text-gray-967 capitalize">
                        {
                            hasParams ?
                                <>Plant ID : {routerParams.PlantID}</>
                                :
                                <>VIN : {routerParams.VIN}</>
                        }
                    </span>
                </li>
            </ul>
        </div>
    )
}