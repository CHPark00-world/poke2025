const ROUTE = {
  LANDING: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  HOME: "/home",
  DETAIL_PATH: "/detail/:id",
  DETAIL: (id: number | string) => `/detail/${id}`,
  QUIZ: "/quiz",
  FAVORITES: "/favorites",
};

export default ROUTE;
