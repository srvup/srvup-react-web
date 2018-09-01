import createHistory from 'history/createBrowserHistory'

let API_PUBLIC_KEY = '<your-live-public-key>'
let API_ENDPOINT = 'https://api.srvup.com/v1'

if (process.env.REACT_APP_USE_DEV_KEY) {
  API_PUBLIC_KEY = '<your-test-public-key>'
}

if (process.env.REACT_APP_DEV_API_ENDPOINT) {
  API_ENDPOINT = process.env.REACT_APP_DEV_API_ENDPOINT
}

const History = createHistory()

export {
  API_ENDPOINT,
  API_PUBLIC_KEY,
  History,
}
