import _axios from "axios";
import { Auth } from "aws-amplify";

let axios = _axios.create({
  baseURL: "https://1a4cocxkoi.execute-api.us-east-2.amazonaws.com/dev"
});

const token = async() => {
  return (await Auth.currentAuthenticatedUser()).getSignInUserSession().getIdToken().getJwtToken();
};

export async function fetchMediaList() {
  try {
    const response = await axios.get(
      "/api/media/all",
      {
        headers: {
          "Authorization": await token()
        }
      }
    );
    return response.data;
  } catch(err) {
    return err?.response?.status || 500;
  }
}

export async function updateMediaList(media) {
  const newMedia = {
    id: media.id,
    media: {
      title: media.title,
      status: media.status,
      type: media.type,
      notes: media.notes
    }
  };
  try {
    const response = await axios.put("/api/media", newMedia, { headers: { "Authorization": await token() } });
    return response.status;
  } catch (err) {
    return err?.response?.status || 500;
  }
}

export async function deleteMediaList(id) {
  try {
    const response = await axios.delete(
      "/api/media",
      {
        data: { id },
        headers: {
          "Authorization": await token()
        }
      }
    );
    return response.status;
  } catch(err) {
    return err?.response?.status || 500;
  }
}

export async function createNewMedia(media) {
  const postData = {
    title: media.title,
    type: media.type,
    status: media.status,
    notes: media.notes
  };
  try {
    const response = await axios.post(
      "/api/media",
      postData,
      {
        headers: {
          "Authorization": await token()
        }
      }
    );

    return response.status;
  } catch(err) {
    return err?.response?.status || 500;
  }
}
