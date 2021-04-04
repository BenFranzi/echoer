import fs from 'fs';
import yaml from 'js-yaml';
export default yaml.load(fs.readFileSync('./configuration.yml', 'utf8'));

export const omitting = [
  'host',
  'connection',
  'accept',
  'origin',
  'user-agent',
  'sec-fetch-mode',
  'sec-fetch-site',
  'sec-fetch-dest',
  'referer',
  'accept-encoding',
  'accept-language',
]

export const REQUEST_METHOD = {
  OPTIONS: 'OPTIONS',
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
}

export const requestMethod = {
  [REQUEST_METHOD.OPTIONS]: 'options',
  [REQUEST_METHOD.GET]: 'get',
  [REQUEST_METHOD.POST]: 'post',
  [REQUEST_METHOD.DELETE]: 'delete',
  [REQUEST_METHOD.PUT]: 'put',
}

