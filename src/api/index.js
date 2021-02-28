import axios from "axios";

let apiUri;
if(process.env.NODE_ENV == "production") {
  apiUri = process.env.REACT_APP_API_PROD;
} else {
  apiUri = process.env.REACT_APP_API_DEV;
}

export async function login(username, password) {
  console.log(apiUri);
  let responseStatus;
  try {
    const res = await axios.post(`${apiUri}/login`, { username, password }, { withCredentials: true });
    console.log(res.data);
    responseStatus = res.status;
  } catch(err) {
    responseStatus = err?.response?.status || 500;
  }
  return responseStatus;
}