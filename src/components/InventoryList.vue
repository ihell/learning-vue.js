<template>
  <div class="p-6 bg-gray-100">
    <h1 class="text-2xl font-bold mb-4">Inventory List</h1>
    <!-- Tombol Tambah Barang -->
    <router-link
      to="/form"
      class="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 inline-block"
    >
      Tambah Item
    </router-link>
    <table class="min-w-full bg-white border border-gray-200 rounded-lg">
      <thead>
        <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th class="py-3 px-6 text-left">Nama</th>
          <th class="py-3 px-6 text-left">Stok</th>
          <th class="py-3 px-6 text-left">Harga</th>
        </tr>
      </thead>
      <tbody class="text-gray-600 text-sm font-light">
        <tr
          v-for="item in items"
          :key="item.id"
          class="border-b border-gray-200 hover:bg-gray-100"
        >
          <td class="py-3 px-6 text-left">{{ item.nama }}</td>
          <td class="py-3 px-6 text-left">{{ item.stok }}</td>
          <td class="py-3 px-6 text-left">{{ formatCurrency(item.harga) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { reactive } from 'vue';

export default {
  setup() {
    const items = reactive([]);

    const fetchItems = () => {
      const inventoryRef = collection(db, 'inventory');
      onSnapshot(inventoryRef, (snapshot) => {
        items.length = 0;
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
      });
    };

    fetchItems();

    const formatCurrency = (value) =>
      new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(value);

    return { items, formatCurrency };
  },
};
</script>
