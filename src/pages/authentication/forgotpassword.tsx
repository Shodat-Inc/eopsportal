import Link from "next/link";
import Router from 'next/router';
import Image from "next/image";

export default function ForgotPassword() {
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

                        <div className="flex justify-between items-center w-[470px] pt-5">
                            <div className="pr-2 text-left text-gray-951 text-xl font-medium">
                                <Link href="/authentication/signin" className="flex items-center justify-start">
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

                            <div className="pr-2 text-right text-black text-xl font-medium ">
                                <span className="text-gray-500 font-normal">Don't have an account? </span> <Link href="/authentication/register">Sign Up</Link>
                            </div>
                        </div>

                        <div className="text-left w-[470px] mt-28">
                            <p className="font-bold text-3xl text-black mb-4 capitalize">Forgot Password</p>
                            <p className="font-normal text-2xl text-gray-500">Dont worry about your password! you can reset that any time.</p>
                            <div className="mb-4 mt-5 border border-gray-100 w-full h-[1px]"></div>
                            <div className="signinform relative">
                                <form>
                                    <div className="mb-6">
                                        <label className="text-gray-500 text-lg font-medium mb-3 block">Company email address*</label>
                                        <input
                                            type="text"
                                            className="border rounded-lg pl-10 pr-10 border-black h-12 w-full shadow-lg"
                                            name="email"
                                            placeholder="Enter email address"
                                        />
                                    </div>
                                    <div className="relative">
                                        <button className="rounded-lg h-16 bg-black w-full text-white text-lg">
                                            Confirm
                                        </button>
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
