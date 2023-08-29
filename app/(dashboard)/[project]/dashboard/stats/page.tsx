import { Card, CardContent, CardHeader, CardTitle } from 'ui/card';

import { BarChart } from 'components/@charts/bar';
import { CloroplethMap } from 'components/@charts/geo';
import { BrowserList } from 'components/@stats/browser-list';

import { getCountryCode3 } from 'lib/countries';

import {
  sessionsAndViewsGroupedByCountry,
  sessionsAndViewsGroupedByWebsiteId,
  sessionsGroupedByBrowser,
} from 'db/clickhouse';

import { AppParams } from 'types';

export const metadata = {
  title: 'Copylot | Stats',
  description: 'View your stats',
};

interface StatsPageProps extends AppParams {}

const colors = {
  views: '#93c5fd',
  sessions: '#2563eb',
};

export const dynamic = 'force-dynamic';

const StatsPage = async ({ params }: StatsPageProps) => {
  const stats = await sessionsAndViewsGroupedByWebsiteId(params.project);
  const countryStats = await sessionsAndViewsGroupedByCountry(params.project);
  const browserStats = await sessionsGroupedByBrowser(params.project);

  const countryData = countryStats.map((stat) => ({
    countryCode: getCountryCode3(stat.country),
    value: parseInt(stat.sessions),
  }));

  return (
    <div className="flex w-full flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex gap-4">
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
        </CardHeader>
        <CardContent>
          <div className="h-[40vh] w-full">
            <BarChart
              data={stats}
              keys={['sessions', 'views']}
              tooltipKeys={['date', 'sessions', 'views']}
              colors={colors}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex w-full flex-col gap-4 md:flex-row">
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>Locations</CardTitle>
          </CardHeader>
          <CardContent className="h-[40vh] w-full px-8">
            <CloroplethMap data={countryData} />
          </CardContent>
        </Card>

        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>Devices</CardTitle>
          </CardHeader>
          <CardContent className="h-[40vh] w-full px-8">
            <BrowserList data={browserStats} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatsPage;
