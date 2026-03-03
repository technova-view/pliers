import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto max-w-3xl px-4">
        {/* Header */}
        <div className="mb-12 space-y-3 text-center">
          <h2 className="text-secondary text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="text-secondary/70 text-base">{subtitle}</p>
          <div className="bg-primary/20 mx-auto h-1 w-20 rounded-full" />
        </div>

        {/* FAQs */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-secondary/10 hover:border-primary/30 data-[state=open]:border-primary/30 overflow-visible rounded-xl border bg-white transition-colors last:border-b data-[state=open]:shadow-sm"
            >
              <AccordionTrigger className="hover:bg-secondary/5 group cursor-pointer rounded-t-xl px-6 py-4 font-medium transition-colors hover:no-underline">
                <span className="flex items-start gap-3 text-left">
                  <span className="text-primary text-sm font-medium">
                    Q{index + 1}.
                  </span>
                  <span className="text-secondary group-hover:text-primary flex-1 transition-colors">
                    {faq.q}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-secondary/70 px-6 pt-2 pb-5 leading-relaxed">
                <div className="flex">
                  <span className="text-primary/50 w-6 shrink-0 text-sm font-medium">
                    A.
                  </span>
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
