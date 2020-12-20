import Joi from "joi";

import { HTTP_CODES, RESPONSE_STATUS } from "../constants/index.js";
import { api } from "../helpers/http.js";

import failAction from "../utils/fail-action.js";

export default [
  {
    method: "POST",
    path: "/create-person",

    options: {
      validate: {
        payload: Joi.object({
          type: Joi.string()
            .required()
            .messages({ "string.empty": "O Tipo é obrigatório" }),
          name: Joi.string()
            .required()
            .messages({ "string.empty": "O campo Nome é obrigatório" }),
          cpfCnpj: Joi.string()
            .required()
            .messages({ "string.empty": "O campo CPF/CNPJ é obrigatório" }),
          phone: Joi.string()
            .required()
            .messages({ "string.empty": "O campo Telefone é obrigatório" }),
          city: Joi.string()
            .required()
            .messages({ "string.empty": "O campo Cidade é obrigatório" }),
          uf: Joi.string()
            .required()
            .messages({ "string.empty": "O campo UF é obrigatório" }),
          birthDate: Joi.string().required().messages({
            "string.empty": "O campo Data de Nascimento é obrigatório",
          }),
        }),

        failAction,
      },
    },

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
          .response({
            status: RESPONSE_STATUS.FAIL,
            message: error.response.data.message,
          })
          .code(HTTP_CODES.FAIL_VALIDATION);
      }
    },
  },

  {
    method: "POST",
    path: "/edit-person",

    options: {
      validate: {
        payload: Joi.object({
          _id: Joi.string().required().messages({
            "string.empty": "O id da pessoa é obrigatório para edições",
          }),
          type: Joi.string()
            .required()
            .messages({ "string.empty": "O Tipo é obrigatório" }),
          name: Joi.string()
            .required()
            .messages({ "string.empty": "O campo Nome é obrigatório" }),
          cpfCnpj: Joi.string()
            .required()
            .messages({ "string.empty": "O campo CPF/CNPJ é obrigatório" }),
          phone: Joi.string()
            .required()
            .messages({ "string.empty": "O campo Telefone é obrigatório" }),
          city: Joi.string()
            .required()
            .messages({ "string.empty": "O campo Cidade é obrigatório" }),
          uf: Joi.string()
            .required()
            .messages({ "string.empty": "O campo UF é obrigatório" }),
        }),

        failAction,
      },
    },

    async handler(req, h) {
      const { payload } = req;

      try {
        await api.post("/create-update-person", {
          ...payload,
        });

        return h.response({ status: RESPONSE_STATUS.SUCCESS });
      } catch (error) {
        console.log("🚀 ~ file: person.js ~ line 105 ~ handler ~ error", error);
        return h
          .response({
            status: RESPONSE_STATUS.FAIL,
            message: error.response.data.message,
          })
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
