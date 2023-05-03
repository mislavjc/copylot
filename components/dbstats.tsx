import { sessionsAndViewsByWebsiteId } from "@/db/clickhouse";

export const DbStats = async () => {
  const stats = await sessionsAndViewsByWebsiteId();

  return (
    <div>
      <h1 className="text-center">DB STATS</h1>
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
              <tr
                className="p-0 m-0 border-t even:bg-muted"
                key={stat.website_id}
              >
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  {stat.website_id}
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  {stat.sessions}
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  {stat.views}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
