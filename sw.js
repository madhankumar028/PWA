//Adding `push` event listener
self.addEventListener('push', (event) => {
  console.info('Event: Push', event);

  const title = 'Push Notification Demo';
  const options = {
    body: 'Yay it works.',
    icon: './images/icons/apple-touch-icon.png',
    badge: './images/icons/apple-touch-icon.png',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

//Adding `notification` click event listener
self.addEventListener('notificationclick', (event) => {
  var url = 'https://madhankumar028.dev/';

  //Listen to custom action buttons in push notification
  if (event.action === 'yes') {
    console.log('I ♥ this app!');
  }
  else if (event.action === 'no') {
    console.warn('I don\'t like this app');
  }

  event.notification.close(); //Close the notification

  //To open the app after clicking notification
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
    .then((clients) => {
      for (var i = 0; i < clients.length; i++) {
        var client = clients[i];
        //If site is opened, focus to the site
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }

      //If site is cannot be opened, open in new window
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
    .catch((error) => {
      console.error(error);
    })
  );
});