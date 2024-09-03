
document.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);

      document.getElementById('subscribe-button').addEventListener('click', () => {
        subscribeUser(registration);
      });
    }).catch(error => {
      console.error('Service Worker registration failed:', error);
    });
  } else {
    console.warn('Push messaging is not supported');
  }
});
