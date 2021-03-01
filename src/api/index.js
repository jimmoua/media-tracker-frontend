import axios from "axios";

let apiUri;
if(process.env.NODE_ENV === "production") {
  apiUri = process.env.REACT_APP_API_PROD;
} else {
  apiUri = process.env.REACT_APP_API_DEV;
}

export async function login(username, password) {
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

export async function fetchMediaList() {
  try {
    const response = await axios.get(`${apiUri}/`, { withCredentials: true });
    return response.data.medias;
  } catch(err) {
    return err?.response?.status || 500;
  }
}

export async function updateMediaList(media) {
  const postData = {
    id: media.id,
    data: {
      title: media.title,
      status: media.status,
      type: media.type
    }
  };
  try {
    const response = await axios.post(`${apiUri}/update`, postData, { withCredentials: true });
    return response.status;
  } catch (err) {
    return err?.response?.status || 500;
  }
}

export async function deleteMediaList(id) {
  try {
    const response = await axios.post(`${apiUri}/delete`, { id }, { withCredentials: true });
    return response.status;
  } catch(err) {
    return err?.response?.status || 500;
  }
}