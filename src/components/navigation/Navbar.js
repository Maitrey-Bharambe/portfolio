import { navItems, profile } from "@/data/profile";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b-4 border-ink bg-ground">
      <div className="wrap relative flex h-14 items-center justify-between gap-4">
        <a href="#top" className="bg-ink px-3 py-1 text-xl font-black tracking-tight text-emphasis" aria-label={`${profile.name}, back to top`}>
          {profile.brand}
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
