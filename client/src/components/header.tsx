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

  const navItems = ['Features', 'How it works', 'Pricing', 'Testimonials'];

  return (
    <header className="border-b sticky top-0 z-50 bg-white font-primary">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-40 h-16">
            <Image
              fill
              src="/logo.svg"
              alt="Pliers Logo"
              className="object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
          <span className="w-px h-6 bg-border mx-2" aria-hidden="true" />

          <Link
            href="/contractors"
            className="px-4 py-2 text-[0.95rem] font-medium text-primary hover:text-primary/80 transition-colors rounded-md hover:bg-primary/5"
          >
            Become a Contractor
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {/* <ThemeToggle /> */}
          <Link href="/login">
            <Button
              variant="outline"
              className="hidden sm:inline-flex border-primary/30 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            >
              Sign In
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu - Left to Right Slide */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300"
            onClick={closeMenu}
          />

          {/* Sliding Menu - Increased width with logo */}
          <div className="fixed left-0 top-0 h-full w-80 sm:w-96 bg-white z-50 md:hidden shadow-xl animate-in slide-in-from-left duration-300">
            {/* Logo at the top - Same size as header */}
            <div className="border-b border-gray-100">
              <div className="flex items-center justify-between px-6 py-4">
                <Link href="/" onClick={closeMenu} className="flex items-center gap-2 group">
                  <div className="relative w-40 h-16">
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
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            <nav className="px-6 py-6 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={closeMenu}
                  className="px-4 py-4 text-base font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                >
                  {item}
                </Link>
              ))}

              <div className="border-t border-gray-200 my-4" />

              <Link
                href="/contractors"
                onClick={closeMenu}
                className="px-4 py-4 text-base font-medium text-primary hover:text-primary/80 hover:bg-primary/5 rounded-lg transition-colors"
              >
                Become a Contractor
              </Link>

              <Link href="/login" onClick={closeMenu} className="mt-4 px-4">
                <Button
                  variant="outline"
                  className="w-full border-primary/30 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 py-6 text-base"
                >
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
