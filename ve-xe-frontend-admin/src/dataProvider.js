import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const apiUrl = 'http://localhost:5000/api';
const httpClient = fetchUtils.fetchJson;

const dataProvider = simpleRestProvider(apiUrl, httpClient);

export { dataProvider };