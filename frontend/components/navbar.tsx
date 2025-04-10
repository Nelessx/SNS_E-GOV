"use client"

import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

export default function Navbar() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className='px-6 border-b py-4 flex justify-between items-center sticky top-0 z-50 bg-white/30 backdrop-blur-md'>
            <a href="/" className="flex gap-2 items-center">
                <div className="flex justify-center">
                    <Image
                        src="/snslogo3.png"
                        alt="Citizenship Application"
                        width={40}
                        height={40}
                        className="rounded-lg shadow-lg"
                    />
                </div>
                <p className='text-sm font-semibold'>Sajilo Nagarik Sewa</p>
            </a>

            <div className='hidden md:flex gap-6'>
                <button onClick={() => scrollToSection("home")} className="text-md font-medium cursor-pointer">
                    Home
                </button>
                <button onClick={() => scrollToSection("eligibility")} className="text-md font-medium cursor-pointer">
                    Eligibility
                </button>
                <button onClick={() => scrollToSection("documents")} className="text-md font-medium cursor-pointer">
                    Documents
                </button>
                <button onClick={() => scrollToSection("process")} className="text-md font-medium cursor-pointer">
                    Process
                </button>
                <button onClick={() => scrollToSection("faq")} className="text-md font-medium cursor-pointer">
                    FAQ
                </button>
                <button onClick={() => scrollToSection("contact")} className="text-md font-medium cursor-pointer">
                    Contact
                </button>
            </div>

            <div className="flex items-center gap-4">
                <a href="/auth/login">
                    <Button variant="outline" className='cursor-pointer'>Log in</Button>
                </a>
                <a href="/auth/register">
                    <Button className='cursor-pointer'>Register</Button>
                </a>
            </div>
        </div>
    );
}
