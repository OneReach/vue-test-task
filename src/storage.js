import { to_json, from_json } from './utils';

const $storage = localStorage;

const _get = key   => from_json($storage.getItem($storage.key(key)));
const _set = (key, value) => $storage.setItem(key, to_json(value));

export default {
  $db: $storage,
  get: _get,
  set: _set
}
