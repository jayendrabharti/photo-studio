'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { PortfolioProject } from '@/lib/utils/data-helpers';

interface ProjectCardProps {
  project: PortfolioProject;
  index?: number;
  onClick?: () => void;
}

export default function ProjectCard({ project, index = 0, onClick }: ProjectCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const content = (
    <Card className="relative h-[350px] overflow-hidden group cursor-pointer">
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <Badge className="mb-2">{project.category}</Badge>
          <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
          <p className="text-sm text-white/90 line-clamp-2">{project.description}</p>
          <div className="flex items-center space-x-2 mt-3 text-sm text-white/80">
            <Eye className="h-4 w-4" />
            <span>View Project</span>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {onClick ? (
        <div onClick={handleClick}>{content}</div>
      ) : (
        <Link href={`/portfolio/${project.slug}`}>{content}</Link>
      )}
    </motion.div>
  );
}
