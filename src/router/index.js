import { createRouter, createWebHashHistory } from "vue-router";
import App from "../App.vue";
import user from "../components/user.vue";
import todo from "../components/todo.vue";

const routes = [
  {
    path: "/todo/:id",
    component: todo,
  },
  {
    path: "/user",
    component: user,
  },
  {
    path: "/#/",
    component: App,
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
