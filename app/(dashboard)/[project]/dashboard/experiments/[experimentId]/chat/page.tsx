import { Summary } from 'components/@experiments/experiment-summary/summary';
import { getStats } from 'components/@experiments/variation-chart/chart';

import { getMessages } from 'lib/api/messages';

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
  const initialMessages = await getMessages(params.experimentId);

  return (
    <div className="mx-auto max-w-screen-md">
      <Summary
        stats={stats}
        experimentId={params.experimentId}
        initialMessages={initialMessages}
      />
    </div>
  );
};

export default ChatPage;
