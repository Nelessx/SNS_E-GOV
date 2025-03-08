import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

export default function Navbar() {
    return (
        <div className=' px-6 border-b py-4 flex justify-between items-center sticky top-0 z-50 bg-white/15 backdrop-blur-md'>
            <div className='flex  gap-2'>
                <p>logo</p>
                <p>SNS</p>
            </div>
            <div className='hidden md:flex gap-6'>
                <Link href="/" className="text-sm font-medium">
                    Home
                </Link>
                <Link href="#eligibility" className="text-sm font-medium">
                    Eligibility
                </Link>
                <Link href="#process" className="text-sm font-medium">
                    Process
                </Link>
                <Link href="#faq" className="text-sm font-medium">
                    FAQ
                </Link>
                <Link href="#contact" className="text-sm font-medium">
                    Contact
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <Link href="/auth/login">
                    <Button variant="outline">Log in</Button>
                </Link>
                <Link href="/auth/register">
                    <Button>Register</Button>
                </Link>
            </div>
        </div>
    )
}
