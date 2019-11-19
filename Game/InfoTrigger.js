import { config } from './config.js';

export default InfoTrigger = (successHandler, failureHandler) => {
  const leancloud_id = config.leancloud_id;
  const leancloud_key = config.leancloud_key;
  const id_prefix = leancloud_id.slice(0,8)
  const production_url = "https:" + id_prefix + ".api.lncldglobal.com/1.1/classes/Game"

  fetch(production_url, {
    headers: {
      'Cache-Control': 'no-cache',
      'X-LC-Id': leancloud_id,
      'X-LC-Key': leancloud_key
    }
  }).then((n) => {
    return n.json()
  }).then((n) => {
    successHandler(n.results[0].flag)
  }).catch(function(t) {
    failureHandler(t)
  })
}
