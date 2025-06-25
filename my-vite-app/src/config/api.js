export const URLDomain = {
  baseURL: "https://hcmut.runasp.net/api",
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: (status) => status < 400,
};
