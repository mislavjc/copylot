import { Summary } from 'components/@experiments/experiment-summary/summary';
import { getStats } from 'components/@experiments/variation-chart/chart';

import { AppParams } from 'types';

export const metadata = {
  title: 'Copylot | Experiment',
  description: 'Manage your experiment',
};

interface ChatPageProps extends AppParams {
  params: AppParams['params'] & { experimentId: string };
}

const ChatPage = async ({ params }: ChatPageProps) => {
  const stats = await getStats(params.experimentId);

  return (
    <div className="mx-auto max-w-screen-md">
      <Summary stats={stats} />
    </div>
  );
};

export default ChatPage;
