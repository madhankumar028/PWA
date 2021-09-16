(function () {
  //If serviceWorker supports, then register it.
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register('../sw.js', { scope: "./" }) //setting scope of sw
    .then(function(registration) {
      console.info('Service worker is registered!');
    })
    .catch(function(error) {
      console.error('Service worker failed ', error);
    });
  }
})();
