import Image from "next/image";

import { SectionHeading } from "@/components/section-heading";

export function AboutSection() {
  return (
    <section id="about" className="section-shell section-surface-alt">
      <SectionHeading prefix="About" emphasis="Me" />

      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        <div className="about-avatar-shell">
          <div className="about-avatar-ring" aria-hidden="true" />
          <Image
            src="/images/about.jpg"
            alt="Rytchie Macharia portrait"
            fill
            priority={false}
            sizes="(max-width: 1024px) 18rem, 25rem"
            className="rounded-full object-cover"
          />
        </div>

        <div className="text-center lg:text-left">
          <h3 className="text-3xl font-semibold text-text sm:text-4xl">Frontend Developer!</h3>
          <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
            I&apos;m a Front-End Developer skilled in creating clean and effective websites. I focus
            on designing user-friendly interfaces and ensuring a great experience on all devices.
            Explore my work to see how I can help bring your project to life.
          </p>

          <div className="mt-10 flex justify-center lg:justify-start">
            <a href="#education" className="btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}