"use client";
import { ReactNode, useState } from "react";
import { HeroHighlight } from "~/components/ui/hero-highlight";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Input } from "@nextui-org/react";
import { Link } from "@remix-run/react";
import { useTheme } from "next-themes";
import SunIcon from "~/components/icons/SunIcon";
import MoonIcon from "~/components/icons/MoonIcon";
import { MailIcon } from "~/components/icons/MailIcon";
import FacebookIcon from "~/components/icons/FacebookIcon";
import WhatsappIcon from "~/components/icons/WhatsappIcon";
import TwiterIcon from "~/components/icons/TwiterIcon";
import InstagramIcon from "~/components/icons/InstgramIcon";



export default function PublicLayout({ children }: { children: ReactNode }) {
    const { theme, setTheme } = useTheme()

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        "Home",
        
    ];
    return (
        <HeroHighlight className="transition duration-500">
            {/* navigation bar */}
            <Navbar
                className=" shadow-sm bg-white shadow-lg transition duration-500 font-poppins dark:bg-slate-800 dark:opacity-70 rounded-b-lg"
                onMenuOpenChange={setIsMenuOpen}
            >
                {/* Navbar content */}

                <NavbarContent>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    <NavbarBrand>
                        <p className=" text-inherit text-xl font-poppins">Logo</p>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-4" justify="center">

                    <NavbarItem >
                        <Link to="/" className="font-poppins hover:text-blue-200" aria-current="page">
                            Home
                        </Link>
                    </NavbarItem>

                    <NavbarItem>
                        <Link to="/cartDetails" color="foreground" className="font-poppins hover:text-blue-200">
                            About
                        </Link>
                    </NavbarItem>

                    <NavbarItem>
                        <Link to="/events" color="foreground" className="font-poppins hover:text-blue-200">
                            Events
                        </Link>
                    </NavbarItem>

                    <NavbarItem>
                        <Link to="/contact" color="foreground" className="font-poppins hover:text-blue-200">
                            Contact
                        </Link>
                    </NavbarItem>

                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem className="flex gap-6">
                        <Link to="/login">
                            <div className="bg-default-300 h-12 w-20 rounded-lg flex items-center justify-center  text-white font-poppins transition duration-300 delay-300 ease-in-out hover:scale-105 hover:bg-indigo-500 shadow-md gap-2" >
                                <p>Login</p>
                            </div>
                        </Link>
                        <Link to="/">
                            <div
                                className="h-12 w-20 bg-primary rounded-lg flex items-center justify-center"
                                onClick={(e) => {
                                    e.preventDefault(); // Prevents the default action
                                    setTheme(theme === "dark" ? "light" : "dark");
                                }}
                            >
                                {
                                    theme === "dark" ? (
                                        <>
                                            <MoonIcon className="text-slate-950" />

                                        </>
                                    ) : (
                                        <>
                                            <SunIcon className="text-white" />

                                        </>
                                    )
                                }

                            </div>
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarMenu className="opacity-70 bg-primary-200">
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                to={index === 0 ? '/' : index === 1 ? '/portfolio' : '/contact'}
                                color={
                                    index === 0 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                                }
                                className="w-full"
                            >
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))}

                </NavbarMenu>
            </Navbar>
            <div>
                {children}
            </div>

            {/* footer*/}
            <div className="h-[100vh] bg-slate-800 px-4 backdrop-blur  bg-opacity-40 rounded-xl gap-10 pt-40 w-full">
                <p className="text-xl font-poppins">VoteEase</p>
                <div className="mt-10 flex gap-6">
                    <WhatsappIcon className="h-6 w-6 text-success" />
                    <FacebookIcon className="h-6 w-6 text-primary" />
                    <TwiterIcon className="h-6 w-6 " />
                    <InstagramIcon className="h-6 w-6 text-pink-500" />
                </div>
                <div className="lg:grid grid-cols-4 mt-14">
                    <div>
                        <p className="text-lg font-poppins">Services</p>
                        <p className="font-poppins text-md mt-6 dark:text-gray-400">Our Story</p>
                        <p className="font-poppins text-md mt-4 dark:text-gray-400">Latest News</p>
                        <p className="font-poppins text-md mt-4 dark:text-gray-400">Opportunities</p>
                        <p className="font-poppins text-md mt-4 dark:text-gray-400">Collaberation</p>
                        <p className="font-poppins text-md mt-4 dark:text-gray-400">Latest News</p>                    </div>
                    <div>
                        <p className="text-lg font-poppins">Support</p>
                        <p className="font-poppins text-md mt-6 dark:text-gray-400">Our Story</p>
                        <p className="font-poppins text-md mt-4 dark:text-gray-400">Latest News</p>
                        <p className="font-poppins text-md mt-4 dark:text-gray-400">Opportunities</p>
                        <p className="font-poppins text-md mt-4 dark:text-gray-400">Collaberation</p>
                        <p className="font-poppins text-md mt-4 dark:text-gray-400">Latest News</p>
                    </div>
                    <div>
                        <p className="text-lg font-poppins">About Us</p>
                        <p className="font-poppins text-md mt-6 dark:text-gray-400">Our Story</p>
                        <p className="font-poppins text-md mt-4 dark:text-gray-400">Latest News</p>
                        <p className="font-poppins text-md mt-4 dark:text-gray-400">Opportunities</p>
                        <p className="font-poppins text-md mt-4 dark:text-gray-400">Collaberation</p>
                        <p className="font-poppins text-md mt-4 dark:text-gray-400">Latest News</p>
                    </div>
                    <div>
                        <p className="text-lg font-poppins">Privacy Policy</p>
                        <p className="font-poppins text-md mt-6 dark:text-gray-400">Our Story</p>
                        <p className="font-poppins text-md mt-4 dark:text-gray-400">Latest News</p>
                        <p className="font-poppins text-md mt-4 dark:text-gray-400">Opportunities</p>
                        <p className="font-poppins text-md mt-4 dark:text-gray-400">Collaberation</p>
                        <p className="font-poppins text-md mt-4 dark:text-gray-400">Latest News</p>
                    </div>
                </div>

                <div className="bg-slate-600 h-[15vh] lg:grid flex items-center justify-center lg:grid-cols-5 rounded-lg w-full shadow-lg mt-10 bg-opacity-30 p-4 gap-5">
                    <div className="col-span-3">
                        <p className="font-poppins text-lg">Subscribe to our newsletter</p>
                        <p className="font-poppins text-sm dark:text-gray-400"> Receive weekly updates with the newest insights, trends, and tools, straight to your email.</p>
                    </div>
                    <div>
                        <Input
                            placeholder="gyan@gmail.com"
                            startContent={
                                <MailIcon className="" />
                            }
                        />
                    </div>
                    <div>
                        <Button color="primary"> Subscribe</Button>
                    </div>
                </div>
            </div>
        </HeroHighlight>
    );
}
