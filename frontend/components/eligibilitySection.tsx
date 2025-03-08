import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

export default function EligibilitySection() {
    return (
        <div>
            <section id="eligibility" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-indigo-50 ">
                <div className=" px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Eligibility Requirements
                            </h2>
                            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Check if you meet the basic requirements for citizenship
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Residency Requirements</CardTitle>
                                <CardDescription>Minimum period of legal residency</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Continuous residence for at least 5 years</li>
                                    <li>Physical presence for at least 30 months</li>
                                    <li>Residence in current state for at least 3 months</li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Link href="/eligibility/residency">
                                    <Button variant="outline" size="sm">
                                        Learn more
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Requirements</CardTitle>
                                <CardDescription>Personal qualifications for citizenship</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>At least 18 years of age</li>
                                    <li>Good moral character</li>
                                    <li>Basic knowledge of government and history</li>
                                    <li>Ability to read, write, and speak English</li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Link href="/eligibility/personal">
                                    <Button variant="outline" size="sm">
                                        Learn more
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="flex justify-center mt-8">
                        <Link href="/eligibility/check">
                            <Button size="lg">Check Your Eligibility</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
