import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export default function Documents() {
    return (
        <div>
            <section id="documents" className="w-full py-12 md:py-24 lg:py-32 bg-background">
                <div className=" px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Required Documents</h2>
                            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Prepare these documents before starting your application
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Identification</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Valid passport</li>
                                    <li>Birth certificate</li>
                                    <li>Permanent resident card</li>
                                    <li>Two passport-style photos</li>
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Residency Proof</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Utility bills</li>
                                    <li>Lease agreements</li>
                                    <li>Property tax records</li>
                                    <li>Employment records</li>
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Additional Documents</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Tax returns (last 5 years)</li>
                                    <li>Marriage certificate (if applicable)</li>
                                    <li>Divorce decree (if applicable)</li>
                                    <li>Military service records (if applicable)</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="flex justify-center mt-8">
                        <Link href="/documents/checklist">
                            <Button size="lg" variant="outline">
                                Download Document Checklist
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
