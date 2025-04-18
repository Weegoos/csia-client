import { Cookies } from "quasar";

export function checkAccessToken() {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  if (!accessToken || !refreshToken) {
    window.location.href = "https://kazplant.netlify.app/#/login";
    return false;
  }
  return true;
}
