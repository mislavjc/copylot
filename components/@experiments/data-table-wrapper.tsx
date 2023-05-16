'use client';

import { Experiment } from '@prisma/client/edge';

import { generateColumns } from './columns';
import { DataTable } from './data-table';

interface DataTableWrapperProps {
  project: string;
  data: Experiment[];
}

export const DataTableWrapper = ({ project, data }: DataTableWrapperProps) => {
  const columns = generateColumns(project);

  return <DataTable columns={columns} data={data} />;
};
