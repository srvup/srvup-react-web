React.js, Srvup.js, and the Srvup API // Web Client
======

This is an example of how to use React.js & srvup.js to integrate with the [srvup api](https://www.srvup.com).


#### Getting Started
> Updated _August 2018_

1. Register for an account on https://www.srvup.com
2. Create an API Client on https://www.srvup.com/apps (aka `client creation`)
3. Ensure you have the following settings:
    - **Name** `Srvup Web Client Test` (or any nickname you prefer)
    - **type** Select `web`
    - **Domain** `localhost` (live domain is below)

4. Pull this repo with:
```
$ cd path/to/your/dev/folder/
$ git clone https://github.com/srvup/srvup-react-web
$ cd srvup-react-web
$ npm install 
```

5. Copy your `Public token` from your newly created client in https://www.srvup.com/apps

6. Open up `/src/config/index.js`:
    - replace `'<your-test-public-key>'` with your test key


7. Ready for production? 
    - Repeat steps 1-6.
    - In `client creation`, use your final live **domain** such as `blog.srvup.com`
    - In `/src/config/index.js`, replace `'<your-live-public-key>'` with your new key.
