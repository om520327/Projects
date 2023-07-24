// baseurl setting which provides base address of
// api endpoints that our client api aplication will be calling
// this way when we use axios to call endpoint we wont need to repeat the base url in
// http request in our code
// headers setting during deelopment face tech that
// remote machine is using to expose the realtive api endpoints is called ngrok
//   because the relevent web api is running in a
// diff domain sum might block our accsses to endpoint
// headers will over come ristrictoon so we can accsses resources maind avalible in api

import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8080'
});
