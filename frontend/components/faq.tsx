import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

export default function Faq() {
  return (
    <div>
      <section id="faq" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How long does the application process take?</AccordionTrigger>
                  <AccordionContent>
                    The typical processing time is 6-12 months from submission to decision, depending on application
                    volume and completeness of your documentation.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What documents do I need to provide?</AccordionTrigger>
                  <AccordionContent>
                    You'll need to provide proof of identity, residence history, tax records, and character references.
                    A detailed checklist will be provided during the application process.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is there an application fee?</AccordionTrigger>
                  <AccordionContent>
                    Yes, there is a non-refundable application fee of $XXX. Payment can be made securely online during
                    the application process.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Can I check my application status?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can track your application status in real-time through your account dashboard after logging
                    in.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>What happens after I submit my application?</AccordionTrigger>
                  <AccordionContent>
                    After submission, your application will be reviewed for completeness. You may be contacted for
                    additional information or to schedule an interview. You'll receive notifications at each stage of
                    the process.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
    </div>
  )
}
