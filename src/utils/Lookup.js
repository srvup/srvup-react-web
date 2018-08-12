import createHistory from 'history/createBrowserHistory'

const History = createHistory()

import {
    API_ENDPOINT,
    API_PUBLIC_KEY
} from '../config'

function checkResponseStatus (response) {
  const location = History.location
  let status = response.status
  if (status === 401) {
    History.push({
      pathname: '/login',
      search: `?next=${location.pathname}`
    })
  } else if (status === 403) {

    History.push({
      pathname: '/login',
      search: `?next=${location.pathname}`
    })
  }
}


class LookupClass {
  constructor (path, endpoint = null) {
    this.path = path
    if (endpoint) {
      this.endpoint = endpoint
    } else {
      this.endpoint = `${API_ENDPOINT}${this.path}`
    }

    this.token = window.localStorage.getItem('token')
  }


  getOptions = (method, data = {}, includeAuth = true) => {
    let lookupOptions = {
      headers: {
        'Content-Type': 'application/json',
        'x-srvup-signature': `${API_PUBLIC_KEY}`
      },
      method: method

    }
    if (this.token && includeAuth) {
      lookupOptions['headers']['Authorization'] = `JWT ${this.token}`
    }
    if (Object.keys(data).length > 0) {
      lookupOptions['body'] = JSON.stringify(data)
    }
    return lookupOptions
  }

  get = (callback, includeAuth = true) => {
    const options = this.getOptions('get', {}, includeAuth)
    let status = 0
    fetch(this.endpoint, options)
      .then(function (response) {
        status = response.status
        checkResponseStatus(response)
        return response.json()
      }).then(function (data) {
        if (callback) {
          callback(data, status)
        }
      })
      .catch(function (ex) {
        alert('An unexpected error occured. Please try again')
        console.log('parsing failed', ex)
      })
  }
  post = (data, callback, includeAuth = true) => {
    const options = this.getOptions('post', data, includeAuth)
    let status = 0
    fetch(this.endpoint, options)
      .then(function (response) {
        status = response.status
        checkResponseStatus(response)
        return response.json()
      }).then(function (data) {
        if (callback) {
          callback(data, status)
        }
      })
      .catch(function (ex) {
        alert('An unexpected error occured. Please try again')
        console.log('parsing failed', ex)
      })
  }
  put = (data, callback, includeAuth = true) => {
    const options = this.getOptions('put', data, includeAuth)
    let status = 0
    fetch(this.endpoint, options)
      .then(function (response) {
        status = response.status
        checkResponseStatus(response)
        return response.json()
      }).then(function (data) {
        if (callback) {
          callback(data, status)
        }
      })
      .catch(function (ex) {
        alert('An unexpected error occured. Please try again')
        console.log('parsing failed', ex)
      })
  }

  delete = (callback, includeAuth = true) => {
    const options = this.getOptions('delete', {}, includeAuth)
    let status = 0
    fetch(this.endpoint, options)
      .then(function (response) {
        status = response.status
        checkResponseStatus(response)
        if (callback) {
          callback(response, status)
        }
        return response
      }).then(function (data) {
      })
      .catch(function (ex) {
        alert('An unexpected error occured while deleting. Please try again')
        console.log('parsing failed', ex)
      })
  }
}

// const Lookup = withRouter(LookupClass)
export default LookupClass
