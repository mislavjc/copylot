import { BarChart } from 'components/@charts/bar';

export const metadata = {
  title: 'Dashboard',
  description: 'Manage your project',
};

const Dashboard = () => {
  return (
    <div>
      <div className="h-[50vh] w-full">
        <BarChart data={data} keys={['sessions', 'views']} colors={colors} />
      </div>
    </div>
  );
};

export default Dashboard;

const data = [
  { date: '2023-08-01', views: 15, sessions: 5 },
  { date: '2023-08-02', views: 30, sessions: 8 },
  { date: '2023-08-03', views: 40, sessions: 12 },
  { date: '2023-08-04', views: 20, sessions: 7 },
  { date: '2023-08-05', views: 25, sessions: 6 },
];

const colors = {
  views: '#007bff',
  sessions: '#ff7f0e',
};
