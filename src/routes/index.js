import { createRouter, createWebHistory } from 'vue-router';
import InventoryList from '../components/InventoryList.vue';
import InventoryForm from '../components/InventoryForm.vue';

const routes = [
  {
    path: '/',
    name: 'InventoryList',
    component: InventoryList, // Halaman utama
  },
  {
    path: '/form',
    name: 'InventoryForm',
    component: InventoryForm, // Halaman form
    props: (route) => ({
      isEdit: route.query.isEdit === 'true',
      item: JSON.parse(route.query.item || '{}'),
    }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
