import URL from 'url-parse'
import {History} from './../config'

export function isSafeRedirect (path) {
  if (path === undefined) {
    return false
  } else {
    const url = new URL(path)
    const location = History.location
    const myUrl = new URL(location)
    return url.host === myUrl.host
  }
}

export function parseQueryString (queryString) {
  var query = {}
  var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&')
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=')
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
  }
  return query
}
