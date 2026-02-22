import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionReveal } from "./section-reveal";

const FAQ_ITEMS = [
  {
    question: "What is Anvara?",
    answer:
      "Anvara is a marketplace that connects brands and rights holders to buy and sell sponsorships, events, and real-world media opportunities. Whether you're looking to sponsor a music festival, partner with a sports team, or access unique media placements, Anvara makes it simple to discover, negotiate, and execute deals—all in one platform.",
  },
  {
    question: "How does payment work?",
    answer:
      "Anvara facilitates secure payments between brands and rights holders. Once both parties agree on terms, payments are processed through our platform with built-in escrow protection. We support multiple payment methods and provide detailed invoicing for every transaction.",
  },
  {
    question: "What types of opportunities are available?",
    answer:
      "Our marketplace features a wide range of sponsorship opportunities including sports partnerships, music festivals, food and beverage events, tech conferences, cultural experiences, and more. From title sponsorships to on-site activations, you'll find opportunities that match your brand's audience and budget.",
  },
  {
    question: "Can agencies use Anvara?",
    answer:
      "Absolutely. Anvara is built for agencies managing multiple brand relationships. Our platform lets you browse opportunities, manage campaigns, and track performance across all your clients from a single dashboard. Agency-specific features include multi-brand management and consolidated reporting.",
  },
  {
    question: "Is there support if I need help?",
    answer:
      "Yes. Our team is available via email and our in-platform support chat. Whether you need help finding the right opportunity, negotiating terms, or troubleshooting an issue, we're here to help. Premium accounts also get access to a dedicated account manager.",
  },
  {
    question: "Is Anvara available internationally?",
    answer:
      "Anvara currently focuses on North American opportunities with a growing selection of international listings. We're actively expanding into European, Asian, and Latin American markets. If you have specific international needs, reach out and we'll help you find the right match.",
  },
];

export function FaqSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <SectionReveal>
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              FAQ
            </span>
            <h2 className="text-4xl font-normal tracking-[-0.02em] text-zinc-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Still have questions? Reach out to us via our email or support
              line.
            </p>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger className="text-sm font-medium text-zinc-800 hover:no-underline py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionReveal>
    </section>
  );
}
