import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site-content";

export function ContactSection() {
  return (
    <section id="contact" className="section-shell">
      <SectionHeading prefix="Contact" emphasis="Me!" />

      <form action={siteConfig.formAction} method="POST" className="mx-auto max-w-5xl space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="field-wrap">
            <label className="sr-only" htmlFor="full-name">
              Full Name
            </label>
            <input id="full-name" name="name" type="text" placeholder="Full Name" required className="field-input" />
          </div>

          <div className="field-wrap">
            <label className="sr-only" htmlFor="email-address">
              Email Address
            </label>
            <input id="email-address" name="email" type="email" placeholder="Email Address" required className="field-input" />
          </div>

          <div className="field-wrap">
            <label className="sr-only" htmlFor="mobile-number">
              Mobile Number
            </label>
            <input id="mobile-number" name="phone_number" type="tel" placeholder="Mobile Number" required className="field-input" />
          </div>

          <div className="field-wrap">
            <label className="sr-only" htmlFor="email-subject">
              Email Subject
            </label>
            <input id="email-subject" name="email_subject" type="text" placeholder="Email Subject" className="field-input" />
          </div>
        </div>

        <div className="field-wrap">
          <label className="sr-only" htmlFor="message">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={10}
            placeholder="Your Message"
            required
            className="field-input min-h-56 resize-none"
          />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="btn-primary min-w-40">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}