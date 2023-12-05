export const getToken = (key) => {
  const token = localStorage.getItem(key);

  return token ? token : false;
};
