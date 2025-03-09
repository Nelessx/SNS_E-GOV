import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { CheckCircle, Clock, HelpCircle } from 'lucide-react'

export default function HeroSection() {
    return (
        <div id='home'>


            <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 md:py-24">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Apply for Citizenship Online</h1>
                        <p className="text-lg text-gray-600">
                            A simple, secure, and efficient way to submit your citizenship application from anywhere, anytime.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="#">
                                <Button size="lg" className="w-full sm:w-auto cursor-pointer">
                                    Start Application
                                </Button>
                            </Link>
                            <Link href="#eligibility">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto cursor-pointer">
                                    Check Eligibility
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Image
                            src="/mountain.jpg"
                            alt="Citizenship Application"
                            width={500}
                            height={400}
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </section>


            {/* Key Features */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
                <div className=" px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Simplified Citizenship Process
                            </h2>
                            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Our platform guides you through every step of the citizenship application process
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <CheckCircle className="h-8 w-8 text-primary" />
                                <CardTitle>Easy to Use</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Step-by-step guidance with clear instructions at every stage of your application
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Clock className="h-8 w-8 text-primary" />
                                <CardTitle>Time Saving</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Complete your application online without waiting in lines or scheduling appointments
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <HelpCircle className="h-8 w-8 text-primary" />
                                <CardTitle>24/7 Support</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Access to comprehensive help resources and support whenever you need it
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>








            {/* <div>
                <p>Apply for Citizenship Online</p>
                <p>A simple, secure, and efficient way to submit your citizenship application from anywhere, anytime.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/apply">
                        <Button size="lg" className="w-full sm:w-auto">
                            Start Application
                        </Button>
                    </Link>
                    <Link href="#eligibility">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto">
                            Check Eligibility
                        </Button>
                    </Link>
                </div>
            </div> */}

        </div>
    )
}
