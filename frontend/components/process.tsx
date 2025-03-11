import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

export default function Process() {
    return (
        <div>
            <section id="process" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-indigo-50 ">
                <div className=" px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Application Process</h2>
                            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Our streamlined process makes applying for citizenship simple
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto max-w-5xl mt-12">
                        <div className="space-y-2">
                            {[
                                {
                                    step: 1,
                                    title: "Eligibility Check",
                                    description: "Complete a questionnaire to determine your eligibility for citizenship",
                                },
                                {
                                    step: 2,
                                    title: "Personal Information",
                                    description: "Provide your biographical data, contact information, and family details",
                                },
                                {
                                    step: 3,
                                    title: "Residential & Employment History",
                                    description: "Enter your address history and employment/education background",
                                },
                                {
                                    step: 4,
                                    title: "Document Upload",
                                    description: "Upload all required documents to support your application",
                                },
                                {
                                    step: 5,
                                    title: "Review & Submit",
                                    description: "Review your application, make any necessary edits, and submit",
                                },
                                {
                                    step: 6,
                                    title: "Track Progress",
                                    description: "Monitor your application status and respond to any requests",
                                },
                            ].map((item) => (
                                <div key={item.step} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background text-primary font-bold">
                                            {item.step}
                                        </div>
                                        {item.step < 6 && <div className="h-16 w-0.5 bg-border mt-2"></div>}
                                    </div>
                                    <div className="space-y-4 pb-8">
                                        <h3 className="text-xl font-bold">{item.title}</h3>
                                        <p className="text-muted-foreground">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center mt-8">
                        <a href="/form">
                            <Button size="lg" className='cursor-pointer'>Begin Your Application</Button>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
