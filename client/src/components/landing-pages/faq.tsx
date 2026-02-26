import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
}

export function FAQ({
  title = "Frequently Asked Questions",
  subtitle = "For Homeowners",
  faqs,
}: FAQProps) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mx-auto mb-2">
            <span className="text-2xl">❓</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-secondary">
            {title}
          </h2>
          <p className="text-secondary/70 text-base">{subtitle}</p>
          <div className="w-20 h-1 bg-primary/20 mx-auto rounded-full" />
        </div>

        {/* FAQs */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-xl border border-secondary/10 hover:border-primary/30 transition-colors data-[state=open]:border-primary/30 data-[state=open]:shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 font-medium hover:no-underline hover:bg-secondary/5 rounded-t-xl transition-colors group">
                <span className="flex items-start gap-3 text-left">
                  <span className="text-primary text-sm font-medium">Q{index + 1}.</span>
                  <span className="flex-1 text-secondary group-hover:text-primary transition-colors">
                    {faq.q}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 pt-2 text-secondary/70 leading-relaxed">
                <div className="flex">
                  <span className="text-primary/50 text-sm font-medium w-6 shrink-0">A.</span>
                  <span className="flex-1">{faq.a}</span>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
