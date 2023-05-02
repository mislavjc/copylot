import { client } from '@/db/clickhouse';

const getDbStats = async () => {
  const resultSet = await client.query({
    query: `SELECT
    website_id,
    COUNT(DISTINCT session_id) AS num_sessions,
    COUNT(*) AS num_views
    FROM
    sessions
    GROUP BY
    website_id
    ORDER BY COUNT(*) DESC`,
    format: 'JSONEachRow',
  });

  return await resultSet.json();
};

interface Stat {
  website_id: string;
  num_sessions: string;
  num_views: string;
}

export const DbStats = async () => {
  const stats = (await getDbStats()) as Stat[];

  return (
    <div>
      <h1 className='text-center'>DB STATS</h1>
      <div className="w-full my-6 overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="p-0 m-0 border-t even:bg-muted">
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                Website
              </th>
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                # of sessions
              </th>
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                # of views
              </th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat) => (
              <tr className="p-0 m-0 border-t even:bg-muted">
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  {stat.website_id}
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  {stat.num_sessions}
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  {stat.num_views}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
