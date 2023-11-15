import React from 'react';
import Image from "next/image";
import Link from "next/link";
export default function Header() {
    return (
        <div className="flex justify-between items-center py-3 px-3">
            <Link
                href="/"
            >
                <Image
                    src="/img/logo-new.svg"
                    alt="logo"
                    height={50}
                    width={140}
                />
            </Link>
            <ul className="flex justify-start items-center space-x-9">
                <li>
                    <Link
                        href="/"
                        className="text-black h-[37px] px-4 bg-yellow-951 flex justify-center items-center rounded rounded-lg"
                    >
                        <span>Plans and pricing</span>
                    </Link>
                </li>
                <li>
                    <Link href="/authentication/help">Help</Link>
                </li>
                <li>
                    <Link href="/authentication/signin">Sign in</Link>
                </li>
            </ul>
        </div>
    )
}