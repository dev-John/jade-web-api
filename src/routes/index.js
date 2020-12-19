import location from "./location.js";

export default [
  ...location,
  {
    method: "*",
    path: "/{any*}",
    handler: () => "Erro 404, a pagina solicitada não existe",
  },
];
