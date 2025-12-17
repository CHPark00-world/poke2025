const ROUTE = {
  LANDING: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  HOME: "/home",
  DETAIL: (id = ":id") => `/detail/${id}`,
};

export default ROUTE;
