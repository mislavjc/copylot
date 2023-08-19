'use client';

import { Project } from '@prisma/client/edge';
import { useParams, useRouter } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'ui/select';

interface ProjectSelectProps {
  projects: Project[];
}

export const ProjectSelect = ({ projects }: ProjectSelectProps) => {
  const { project: projectUrl } = useParams();
  const router = useRouter();

  const selected = projects.find((project) => project.url === projectUrl);

  return (
    <Select
      value={selected?.url}
      onValueChange={(value) => {
        router.push(`/${value}/dashboard`);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a project" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Projects</SelectLabel>
          {projects.map((project) => (
            <SelectItem key={project.url} value={project.url}>
              {project.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
