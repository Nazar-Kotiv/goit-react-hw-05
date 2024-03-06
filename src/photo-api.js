import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";
const myKey = "KICdsRUk31XDxm7026n-qirFOU6Qk-UtdyHj82bZLB8";

export const fetchPhoto = async (query, page) => {
  const response = await axios.get("/search/photos", {
    params: {
      query: query,
      per_page: 28,
      page,
      client_id: myKey,
    },
  });

  return response.data;
};
