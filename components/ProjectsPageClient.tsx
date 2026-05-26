"use client";

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import ProjectsGrid from '@/components/ProjectsGrid';
import ProjectDrawer from '@/components/ProjectDrawer';
import type { Project } from '@/types';

export default function ProjectsPageClient() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <ProjectsGrid onSelectProject={(project) => setSelectedProject(project)} />
      <AnimatePresence>
        {selectedProject && <ProjectDrawer project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </>
  );
}
