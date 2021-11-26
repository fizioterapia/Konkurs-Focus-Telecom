import { createRouter, createWebHistory } from "vue-router";
import Start from "../views/Start.vue";
import Ringing from "../views/Ringing.vue";
import Connected from "../views/Connected.vue";
import Answered from "../views/Answered.vue";
import Failed from "../views/Failed.vue";
import Connections from "../views/Connections.vue";
import Consultants from "../views/Consultants.vue";
import FAQ from "../views/FAQ.vue";

const validator = (to, from, next) => {
  if (!to.params.status) {
    next({ name: "start" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "start",
    component: Start,
  },
  {
    path: "/ringing",
    name: "ringing",
    component: Ringing,
    props: true,
    beforeEnter: validator,
  },
  {
    path: "/connected",
    name: "connected",
    component: Connected,
    props: true,
    beforeEnter: validator,
  },
  {
    path: "/answered",
    name: "answered",
    component: Answered,
    beforeEnter: validator,
  },
  {
    path: "/failed",
    name: "failed",
    component: Failed,
    beforeEnter: validator,
  },
  {
    path: "/calls",
    name: "calls",
    component: Connections,
  },
  {
    path: "/consultants",
    name: "consultants",
    component: Consultants,
  },
  {
    path: "/faq",
    name: "faq",
    component: FAQ,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
