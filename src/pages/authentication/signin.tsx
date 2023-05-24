import Link from "next/link";
import Image from "next/image";

export default function SignIn() {
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
                    <div className="flex justify-center items-center h-full">

                        <div className="pt-10 pr-2 text-right text-black text-xl font-medium absolute top-0 right-2">
                            <span className="text-gray-500 font-normal">Don't have an account? </span> <Link href="/authentication/register">Sign Up</Link>
                        </div>

                        <div className="text-left w-[470px]">
                            <p className="font-bold text-3xl text-black mb-4 capitalize">Hello! Welcome Back.</p>
                            <p className="font-normal text-2xl text-gray-500">Log in with your credenticals that you entered during your registration.</p>
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
                                    <div className="mb-10 relative">
                                        <div className="column-2 flex items-center justify-between">
                                            <label className="text-gray-500 text-lg font-medium mb-3 block">Password*</label>
                                            <Link className="text-black text-lg font-medium mb-3 block" href="/authentication/forgotpassword">Forgot Password?</Link>
                                        </div>
                                        <input
                                            type="text"
                                            className="border rounded-lg pl-10 pr-14 border-black h-12 w-full shadow-lg"
                                            name="email"
                                            placeholder="Enter email address"
                                        />
                                        <span className="absolute text-black font-normal font-8 right-4 bottom-[14px] cursor-pointer">Show</span>
                                    </div>
                                    <div className="relative">
                                        <button className="rounded-lg h-16 bg-black w-full text-white text-lg">
                                            Login
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
