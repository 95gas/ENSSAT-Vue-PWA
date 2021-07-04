// ####################################################
// ########### REGISTER THE WORKER ###################
// ###################################################

// let the browser know about our worker

import { register } from 'register-service-worker'

// For avoiding problem in the building process, not set a name different from 'service-worker' for the service worker file
// This because in the building process a new service worker will be generated with the name 'service-worker'.
// Hence, setting a different name for the service worker file will cause a no-registration of it after the building process since the file won't be found

register(`/service-worker.js`, { // IMPO: the current path is referred to the public folder by default! 
  ready() {
    console.log(
      'App is being served from cache by a service worker.\n' +
      'For more details, visit https://goo.gl/AFskqB'
    )
  },
  registered() {
    console.log('Service worker has been registered.')
  },
  cached() {
    console.log('Content has been cached for offline use.')
  },
  updatefound() {
    console.log('New content is downloading.')
  },
  updated() {
    console.log('New content is available; please refresh.')
  },
  offline() {
    console.log('No internet connection found. App is running in offline mode.')
  },
  error(error) {
    console.error('Error during service worker registration:', error)
  }
})