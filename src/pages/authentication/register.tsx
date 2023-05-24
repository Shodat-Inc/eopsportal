import Link from "next/link";
import Router from 'next/router';
import Image from "next/image";

export default function Register() {
    const goToComplete = () => {
        Router.push('/authentication/complete')
    }
    return (
        <>
            <div className="column-2 flex font-OpenSans">
                <div className="w-[50%] bg-[url('/img/architecture2.jpg')] bg-cover bg-no-repeat bg-center h-screen">
                    <div className="w-full h-full backdrop-brightness-25 px-16 py-16">
                        <div className="flex">
                            <Image
                                src="/img/logo-white.svg"
                                alt="logo"
                                className="fill-white"
                                width={127}
                                height={27}
                            />
                        </div>
                        <div className="mt-24">
                            <p className="mb-3">
                                <Image
                                    src="/img/quote_alt_left_icon.svg"
                                    alt="quote"
                                    className="h-8"
                                    width={32}
                                    height={32}
                                />
                            </p>
                            <p className="text-2xl text-white font-light leading-10">
                                The eOps Fabric - Edge enabled data mesh with management, processing, & security features. Enabling agile development & secured dilivery of analytics applications and ML models to meet high paced business demands. The eOps  Chord-Blockchain framework ensuring highly compliant and audited edge operations.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-[50%] relative">
                    <div className="flex justify-start items-center h-full flex-wrap flex-col">

                        <div className="pt-5 pr-2 text-left text-gray-951 text-xl font-medium mb-5 w-[470px]">
                            <Link href="/" className="flex items-center justify-start">
                                <Image
                                    src="/img/angle_left_icon.svg"
                                    alt="angle left"
                                    className="mr-2"
                                    width={12}
                                    height={12}
                                />
                                <span>Back</span>
                            </Link>
                        </div>

                        <div className="text-left w-[470px]">
                            <p className="font-bold text-3xl text-black mb-3 capitalize">Register a Business Account!</p>
                            <p className="font-normal text-2xl text-gray-500">For the purpose of industry regulation, your details are required.</p>
                            <div className="mb-4 mt-5 border border-gray-100 w-full h-[1px]"></div>
                            <div className="signinform relative">
                                <form>
                                    <div className="mb-4">
                                        <label className="text-gray-500 text-lg font-medium mb-3 block">First name*</label>
                                        <input
                                            type="text"
                                            className="border rounded-lg pl-10 pr-10 border-black h-12 w-full shadow-lg"
                                            name="firstname"
                                            placeholder="First name"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-gray-500 text-lg font-medium mb-3 block">Last name*</label>
                                        <input
                                            type="text"
                                            className="border rounded-lg pl-10 pr-10 border-black h-12 w-full shadow-lg"
                                            name="lastname"
                                            placeholder="Last name"
                                        />
                                    </div>
                                    <div className="mb-8 relative">
                                        <div className="column-2 flex items-center justify-between">
                                            <label className="text-gray-500 text-lg font-medium mb-3 block">Company name*</label>
                                        </div>
                                        <input
                                            type="text"
                                            className="border rounded-lg pl-10 pr-14 border-black h-12 w-full shadow-lg"
                                            name="companyname"
                                            placeholder="Company name"
                                        />
                                    </div>
                                    <div className="relative">
                                        {/* <button 
                                        className="rounded-lg h-16 bg-black w-full text-white text-lg"
                                        onClick={goToComplete}
                                        >
                                            Save & Continue
                                        </button> */}
                                        <Link
                                            href="/authentication/complete"
                                            className="rounded-lg h-16 bg-black w-full text-white text-lg flex justify-center items-center">Save & Continue</Link>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
}
