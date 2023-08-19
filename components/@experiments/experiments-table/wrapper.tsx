'use client';

import { Experiment } from '@prisma/client/edge';

import { DataTable } from 'components/data-table';

import { generateColumns } from './columns';
import { ExperimentDialog } from './dialog';

interface DataTableWrapperProps {
  project: string;
  data: Experiment[];
}

export const DataTableWrapper = ({ project, data }: DataTableWrapperProps) => {
  const columns = generateColumns(project);

  return <DataTable columns={columns} data={data} cta={<ExperimentDialog />} />;
};
