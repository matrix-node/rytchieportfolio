import { SocialLinks } from "@/components/social-links";

export function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-surface" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <div className="hero-copy max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-muted/80">
            Full Stack Developer and Cybersecurity Enthusiast
          </p>
          <h1 className="text-5xl font-bold leading-tight text-text sm:text-6xl lg:text-7xl">
            Hi I&apos;m <span className="text-text">Rytchie</span>
          </h1>

          <div className="text-animate mt-4">
            <h2 className="hero-role">Front-End Developer</h2>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Welcome to my portfolio! I&apos;m a passionate Front-End Developer dedicated to creating
            visually appealing and user-friendly web experiences. With a keen eye for detail and a
            commitment to excellence, I strive to bring innovative ideas to life through code.
            Let&apos;s build something amazing together.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary">
              Hire Me
            </a>
            <a href="#contact" className="btn-secondary">
              Let&apos;s Talk
            </a>
          </div>
        </div>

        <div className="hero-sci">
          <SocialLinks />
        </div>

        <div className="home-imgHover" aria-hidden="true" />
      </div>
    </section>
  );
}