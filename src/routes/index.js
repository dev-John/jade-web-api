import location from "./location.js";
import person from "./person.js";

export default [
  ...location,
  ...person,
  {
    method: "*",
    path: "/{any*}",
    handler: () => "Erro 404, a pagina solicitada não existe",
  },
];
