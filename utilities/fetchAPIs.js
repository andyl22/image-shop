export function postHTTP(url, body) {
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(`/api${url}`, options).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw Error(res.json().error);
  });
}

export function postNode(url, body) {
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return fetch(`${process.env.API_URI}/api${url}`, options).then(
    (res) => {
      if (res.ok) {
        return res.json();
      }
      throw Error(res.json().error);
    },
  );
}

export function getHTTP(url) {
  const options = {
    method: 'GET',
  };

  return fetch(`/api${url}`, options).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw Error(res.json().error);
  });
}
