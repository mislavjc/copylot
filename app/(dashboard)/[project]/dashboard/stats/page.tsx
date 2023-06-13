import { CloroplethMap } from '@/components/@charts/geo';
import { LineChart } from '@/components/@charts/line';
import { StatsTabs } from '@/components/@stats/stats-tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  sessionsAndViewsGroupedByCountry,
  sessionsAndViewsGroupedByWebsiteId,
} from '@/db/clickhouse';
import { getCountryCode3 } from '@/lib/countries';
import { AppParams } from '@/types/indext';

export const metadata = {
  title: 'Stats',
  description: 'View your stats',
};

interface StatsPageProps extends AppParams {}

const StatsPage = async ({ params }: StatsPageProps) => {
  const stats = await sessionsAndViewsGroupedByWebsiteId(params.project);
  const countryStats = await sessionsAndViewsGroupedByCountry(params.project);

  const sessionData = [
    {
      id: 'Sessions',
      data: stats.map((stat) => ({
        y: parseInt(stat.sessions),
        x: stat.date,
      })),
    },
  ];

  const viewData = [
    {
      id: 'Views',
      data: stats.map((stat) => ({
        y: parseInt(stat.views),
        x: stat.date,
      })),
    },
  ];

  const countryData = countryStats.map((stat) => ({
    id: getCountryCode3(stat.country),
    value: parseInt(stat.sessions),
  }));

  const highestCountryCount = Math.max(
    ...countryData.map((country) => country.value)
  );

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold">Stats</h1>
      <div className="flex gap-4 my-4">
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
        <Card>
          <StatsTabs
            options={[
              {
                label: 'Sessions',
                tab: <LineChart data={sessionData} />,
              },
              {
                label: 'Views',
                tab: <LineChart data={viewData} />,
              },
            ]}
          />
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Locations</CardTitle>
            <CardDescription>Usage by country</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-96">
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
