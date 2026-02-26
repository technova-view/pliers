"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = ["Features", "How it works", "Pricing", "Testimonials"];

  return (
    <header className="font-primary sticky top-0 z-50 border-b bg-white">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <div className="relative h-16 w-40">
            <Image
              fill
              src="/logo.svg"
              alt="Pliers Logo"
              className="object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex lg:gap-2">
          {navItems.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-muted-foreground hover:text-primary group relative px-4 py-2 text-sm font-medium transition-colors"
            >
              {item}
              <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <span className="bg-border mx-2 h-6 w-px" aria-hidden="true" />

          <Link
            href="/contractors"
            className="text-primary hover:text-primary/80 hover:bg-primary/5 rounded-md px-4 py-2 text-[0.95rem] font-medium transition-colors"
          >
            Become a Contractor
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary hover:border-primary hidden transition-all duration-300 hover:text-white sm:inline-flex"
            >
              Sign In
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <div
            role="button"
            onClick={toggleMenu}
            className="rounded-lg transition-colors hover:bg-gray-100 md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 shrink-0 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 shrink-0 text-gray-600" />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Left to Right Slide */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="animate-in fade-in fixed inset-0 z-40 bg-black/20 backdrop-blur-sm duration-300 md:hidden"
            onClick={closeMenu}
          />

          {/* Sliding Menu - Increased width with logo */}
          <div className="animate-in slide-in-from-left fixed top-0 left-0 z-50 h-full w-80 bg-white shadow-xl duration-300 sm:w-96 md:hidden">
            {/* Logo at the top - Same size as header */}
            <div className="border-b border-gray-100">
              <div className="flex items-center justify-between px-6 py-4">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="group flex items-center gap-2"
                >
                  <div className="relative h-16 w-40">
                    <Image
                      fill
                      src="/logo.svg"
                      alt="Pliers Logo"
                      className="object-contain"
                    />
                  </div>
                </Link>
                <button
                  onClick={closeMenu}
                  className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            <nav className="flex flex-col gap-1 px-6 py-6">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={closeMenu}
                  className="hover:text-primary hover:bg-primary/5 rounded-lg px-4 py-4 text-base font-medium text-gray-700 transition-colors"
                >
                  {item}
                </Link>
              ))}

              <div className="my-4 border-t border-gray-200" />

              <Link
                href="/contractors"
                onClick={closeMenu}
                className="text-primary hover:text-primary/80 hover:bg-primary/5 rounded-lg px-4 py-4 text-base font-medium transition-colors"
              >
                Become a Contractor
              </Link>

              <Link href="/login" onClick={closeMenu} className="mt-4 px-4">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
