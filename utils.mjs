import { omitting } from './configuration.mjs';

function omit(obj, keys) {
  return Object.fromEntries(
      Object.entries(obj)
          .filter(([k]) => !keys.includes(k))
  )
}

export function pick(object, keys) {
  return keys.reduce((obj, key) => {
    if (object && object.hasOwnProperty(key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
}

export function makeKey(req) {
  const {headers, method, body, originalUrl} = req;

  return {
    originalUrl,
    method,
    headers: omit(headers, omitting),
    body
  }
}
