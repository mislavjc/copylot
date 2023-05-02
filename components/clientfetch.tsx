'use client';

import { useEffect } from 'react';

import { generateCollectionData } from '@/lib/utils';

export const ClientFetch = () => {
  useEffect(() => {
    console.log('client fetch');
    fetch('/api/collect', {
      method: 'POST',
      body: JSON.stringify(generateCollectionData('page_view')),
    });
  }, []);

  return <div>Client</div>;
};
