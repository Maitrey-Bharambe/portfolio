import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/hero/Hero";
import TitleLoop from "@/components/hero/TitleLoop";
import IdentityStrip from "@/components/sections/IdentityStrip";
import ProjectsSection from "@/components/projects/ProjectsSection";
import ExperienceLedger from "@/components/experience/ExperienceLedger";
import Toolbox from "@/components/sections/Toolbox";
import Philosophy from "@/components/sections/Philosophy";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/footer/Footer";

// Re-render daily so the footer year stays current on static hosting.
export const revalidate = 86400;

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="absolute left-2 top-2 z-[100] -translate-y-20 border-4 border-ink bg-emphasis px-4 py-2 text-sm font-black uppercase focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <TitleLoop />
        <IdentityStrip />
        <ProjectsSection />
        <ExperienceLedger />
        <Toolbox />
        <Philosophy />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
