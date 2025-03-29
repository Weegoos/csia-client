// src/boot/config.js
export default ({ app }) => {
  const serverURL = "http://localhost:8080/";
  const clientURL = "http://localhost:9000/#/";

  app.config.globalProperties.$serverURL = serverURL;
  app.config.globalProperties.$clientURL = clientURL;
};
