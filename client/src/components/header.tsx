import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="border-b sticky top-0 z-50 bg-white font-primary">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group ">
          <div className="relative w-40 h-16">
            <Image
              fill
              src="/logo.svg"
              alt="Pliers Logo"
              className="object-contain group-hover:scale-110 transition-transform duration-300 shrink-0 "
            />
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {['Features', 'How it works', 'Pricing', 'Testimonials'].map((item) => (
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
            <Button variant="ghost" className="hidden sm:inline-flex hover:bg-primary/10">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
