import Link from 'next/link';

import { Button } from 'ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'ui/card';

interface DashboardCardProps {
  icon: JSX.Element;
  title: string;
  count: number;
  description: string;
  link: string;
  buttonText: string;
}

export const DashboardCard = ({
  icon,
  title,
  count,
  description,
  link,
  buttonText,
}: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-1">
          <div className="text-xl font-semibold">{count}</div>
          <div className="text-base text-gray-500">{description}</div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={link}>
          <Button variant="secondary">{buttonText}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
