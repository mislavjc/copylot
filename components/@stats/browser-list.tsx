'use client';

import React from 'react';

import { SessionsGroupedByBrowserRow } from 'db/clickhouse';

interface BrowserListProps {
  data: SessionsGroupedByBrowserRow[];
}

export const BrowserList = ({ data }: BrowserListProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <div className="grow font-semibold">Browsers</div>
        <div className="w-16 text-left font-semibold">Sessions</div>
        <div
          className="hidden text-right font-semibold md:block"
          style={{ width: '70px' }}
        >
          %
        </div>
      </div>

      {data.map((item, index) => (
        <div key={index} className="flex">
          <div className="relative flex grow items-center justify-start">
            <div
              style={{ width: `${parseInt(item.percentage, 10)}%` }}
              className="absolute left-0 h-8 bg-blue-100 p-1"
            />
            <span className="z-10 ml-2 text-sm">{item.browser}</span>
          </div>

          <div className="flex w-16 items-center justify-end">
            <span className="text-sm">{item.sessions}</span>
          </div>

          <div className="hidden w-16 items-center justify-end md:flex">
            <span className="text-sm">
              {parseFloat(item.percentage).toFixed(1)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
