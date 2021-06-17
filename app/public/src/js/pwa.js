// ####################################################
// ########### REGISTER THE WORKER ###################
// ###################################################

// let the browser know about our worker

document.addEventListener('DOMContentLoaded', init, false);
function init() {
  if ('serviceWorker' in navigator) {

    // CHECK WHETHER THE BROWSER IS SUPPORTED
    navigator.serviceWorker.register('src/js/service-worker.js')
      .then((reg) => {

        // browser supported
        console.log('Service worker registered -->', reg);
      }, (err) => {

        // browser not supported
        console.error('Service worker not registered -->', err);
      });
  }
}