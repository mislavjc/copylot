'use client';

import { Project } from '@prisma/client/edge';
import Avatar from 'boring-avatars';
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
      <SelectTrigger className="flex items-center gap-2 border-0 font-semibold hover:bg-accent hover:text-accent-foreground">
        <SelectValue placeholder="Select a project" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Projects</SelectLabel>
          {projects.map((project) => (
            <SelectItem key={project.url} value={project.url}>
              <div className="flex items-center gap-2">
                <Avatar size={24} name={project.id} variant="marble" />
                {project.name}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
