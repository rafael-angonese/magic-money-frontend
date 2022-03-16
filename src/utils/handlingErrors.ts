import { toast } from "react-toastify";
import axios from "axios";

const handlingErrors = (error: unknown) => {
  // Error 😨 🚀

  if (axios.isAxiosError(error)) {
    // console.log(error.toJSON());

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { data, status, headers } = error.response;

      // console.log(error.response.status);
      // console.log(error.response.headers);
      // console.log(error.response.data);
      return data;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // console.log(error.request);
      toast.error("Não foi possível comunicar com o servidor.");
    } else {
      // Something happened in setting up the request that triggered an Error
      // console.log("Error", error.message);
      toast.error("Não foi possível comunicar com o servidor.");
    }
  } else {
    toast.error("Não foi possível comunicar com o servidor.");
  }
};

export default handlingErrors;
