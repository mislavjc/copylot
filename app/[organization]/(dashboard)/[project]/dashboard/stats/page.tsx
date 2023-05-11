import { BarChart } from '@/components/charts/Bar';
import { sessionsAndViewsGroupedByWebsiteId } from '@/db/clickhouse';

const StatsPage = async () => {
  const stats = await sessionsAndViewsGroupedByWebsiteId('locahost:3000');

  const data = {
    labels: stats.map((stat) => stat.date),
    datasets: [
      {
        label: 'Sessions',
        data: stats.map((stat) => parseInt(stat.sessions)),
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Views',
        data: stats.map((stat) => parseInt(stat.views)),
        backgroundColor: 'rgb(54, 162, 235)',
      },
    ],
  };

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
      <div>
        <BarChart data={data} />
      </div>
    </div>
  );
};

export default StatsPage;
