import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getProjects } from '@/lib/projects';

export const ProjectsTable = async () => {
  const projects = await getProjects();

  return (
    <Table className="border rounded">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>URL</TableHead>
          <TableHead className="text-right">URL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="font-medium">{project.name}</TableCell>
            <TableCell>{project.url}</TableCell>
            <TableCell className="text-right">
              {new Date(project.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <Button size="sm">
                <Link href={`/${project.url}/dashboard`}>View</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
