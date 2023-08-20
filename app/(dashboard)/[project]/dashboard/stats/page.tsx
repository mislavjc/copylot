import {
  sessionsAndViewsGroupedByCountry,
  sessionsAndViewsGroupedByWebsiteId,
} from 'db/clickhouse';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'ui/card';

import { BarChart } from 'components/@charts/bar';
import { CloroplethMap } from 'components/@charts/geo';

import { getCountryCode3 } from 'lib/countries';

import { AppParams } from 'types/indext';

export const metadata = {
  title: 'Stats',
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
    id: getCountryCode3(stat.country),
    value: parseInt(stat.sessions),
  }));

  const highestCountryCount = Math.max(
    ...countryData.map((country) => country.value),
  );

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
      <div className="flex flex-col gap-4">
        <div className="h-[50vh] w-full">
          <BarChart data={stats} keys={['sessions', 'views']} colors={colors} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Locations</CardTitle>
            <CardDescription>Usage by country</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 w-full">
              <CloroplethMap
                data={countryData}
                highestCountryCount={highestCountryCount}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatsPage;
