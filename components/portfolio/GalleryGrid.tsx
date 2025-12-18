'use client';

import ProjectCard from './ProjectCard';
import { PortfolioProject } from '@/lib/utils/data-helpers';

interface GalleryGridProps {
  projects: PortfolioProject[];
  onProjectClick?: (project: PortfolioProject) => void;
}

export default function GalleryGrid({ projects, onProjectClick }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          onClick={onProjectClick ? () => onProjectClick(project) : undefined}
        />
      ))}
    </div>
  );
}
