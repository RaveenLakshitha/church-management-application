"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import birdImage2 from "@/assets/bird2.png";
import birdImage3 from "@/assets/bird3.png";

export const FAQsAndContact = () => {
    const faqItems = [
        {
            id: 'item-1',
            question: 'How does the expense management system work?',
            answer: 'Our expense management system allows you to easily track, categorize, and report on all church expenses. Simply add transactions with details like date, amount, category, and description. Generate customizable reports for transparency and financial oversight.',
        },
        {
            id: 'item-2',
            question: 'What categories can I use for expenses?',
            answer: 'We provide predefined categories like utilities, supplies, salaries, events, and donations. You can also create custom categories to match your church\'s specific needs, ensuring accurate tracking and budgeting.',
        },
        {
            id: 'item-3',
            question: 'Can multiple users access the expense tracking features?',
            answer: 'Yes, depending on your plan, multiple administrators and finance team members can access and manage expenses. Role-based permissions ensure secure and controlled access to sensitive financial data.',
        },
        {
            id: 'item-4',
            question: 'How do I generate financial reports?',
            answer: 'From the dashboard, select the report type (e.g., monthly summary, category breakdown) and date range. Export reports as PDF or CSV for easy sharing with church leaders or auditors.',
        },
        {
            id: 'item-5',
            question: 'Is my financial data secure?',
            answer: 'Absolutely. We use enterprise-grade encryption, secure cloud storage, and compliance with GDPR and church-specific privacy standards to protect your financial information. Regular backups and access logs are included.',
        },
    ];

    // Refs for animations
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: false, amount: 0.3 });

    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });

    // Animation transformations for bird images
    const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
    const translateXLeft = useTransform(scrollYProgress, [0, 1], [0, 100]); // Bird 2 moves right
    const translateXRight = useTransform(scrollYProgress, [0, 1], [0, -100]); // Bird 3 moves left
    const rotateLeft = useTransform(scrollYProgress, [0, 1], [0, 15]); // Bird 2 tilts slightly
    const rotateRight = useTransform(scrollYProgress, [0, 1], [0, -15]); // Bird 3 tilts slightly
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]); // Both birds scale up slightly

    return (
        <section ref={sectionRef} id="FAQsAndContact" className="py-16 md:py-24 bg-gradient-to-b from-white to-[#dcfeff] relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10">
                {/* Background Images */}
                <motion.img
                    src={birdImage2.src}
                    alt="Bird 2"
                    className="absolute top-0 -left-[450px] w-[250px] md:w-[400px] lg:w-[700px] opacity-40 pointer-events-none object-contain"
                    initial={{ opacity: 0, x: -50 }}
                    animate={headerInView ? { opacity: 0.4, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 0.8 }}
                    style={{ translateY, translateX: translateXLeft, rotate: rotateLeft, scale }}
                />
                <motion.img
                    src={birdImage3.src}
                    alt="Bird 3"
                    className="absolute top-0 -right-[360px] w-[250px] md:w-[400px] lg:w-[700px] opacity-40 pointer-events-none object-contain scale-x-[-1]"
                    initial={{ opacity: 0, x: 50 }}
                    animate={headerInView ? { opacity: 0.4, x: 0 } : { opacity: 0, x: 50 }}
                    transition={{ duration: 0.8 }}
                    style={{ translateY, translateX: translateXRight, rotate: rotateRight, scale }}
                />

                {/* Header */}
                <div ref={headerRef} className="mx-auto max-w-3xl text-center mb-16">
                    <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl text-gray-900">
                        Frequently Asked Questions & Contact
                    </h2>
                    <p className="text-gray-600 mt-4 text-balance">
                        Find answers to common questions about our expense management features or get in touch with our support team for personalized assistance.
                    </p>
                </div>

                {/* Side by side layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* FAQ Section */}
                    <div className="w-full">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-2 text-gray-900">
                                Frequently Asked Questions
                            </h3>
                            <p className="text-gray-600">
                                Discover quick and comprehensive answers to common questions about our expense management platform, services, and features.
                            </p>
                        </div>

                        <Accordion
                            type="single"
                            collapsible
                            className="bg-gray-200 w-full rounded-2xl p-1">
                            {faqItems.map((item) => (
                                <div className="group" key={item.id}>
                                    <AccordionItem
                                        value={item.id}
                                        className="data-[state=open]:bg-white peer rounded-xl border-none px-7 py-1 data-[state=open]:border-none data-[state=open]:shadow-sm">
                                        <AccordionTrigger className="cursor-pointer text-base hover:no-underline text-gray-900">
                                            {item.question}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p className="text-base text-gray-700">{item.answer}</p>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <hr className="mx-7 border-dashed border-gray-300 group-last:hidden peer-data-[state=open]:opacity-0" />
                                </div>
                            ))}
                        </Accordion>

                        <p className="text-gray-600 mt-6 px-8">
                            Can't find what you're looking for? Contact our{' '}
                            <Link
                                href="#contact-form"
                                className="text-blue-600 font-medium hover:underline">
                                support team
                            </Link>
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="w-full">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-2 text-gray-900">
                                Contact Us
                            </h3>
                        </div>

                        <Card className="p-6 shadow-md lg:p-8 bg-white border-gray-200">
                            <div className="mb-8">
                                <h4 className="text-xl font-semibold text-gray-900">
                                    Let's get you set up
                                </h4>
                                <p className="mt-2 text-sm text-gray-600">
                                    Reach out to our support team! We're eager to learn more about how you plan to use our expense management application.
                                </p>
                            </div>

                            <form className="space-y-6" id="contact-form">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-gray-900">Full name</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        required
                                        className="border-gray-300 focus:border-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-900">Work Email</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        required
                                        className="border-gray-300 focus:border-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="msg" className="text-gray-900">Message</Label>
                                    <Textarea
                                        id="msg"
                                        rows={3}
                                        className="border-gray-300 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Submit</Button>
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};