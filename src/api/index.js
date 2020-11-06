import { httpClient } from './httpClient';
import { spaceXLaunchAPI } from './spaceXLaunchAPI';

const http = httpClient('https://api.spacexdata.com');
export const api = spaceXLaunchAPI(http);
