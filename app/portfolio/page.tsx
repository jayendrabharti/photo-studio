'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GalleryGrid from '@/components/portfolio/GalleryGrid';
import Lightbox from '@/components/portfolio/Lightbox';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllProjects, getProjectsByCategory, getPortfolioCategories, PortfolioProject } from '@/lib/utils/data-helpers';

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const categories = getPortfolioCategories();
  const projects = getProjectsByCategory(selectedCategory);

  const handleProjectClick = (project: PortfolioProject) => {
    setSelectedProject(project);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    // Delay clearing the project to allow exit animation
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of stunning photography across various categories
        </p>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex justify-center mb-12"
      >
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="flex-wrap h-auto">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="px-6">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Projects count */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-sm text-muted-foreground mb-6"
      >
        Showing {projects.length} project{projects.length !== 1 ? 's' : ''}
      </motion.p>

      {/* Gallery Grid */}
      <GalleryGrid projects={projects} onProjectClick={handleProjectClick} />

      {/* Lightbox */}
      <Lightbox
        project={selectedProject}
        isOpen={lightboxOpen}
        onClose={handleCloseLightbox}
      />
    </div>
  );
}
