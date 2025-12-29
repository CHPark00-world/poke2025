const ROUTE = {
  LANDING: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  HOME: "/home",
  DETAIL: (id = ":id") => `/detail/${id}`,
  QUIZ: "/quiz",
};

export default ROUTE;
