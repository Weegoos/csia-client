// src/boot/config.js
export default ({ app }) => {
  const serverURL = "http://localhost:8080/";
  const clientURL = "http://localhost:9000/#/";
  const maxItemsPerPage = 10;
  const mobileWidth = 800;

  app.config.globalProperties.$serverURL = serverURL;
  app.config.globalProperties.$clientURL = clientURL;
  app.config.globalProperties.$maxItemsPerPage = maxItemsPerPage;
  app.config.globalProperties.$mobileWidth = mobileWidth;
};
