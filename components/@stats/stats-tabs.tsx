import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface StatsTabsProps {
  options: Array<{
    label: string;
    tab: React.ReactNode;
  }>;
}

export const StatsTabs = ({ options }: StatsTabsProps) => {
  return (
    <Tabs defaultValue={options[0]?.label}>
      <TabsList className={cn('grid w-full', `grid-cols-${options.length}`)}>
        {options.map((option) => (
          <TabsTrigger value={option.label} key={option.label}>
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {options.map((option) => (
        <TabsContent value={option.label} key={option.label}>
          <div className="h-[600px]">{option.tab}</div>
        </TabsContent>
      ))}
    </Tabs>
  );
};
