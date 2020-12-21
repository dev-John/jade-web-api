import Joi from "joi";

import { RESPONSE_STATUS, HTTP_CODES, HTTP_VERBS } from "../constants/index.js";
import { api } from "../helpers/http.js";

import failAction from "../utils/fail-action.js";

const { GET } = HTTP_VERBS;

export default [
  {
    method: GET,
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
    method: GET,
    path: "/get-cities-uf/{uf}",

    options: {
      validate: {
        params: Joi.object({
          uf: Joi.string().required().messages({
            "string.empty":
              "É necessário selecionar um UF para buscar a cidade",
          }),
        }),

        failAction,
      },
    },

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
