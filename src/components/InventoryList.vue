<template>
  <div class="p-4 sm:p-6 bg-gray-100">
    <h1 class="text-xl sm:text-2xl font-bold mb-4">Inventory List</h1>

    <!-- Tombol Tambah Barang -->
    <router-link
      to="/form"
      class="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 inline-block text-sm sm:text-base"
    >
      Tambah Item
    </router-link>

    <!-- Daftar Barang -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200 rounded-lg text-sm sm:text-base">
        <thead>
          <tr class="bg-gray-200 text-gray-600 uppercase text-xs sm:text-sm leading-normal">
            <th class="py-2 px-4 text-left">Nama</th>
            <th class="py-2 px-4 text-left">Stok</th>
            <th class="py-2 px-4 text-left">Harga</th>
          </tr>
        </thead>
        <tbody class="text-gray-600">
          <tr
            v-for="item in items"
            :key="item.id"
            class="border-b border-gray-200 hover:bg-gray-100"
          >
            <td class="py-2 px-4 text-left">{{ item.nama }}</td>
            <td class="py-2 px-4 text-left">{{ item.stok }}</td>
            <td class="py-2 px-4 text-left">{{ formatCurrency(item.harga) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
