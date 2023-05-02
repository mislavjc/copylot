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

export const generateCollectionData = (eventName: string) => {
  const collectionData = {
    event: {
      event_name: eventName,
      screen_size: `${window.screen.width}x${window.screen.height}`,
      page_title: document.title,
    },
    url: window.location.href,
    referrer: {},
  };

  if (document.referrer) {
    const { hostname, pathname, search } = new URL(document.referrer);

    collectionData.referrer = {
      referrer_domain: hostname,
      referrer_path: pathname,
      referrer_query: search,
    };
  }

  return collectionData;
};
