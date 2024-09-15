import { createRouter, createWebHistory } from "vue-router";
import Index from "../views/Index.vue";
import About from "../views/About.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index,
    },
    {
      path: "/about",
      name: "About",
      component: About,
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});

export default router;
