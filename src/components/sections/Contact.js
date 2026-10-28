import { Mail, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import Button from "@/components/ui/Button";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t-4 border-ink bg-signal py-14 md:py-24">
      <div className="wrap">
        <div
          className="border-4 border-ink bg-emphasis p-5 sm:p-8 lg:p-12"
          style={{ boxShadow: "calc(var(--shadow) * 1.7) calc(var(--shadow) * 1.7) 0 var(--dp-color-ink)" }}
        >
          <p className="mono mb-4">06 / Contact</p>
          <h2 id="contact-title" className="display text-[clamp(2rem,7.6vw,6rem)]">
            Got a good problem?
            <br />
            Let&rsquo;s build something.
          </h2>
          <p className="mt-6 max-w-[48ch] text-lg leading-snug">
            For data science, AI engineering, research, and creative software projects, let&rsquo;s talk.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href={`mailto:${profile.email}`} variant="ink">
              <Mail size={18} strokeWidth={3} aria-hidden /> Email me
            </Button>
            {profile.github && (
              <Button href={profile.github} variant="light" external>
                GitHub <ArrowUpRight size={18} strokeWidth={3} aria-hidden />
              </Button>
            )}
            {profile.linkedin && (
              <Button href={profile.linkedin} variant="light" external>
                LinkedIn <ArrowUpRight size={18} strokeWidth={3} aria-hidden />
              </Button>
            )}
          </div>
          <p className="mono mt-6 break-all !normal-case">{profile.email}</p>
        </div>
      </div>
    </section>
  );
}
