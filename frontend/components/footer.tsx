import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <div>
            <footer className="w-full border-t bg-gradient-to-r from-blue-50 to-indigo-50 py-6 md:py-12">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium">About</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="/about" className="text-muted-foreground hover:text-foreground">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about/mission" className="text-muted-foreground hover:text-foreground">
                                        Our Mission
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about/team" className="text-muted-foreground hover:text-foreground">
                                        Our Team
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium">Resources</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="/resources/guides" className="text-muted-foreground hover:text-foreground">
                                        Guides
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/resources/forms" className="text-muted-foreground hover:text-foreground">
                                        Forms
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/resources/glossary" className="text-muted-foreground hover:text-foreground">
                                        Glossary
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium">Support</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="/help/faq" className="text-muted-foreground hover:text-foreground">
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/help/contact" className="text-muted-foreground hover:text-foreground">
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/help/tutorials" className="text-muted-foreground hover:text-foreground">
                                        Tutorials
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="/legal/terms" className="text-muted-foreground hover:text-foreground">
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/legal/privacy" className="text-muted-foreground hover:text-foreground">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/legal/accessibility" className="text-muted-foreground hover:text-foreground">
                                        Accessibility
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-muted-foreground">© 2025 SNS. All rights reserved.</p>
                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                </svg>
                                <span className="sr-only">Twitter</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
