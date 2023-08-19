(function () {
  'use strict';

  const generateCollectionData = (
    eventName,
    eventKey = null,
    eventValue = null,
  ) => {
    const collectionData = {
      event: {
        event_name: eventName,
        screen_size: `${window.screen.width}x${window.screen.height}`,
        page_title: document.title,
      },
      url: window.location.href,
      referrer: {},
    };

    if (eventKey && eventValue) {
      collectionData.event.event_key = eventKey;
      collectionData.event.event_value = eventValue;
    }

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

  const sendData = (collectionData, endpoint) => {
    fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(collectionData),
    });
  };

  const handleEvent = (eventName, eventKey, eventValue) => {
    const collectionData = generateCollectionData(
      eventName,
      eventKey,
      eventValue,
    );
    sendData(collectionData, '/api/collect/events');
  };

  const handleViewEvent = (element, eventName) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        const variationId = element.dataset.variation;
        const experimentId = element.dataset.experiment;
        handleEvent(eventName, experimentId, variationId);
        observer.unobserve(entry.target);
      });
    });

    observer.observe(element);
  };

  const attachEvents = (selector, eventName, isViewEvent = false) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      if (isViewEvent) {
        handleViewEvent(element, eventName);
      } else {
        element.addEventListener('click', () => {
          const variationId = element.dataset.variation;
          const experimentId = element.dataset.experiment;
          handleEvent(eventName, experimentId, variationId);
        });
      }
    });
  };

  const handlePageView = () => {
    const collectionData = generateCollectionData('page_view');
    sendData(collectionData, '/api/collect');
  };

  // Add event listeners to buttons with data-event attribute
  attachEvents('button[data-variation]', 'experiment_click');

  // Attach view events to elements with A/B test
  attachEvents('[data-variation]', 'experiment_view', true);

  // Watch for router changes using the popstate event
  window.addEventListener('popstate', handlePageView);

  // Send analytics data when the page first loads
  handlePageView();
})();
