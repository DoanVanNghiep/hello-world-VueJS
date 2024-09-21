import { createRouter, createWebHistory } from 'vue-router';
import ListEmployeeComponent from './ListEmployeeComponent.vue';
import ViewEmployeeComponent from './ViewEmployeeComponent.vue';
import UpdateEmployeeComponent from './UpdateEmployeeComponent.vue';
import CreateEmployeeComponent from './CreateEmployeeComponent.vue';

const routes = [
  { path: '/employee', component: ListEmployeeComponent },
  { path: '/view-employee/:id', component: ViewEmployeeComponent },
  { path: '/update-employee/:id', component: UpdateEmployeeComponent },
  { path: '/add-employee/:id', component: CreateEmployeeComponent }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
