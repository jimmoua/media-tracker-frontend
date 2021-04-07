import axios from "axios";

const apiUri = "https://1a4cocxkoi.execute-api.us-east-2.amazonaws.com/dev/api";

export async function login(username, password) {
  let responseStatus;
  try {
    const res = await axios.post(`${apiUri}/login`, { username, password });
    console.log(res.data);
    responseStatus = res.status;
  } catch(err) {
    responseStatus = err?.response?.status || 500;
  }
  return responseStatus;
}

export async function fetchMediaList() {
  try {
    const response = await axios.get(`${apiUri}/api/all`);
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
    const response = await axios.post(`${apiUri}/api/update`, postData);
    return response.status;
  } catch (err) {
    return err?.response?.status || 500;
  }
}

export async function deleteMediaList(id) {
  try {
    const response = await axios.post(`${apiUri}/api/delete`, { id });
    return response.status;
  } catch(err) {
    return err?.response?.status || 500;
  }
}

export async function createNewMedia(media) {
  const postData = {
    title: media.title,
    type: media.type,
    status: media.status
  };
  try {
    const response = await axios.post(`${apiUri}/api/new`, postData);
    return response.status;
  } catch(err) {
    return err?.response?.status || 500;
  }
}