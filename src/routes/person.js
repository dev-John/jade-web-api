import { HTTP_CODES, RESPONSE_STATUS } from "../constants/index.js";
import { api } from "../helpers/http.js";

export default [
  {
    method: "POST",
    path: "/create-person",

    async handler(req, h) {
      const { payload } = req;

      try {
        await api.post("/create-update-person", {
          ...payload,
          _id: "",
        });

        return h.response({ status: RESPONSE_STATUS.SUCCESS });
      } catch (error) {
        return h
          .response({ status: RESPONSE_STATUS.FAIL, message: error.message })
          .code(HTTP_CODES.FAIL_VALIDATION);
      }
    },
  },
];
