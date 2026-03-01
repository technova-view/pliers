import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const navigation = {
  quickLinks: [
    { name: "Start Diagnosis", href: "#" },
    { name: "For Contractors", href: ROUTES.contractors?.() ?? "/contractors" },
    { name: "Features", href: "#features" },
    { name: "FAQ", href: "#faq" },
  ],
  social: [
    {
      name: "Twitter",
      href: "#",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0d1b2a] text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="container mx-auto px-4 py-12 md:py-16 lg:px-8">
        {/* Flexbox container for the three sections */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:w-1/3 space-y-4">
            <Link href="/" className="inline-block" aria-label="PLIERS Home">
              <div className="relative h-12 w-12 bg-white rounded-md overflow-hidden transition-transform hover:scale-105">
                <Image
                  fill
                  src="/logo.svg"
                  alt=""
                  className="object-contain p-2"
                  sizes="48px"
                />
              </div>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              PLIERS is South Africa&apos;s AI-powered home care platform, helping
              homeowners solve problems and connect with trusted contractors.
            </p>

            {/* Social links */}
            <div className="flex space-x-4 pt-4">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white/40 hover:text-white transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:w-1/4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white/80">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3" role="list">
              {navigation.quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white transition-colors text-sm focus:outline-none focus:underline focus:underline-offset-4"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:w-1/4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white/80">
              Contact
            </h3>
            <ul className="mt-4 space-y-3" role="list">
              <li>
                <a
                  href="mailto:hello@pliers.co.za"
                  className="text-white/60 hover:text-white transition-colors text-sm focus:outline-none focus:underline focus:underline-offset-4"
                >
                  hello@pliers.co.za
                </a>
              </li>
              <li>
                <address className="text-white/60 text-sm not-italic">
                  123 Main Street<br />
                  Cape Town, 8001<br />
                  South Africa
                </address>
              </li>
              <li>
                <a
                  href="tel:+27211234567"
                  className="text-white/60 hover:text-white transition-colors text-sm focus:outline-none focus:underline focus:underline-offset-4"
                >
                  +27 (0)21 123 4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 md:flex md:items-center md:justify-between">
          <p className="text-sm text-white/40 text-center md:text-left">
            &copy; {currentYear} PLIERS. All rights reserved.
          </p>

          <div className="mt-4 md:mt-0">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-xs text-white/40 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-xs text-white/40 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-xs text-white/40 hover:text-white transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
