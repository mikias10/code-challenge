import axios from 'axios';

export const FETCH_DATA = 'FETCH_DATA';
const ROOT_URL = 'https://gist.githubusercontent.com/espinet/922527b7ea1606127f7dba413a911937/raw/245370f480934a50eb3fa68891fc9476cce894e2/secondary-levels.json';

export function fetchData() {
  const url = `${ROOT_URL}`;
  const request = axios.get(url);

  return {
    type: FETCH_DATA,
    payload: request
  };
}
