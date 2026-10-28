import Image from "next/image";
import { navItems, profile } from "@/data/profile";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b-4 border-ink bg-ground">
      <div className="wrap relative flex h-14 items-center justify-between gap-4">
        <a href="#top" className="block" aria-label={`${profile.name}, back to top`}>
          <Image src="/images/logo.png" alt="" width={40} height={40} priority className="h-10 w-10 border-[3px] border-ink" />
        </a>

        <div className="flex items-center gap-4">
          {profile.availability && (
            <span className="mono hidden border-2 border-ink bg-field px-2 py-1 lg:inline-block">{profile.availability}</span>
          )}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="block px-3 py-2 text-sm font-black uppercase hover:bg-emphasis hover:underline hover:decoration-[3px] hover:underline-offset-4">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <MobileMenu items={navItems} />
        </div>
      </div>
    </header>
  );
}
