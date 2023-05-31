import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
export default function EopsProsense() {
    return (
        <div className="flex font-OpenSans">

            <div className="w-[84%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOPS Prosense</p>
                </div>

                <div className="border min-h-full rounded-xl mt-3 px-4 py-4">
                    <div className="flex justify-start items-start">
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
                    <div className="flex h-96 w-full justify-center items-center">
                        <p className="text-gray-951 font-semibold text-5xl">Coming Soon</p>
                    </div>                  

                </div>
            </div>

            <div className="w-[16%] pl-5">
                <Template />
            </div>

        </div>
    )
}

EopsProsense.getLayout = function getLayout(page:any) {
    return (
        <Layout>{page}</Layout>
    )
}