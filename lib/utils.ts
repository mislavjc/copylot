import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getGeoData = (request: Request) => {
  return {
    ip: request.headers.get('x-real-ip'),
    region: request.headers.get('x-vercel-ip-country-region'),
    country: request.headers.get('x-vercel-ip-country'),
    city: request.headers.get('x-vercel-ip-city'),
  };
};
