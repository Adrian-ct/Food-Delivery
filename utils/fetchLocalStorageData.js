export const fetchUser = () => {
  const userInfo =
    window.localStorage.getItem("user") !== "undefined"
      ? JSON.parse(window.localStorage.getItem("user"))
      : window.localStorage.clear();

  return userInfo;
};
