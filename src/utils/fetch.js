import 'isomorphic-fetch';

function fetchHelper({ url, method, headers, body }) {
  const options = {
    method,
    headers: requestHeaders(headers),
    body: method !== 'GET' ? JSON.stringify(body) : null,
  };

  return fetch(url, options)
    .then(res => parseStatus(res.status, res.json()));
}

function parseStatus(status, res) {
  return new Promise((resolve, reject) => {
    if (status >= 200 && status < 300) {
      res.then(response => resolve(response));
    } else {
      res.then(
        (response) => reject({ status, response }),
        (error) => reject({ status, error }),
      );
    }
  });
}

function requestHeaders(headers) {
  return {
    Accept: 'application/json',
    ...headers,
  };
}

export default fetchHelper;