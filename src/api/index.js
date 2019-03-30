import axios from 'axios';

/**
 * Stringify query params
 */
let querProp = {
  stringifyQueryParams(params) {
    return Object.keys(params)
      .reduce((all, key) => {
        if (params[key] !== null && params[key] !== '') {
          if (Array.isArray(params[key])) {
            const temp = JSON.stringify(params[key]);
            all.push(`${key}=${temp}`);
          } else {
            all.push(`${key}=${params[key]}`);
          }
        }
        return all;
      }, [])
      .join('&');
  }
};

export const searchBook = (params, type) => {
  let url =
    type === 'bname'
      ? 'http://openlibrary.org/search.json'
      : 'https://openlibrary.org/api/books';
  const queryParams = querProp.stringifyQueryParams(params);
  url = `${url}?${queryParams}`;
  return axios.get(url);
};
