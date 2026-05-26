import { socialLinks } from "@/lib/site-content";

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({ className = "" }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`.trim()}>
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={link.label}
          className="social-button"
        >
          <i className={link.iconClass} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}