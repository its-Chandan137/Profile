"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import ProjectCard from "@/components/ui/ProjectCard";
import { projectFilters, projects } from "@/data/projects";
import SectionWrapper from "@/components/ui/SectionWrapper";

type Filter = (typeof projectFilters)[number];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.tags.includes(activeFilter));
  }, [activeFilter]);

  return (
    <SectionWrapper id="projects" eyebrow="Projects" title="Things I've Built">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.55 }}
        className="mb-8 flex flex-wrap gap-3"
      >
        {projectFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-300 ${
              activeFilter === filter
                ? "border-cyan bg-cyan text-night shadow-glow"
                : "border-cyan/70 bg-transparent text-cyan hover:bg-cyan/10"
            }`}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      <motion.div layout className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
