import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

export default function CtaSection() {
    return (
        <div>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
                <div className=" px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Ready to Begin Your Citizenship Journey?
                            </h2>
                            <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Start your application today and take the first step toward becoming a citizen
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Link href="/auth/register">
                                <Button size="lg" variant="secondary" className="gap-1 cursor-pointer">
                                    Start Application <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
