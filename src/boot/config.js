// src/boot/config.js
export default ({ app }) => {
  const serverURL = "https://csia-back.onrender.com/";
  const clientURL = "https://kaz-planta.netlify.app/#/";
  const maxItemsPerPage = 10;
  const mobileWidth = 800;

  app.config.globalProperties.$serverURL = serverURL;
  app.config.globalProperties.$clientURL = clientURL;
  app.config.globalProperties.$maxItemsPerPage = maxItemsPerPage;
  app.config.globalProperties.$mobileWidth = mobileWidth;
};
