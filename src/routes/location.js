import Joi from "@hapi/joi";

import { RESPONSE_STATUS, HTTP_CODES } from "../constants/index.js";
import { api } from "../helpers/http.js";

export default [
  {
    method: "GET",
    path: "/get-ufs",

    async handler(req, h) {
      try {
        const { data } = await api.get("/get-ufs");

        return h.response({
          status: RESPONSE_STATUS.SUCCESS,
          data,
        });
      } catch (error) {
        return h
          .response({ status: RESPONSE_STATUS.FAIL, message: error.message })
          .code(HTTP_CODES.FAIL_VALIDATION);
      }
    },
  },

  {
    method: "GET",
    path: "/get-cities-uf/{uf}",

    async handler(req, h) {
      const { uf } = req.params;

      try {
        const { data } = await api.get(`/get-cities-uf/${uf}`);

        return h.response({
          status: RESPONSE_STATUS.SUCCESS,
          data: data[0].cities,
        });
      } catch (error) {
        return h
          .response({ status: RESPONSE_STATUS.FAIL, message: error.message })
          .code(HTTP_CODES.FAIL_VALIDATION);
      }
    },
  },
];
