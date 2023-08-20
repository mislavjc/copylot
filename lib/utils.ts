import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getGeoData = (request: Request) => {
  return {
    ip: request.headers.get('x-real-ip') || '',
    region: request.headers.get('x-vercel-ip-country-region') || '',
    country: request.headers.get('x-vercel-ip-country') || '',
    city: request.headers.get('x-vercel-ip-city') || '',
  };
};

export const getRandomData = <TData>(data: TData[]) => {
  return data[Math.floor(Math.random() * data.length)];
};

export const formatKey = (key: string): string => {
  return key
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
