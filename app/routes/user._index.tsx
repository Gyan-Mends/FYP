import { useState, useEffect } from 'react';
import { Skeleton, User } from "@nextui-org/react";
import UserLayout from '~/layout/userLayout';
import UserIcon from '~/components/icons/UserIcon';
import EditionIcon from '~/components/icons/EditionIcon';
import CategoryIcon from '~/components/icons/CategoryIcon';
import EventIcon from '~/components/icons/EventsIcon';
import { LoaderFunction, redirect } from '@remix-run/node';
import { getSession } from '~/session';

const Admin = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer); // Cleanup the timer
    }, []);

    const skeletons = Array(4).fill(0); // Create an array with 4 elements for sketons

    return (
        <UserLayout pageName="Dashboard">
            <div className='lg:grid lg:grid-cols-3 gap-20 px-2'>
                <div className='col-span-2'>
                    {/* Events && category overview */}
                    {loading ? (
                        <div className='lg:grid lg:grid-cols-2 gap-10'>
                            {skeletons.slice(0, 2).map((_, index) => (
                                <Skeleton key={index} className="rounded-lg h-[100px] transition-all duration-200" />
                            ))}
                        </div>
                    ) : (
                        // Events && category overview
                        <div className='lg:grid lg:grid-cols-2 gap-10'>
                            {/* events */}
                            <div className="h-[100px] rounded-lg transition-all duration-200 bg-primary shadow-lg dark:bg-slate-800 flex items-center justify-between px-4">
                                <div className='flex '>
                                    <div className='flex gap-4'>
                                        {/* Other content here */}
                                        <div className='bg-white dark:bg-primary flex items-center justify-center h-[80px] w-[80px] rounded-xl shadow-md'>
                                            <EventIcon className="h-10 w-10 dark:text-white text-primary" />
                                        </div>
                                        <div className='flex items-center text-white'>
                                            <span>
                                                <p className='font-poppins text-lg'>23434K</p>
                                                <p className='font-poppins text-lg'>Total Events</p>
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        {/* Other content here */}
                                    </div>
                                </div>
                            </div>
                            {/* category */}
                            <div className="h-[100px] mt-4 lg:mt-0 md:mt-0 rounded-lg transition-all duration-200 bg-white shadow-lg dark:bg-slate-800 flex items-center justify-between px-4">
                                <div className='flex '>
                                    <div className='flex gap-4'>
                                        {/* Other content here */}
                                        <div className='bg-primary-50 flex items-center justify-center dark:bg-slate-600 h-[80px] w-[80px] rounded-xl shadow-sm'>
                                            <CategoryIcon className="h-10 w-10 text-primary" />
                                        </div>
                                        <div className='flex items-center'>
                                            <span>
                                                <p className='font-poppins text-lg'>23434K</p>
                                                <p className='font-poppins text-lg'>Categories</p>
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        {/* Other content here */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    {loading ? (
                        <div className='lg:grid lg:grid-cols-2  mt-6 gap-10'>
                            {skeletons.slice(0, 2).map((_, index) => (
                                <Skeleton key={index} className="rounded-lg h-[100px] transition-all duration-200" />
                            ))}
                        </div>
                    ) : (
                        <div className='lg:grid lg:grid-cols-2 mt-6 gap-10'>
                            {/* Contestants */}
                            <div className="h-[100px] rounded-lg transition-all duration-200 bg-white shadow-lg dark:bg-slate-800 flex items-center justify-between px-4">
                                <div className='flex '>
                                    <div className='flex gap-4'>
                                        {/* Other content here */}
                                        <div className='bg-primary-50 flex items-center justify-center dark:bg-slate-600 h-[80px] w-[80px] rounded-xl shadow-sm'>
                                            <UserIcon className="h-10 w-10 text-primary" />
                                        </div>
                                        <div className='flex items-center'>
                                            <span>
                                                <p className='font-poppins text-lg'>23434K</p>
                                                <p className='font-poppins text-lg'>Contestant</p>
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        {/* Other content here */}
                                    </div>
                                </div>
                            </div>
                            {/* Edition */}
                            <div className="h-[100px] mt-4 lg:mt-0 md:mt-0 rounded-lg transition-all duration-200 bg-white shadow-lg dark:bg-slate-800 flex items-center justify-between px-4">
                                <div className='flex '>
                                    <div className='flex gap-4'>
                                        {/* Other content here */}
                                        <div className='bg-primary-50 flex items-center justify-center dark:bg-slate-600 h-[80px] w-[80px] rounded-xl shadow-sm'>
                                            <EditionIcon className="h-10 w-10 text-primary" />
                                        </div>
                                        <div className='flex items-center'>
                                            <span>
                                                <p className='font-poppins text-lg'>23434K</p>
                                                <p className='font-poppins text-lg'>Edition</p>
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        {/* Other content here */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Chart */}
                    {/* Chart */}
                    {loading ? (
                        <div className=' mt-20 gap-10'>
                            {skeletons.slice(0, 1).map((_, index) => (
                                <Skeleton key={index} className="rounded-lg h-[45vh] transition-all duration-200" />
                            ))}
                        </div>
                    ) : (
                        <div className='mt-20 gap-10'>

                            <div className="h-[45vh] mt-4 lg:mt-0 md:mt-0 rounded-lg transition-all duration-200 bg-white shadow-lg dark:bg-slate-800 flex items-center justify-between px-4">

                            </div>
                        </div>
                    )}
                </div>

                {/* Recent events */}
                {/* Recent events */}
                {loading ? (
                    <div className=''>
                        {skeletons.slice(0, 1).map((_, index) => (
                            <Skeleton key={index} className="rounded-lg h-[84vh] transition-all duration-200" />
                        ))}
                    </div>
                ) : (
                    <div className='bg-white h-[84vh] mt-20 lg:mt-0 md:mt-0 dark:bg-slate-800 shadow-lg  w-full rounded-xl'>
                        {/* Additional content or components */}
                        hiusdfih

                    </div>
                )}
            </div>
        </UserLayout>
    );
};

export default Admin;

export const loader:LoaderFunction = async ({request}) => {
    const session= getSession(request.headers.get("Cookie"));
    const token = (await session).get("email")

    if(!token){
        return redirect("/login")
    }

    return true
}
