import {
  sessionsAndViewsGroupedByCountry,
  sessionsAndViewsGroupedByWebsiteId,
} from 'db/clickhouse';

import { BarChart } from 'components/@charts/bar';
import { CloroplethMap } from 'components/@charts/geo';

import { getCountryCode3 } from 'lib/countries';

import { AppParams } from 'types/indext';

export const metadata = {
  title: 'Copylot | Stats',
  description: 'View your stats',
};

interface StatsPageProps extends AppParams {}

const colors = {
  views: '#007bff',
  sessions: '#ff7f0e',
};

const StatsPage = async ({ params }: StatsPageProps) => {
  const stats = await sessionsAndViewsGroupedByWebsiteId(params.project);
  const countryStats = await sessionsAndViewsGroupedByCountry(params.project);

  const countryData = countryStats.map((stat) => ({
    countryCode: getCountryCode3(stat.country),
    value: parseInt(stat.sessions),
  }));

  return (
    <div className="w-full">
      <div className="my-4 flex gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-500">Sessions</span>
          <span className="text-2xl font-bold">
            {stats.reduce((acc, stat) => acc + parseInt(stat.sessions), 0)}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-500">Views</span>
          <span className="text-2xl font-bold">
            {stats.reduce((acc, stat) => acc + parseInt(stat.views), 0)}
          </span>
        </div>
      </div>
      <div className="h-[50vh] w-full">
        <BarChart data={stats} keys={['sessions', 'views']} colors={colors} />
      </div>
      <div className="h-[50vh] w-full p-8">
        <CloroplethMap data={countryData} />
      </div>
    </div>
  );
};

export default StatsPage;
