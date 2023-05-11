'use client';

import { Project } from '@prisma/client/edge';
import { useParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProjectSelectProps {
  projects: Project[];
}

export const ProjectSelect = ({ projects }: ProjectSelectProps) => {
  const { project: projectId } = useParams();

  const selected = projects.find((project) => project.id === projectId);

  return (
    <Select value={selected ? selected.id : undefined}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a project" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Projects</SelectLabel>
          {projects.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              {project.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
