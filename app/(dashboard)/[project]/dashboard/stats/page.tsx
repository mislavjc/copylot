import { LineChart } from '@/components/@charts/line';
import { sessionsAndViewsGroupedByWebsiteId } from '@/db/clickhouse';
import { AppParams } from '@/types/indext';

export const metadata = {
  title: 'Stats',
  description: 'View your stats',
};

interface StatsPageProps extends AppParams {}

const StatsPage = async ({ params }: StatsPageProps) => {
  const stats = await sessionsAndViewsGroupedByWebsiteId(params.project);

  const data = [
    {
      id: 'Sessions',
      data: stats.map((stat) => ({
        y: parseInt(stat.sessions),
        x: stat.date,
      })),
    },
    // {
    //   id: 'Views',
    //   data: stats.map((stat) => ({
    //     y: parseInt(stat.views),
    //     x: stat.date,
    //   })),
    // },
  ];

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
      <div className="w-full h-[500px]">
        <LineChart data={data} />
      </div>
    </div>
  );
};

export default StatsPage;
