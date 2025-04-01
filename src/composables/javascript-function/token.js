import { Cookies } from "quasar";

export function checkAccessToken() {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  if (!accessToken || !refreshToken) {
    window.location.href = "http://localhost:9000/#/login";
    return false;
  }
  return true;
}
