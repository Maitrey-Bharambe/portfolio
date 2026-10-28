import Image from "next/image";
import { profile } from "@/data/profile";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark border-t-4 border-ink bg-ink text-ground">
      <div className="wrap flex flex-col gap-3 py-8 md:flex-row md:items-center md:justify-between">
        <p className="flex items-center gap-4">
          <Image src="/images/logo.png" alt="" width={40} height={40} className="h-10 w-10 border-[3px] border-emphasis" />
          <span className="font-black uppercase tracking-tight">{profile.name}</span>
        </p>
        <p className="mono">{profile.tagline}</p>
        <p className="mono">&copy; {year}</p>
      </div>
    </footer>
  );
}
