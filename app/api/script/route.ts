export const runtime = 'edge';

export const GET = () => {
  return new Response(
    `   
(function () {
  'use strict';

  console.log('testing!!');

  const generateCollectionData = (eventName) => {
    const collectionData = {
      event: {
        event_name: eventName,
        screen_size: window.screen.width + 'x' + window.screen.height,
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

  // Sends analytics data to server
  const sendAnalyticsData = (collectionData) => {
    fetch('/api/collect', {
      method: 'POST',
      body: JSON.stringify(collectionData),
    });
  };

  const sendEventData = (collectionData) => {
    fetch('/api/collect/events', {
      method: 'POST',
      body: JSON.stringify(collectionData),
    });
  };

  // Add event listeners to buttons with data-event attribute
  const buttons = document.querySelectorAll('button[data-event]');

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const eventName = button.dataset.event;

      const collectionData = {
        event: {
          event_name: eventName,
          event_key: button.dataset['event-key'],
          event_value: button.textContent,
        },
        url: window.location.href,
      };

      sendEventData(collectionData);
      console.log('clicked button');
    });
  });

  // Send analytics data when the user navigates to a new page
  const handlePageView = () => {
    const collectionData = generateCollectionData('page_view');
    sendAnalyticsData(collectionData);
  };

  // Watch for router changes using the popstate event
  window.addEventListener('popstate', handlePageView);

  // Send analytics data when the page first loads
  handlePageView();
})();
    `,
    {
      headers: { 'content-type': 'text/javascript' },
    }
  );
};
