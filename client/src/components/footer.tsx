import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="text-secondary bg-[#F7F7F7] py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="relative h-12 w-30">
              <Image
                fill
                src="/logo.svg"
                alt="Pliers Logo"
                className="shrink-0 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <p className="text-secondary/70 text-sm">
              AI-powered home diagnostics connecting homeowners with trusted
              contractors.
            </p>
          </div>

          <div>
            <h4 className="text-secondary mb-4 font-semibold">Product</h4>
            <ul className="text-secondary/70 space-y-2 text-sm">
              <li>
                <Link
                  href="#features"
                  className="hover:text-primary transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="hover:text-primary transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="hover:text-primary transition-colors"
                >
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-secondary mb-4 font-semibold">Company</h4>
            <ul className="text-secondary/70 space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-primary transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-secondary mb-4 font-semibold">Legal</h4>
            <ul className="text-secondary/70 space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="hover:text-primary transition-colors"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-secondary/10 my-8" />

        <div className="text-secondary/60 text-center text-sm">
          All rights reserved. Made with ❤️
          for homeowners and contractors.
          Pliers © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
