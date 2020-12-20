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

  {
    method: "GET",
    path: "/get-people",

    async handler(req, h) {
      try {
        const { data } = await api.get("/get-people");

        return h.response({ status: RESPONSE_STATUS.SUCCESS, data });
      } catch (error) {
        return h
          .response({ status: RESPONSE_STATUS.FAIL, message: error.message })
          .code(HTTP_CODES.FAIL_VALIDATION);
      }
    },
  },

  {
    method: "GET",
    path: "/search-person",

    async handler(req, h) {
      const { cpfCnpj, uf, city } = req.query;

      try {
        const { data } = await api.get(
          `/search-person/${cpfCnpj}/${uf}/${city}`
        );

        return h.response({ status: RESPONSE_STATUS.SUCCESS, data });
      } catch (error) {
        return h
          .response({ status: RESPONSE_STATUS.FAIL, message: error.message })
          .code(HTTP_CODES.FAIL_VALIDATION);
      }
    },
  },

  {
    method: "DELETE",
    path: "/delete-person/{_id}",

    async handler(req, h) {
      const { _id } = req.params;

      try {
        await api.delete(`/delete-person/${_id}`);

        return h.response({ status: RESPONSE_STATUS.SUCCESS });
      } catch (error) {
        return h
          .response({ status: RESPONSE_STATUS.FAIL, message: error.message })
          .code(HTTP_CODES.FAIL_VALIDATION);
      }
    },
  },
];
