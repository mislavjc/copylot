'use client';

import { Experiment } from '@prisma/client/edge';
import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/data-table-column-header';

export const columns: ColumnDef<Experiment>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last updated" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('updatedAt'));
      const formatted = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      return formatted;
    },
  },
];
