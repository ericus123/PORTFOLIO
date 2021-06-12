export const authRedirect = () => {
  if (process.browser ? localStorage.getItem("auth-token") : null) {
    process.browser ? window.location.assign("/") : null;
  }
};
