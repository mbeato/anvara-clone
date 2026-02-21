import { SectionReveal } from "./section-reveal";

export function Testimonial() {
  return (
    <section className="py-12 px-4 bg-white">
      <SectionReveal>
        <div className="max-w-3xl mx-auto border-y border-zinc-200 py-10">
          <blockquote className="text-center">
            <p className="text-base italic text-muted-foreground leading-relaxed">
              &ldquo;It&rsquo;s like having a full-service agency available 24/7
              that responds instantly and isn&rsquo;t biased&mdash;but 100x
              smarter.&rdquo;
            </p>
            <footer className="mt-4 text-sm text-zinc-500">
              &mdash; Edan Mayron, GoPuff
            </footer>
          </blockquote>
        </div>
      </SectionReveal>
    </section>
  );
}
