module.exports = {
  /*
  * Compares the speeds of the fetch method and the setTimeout promise,
  * and returns the promise that is resolved or rejected first
  */
  fetchWithTimeout: (url, timeout) => {
    return Promise.race([
      fetch(url),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), timeout)
      )
    ])
  },
  /*
  * Handles API call errors
  * 1. First conditional block handles any sort of response code outside of 2xx range
  * 2. Second conditional block handles a client-side request error
  * 3. Else block handles any other errors
  */
  requestErrorHandler: (error) => {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log(error.message);
    }
  }
}