import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-6">
            <div className="text-center max-w-lg">
                <p className="text-5xl md:text-9xl  font-bold text-orange-500 opacity-20">404</p>

                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-500 sm:text-5xl">
                    Page not found
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600 "> 
                    Sorry, we couldn’t find the page you’re looking for.Lets get you back on track.
                </p>

                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link href={'/'} className="rounded-md bg-red-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                        Go back home
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default NotFoundPage;