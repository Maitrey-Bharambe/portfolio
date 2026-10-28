import { projects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="sec-pad">
      <div className="wrap">
        <SectionHeading
          id="work-title"
          eyebrow="01 / Work"
          title="Selected work."
          sub="Systems built / Models tested / Ideas shipped"
        />
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
