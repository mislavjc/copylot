'use client';

import { Experiment } from '@prisma/client/edge';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { Button } from 'ui/button';

import { DataTableColumnHeader } from 'components/data-table-column-header';

export const generateColumns = (projectUrl: string) => {
  const columns: ColumnDef<Experiment>[] = [
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
    {
      accessorKey: 'id',
      header: 'Action',
      cell: ({ row }) => {
        const id = row.getValue('id');

        return (
          <Button>
            <Link href={`/${projectUrl}/dashboard/experiments/${id}`}>
              Open
            </Link>
          </Button>
        );
      },
    },
  ];

  return columns;
};
