<template>
  <div class="p-6 bg-gray-100">
    <h1 class="text-2xl font-bold mb-4">Inventory List</h1>

    <!-- Notifikasi -->
    <div v-if="notification" class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
      {{ notification }}
    </div>

    <table class="min-w-full bg-white border border-gray-200 rounded-lg">
      <thead>
        <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th class="py-3 px-6 text-left">Nama</th>
          <th class="py-3 px-6 text-left">Stok</th>
          <th class="py-3 px-6 text-left">Harga</th>
          <th class="py-3 px-6 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody class="text-gray-600 text-sm font-light">
        <tr v-for="item in items" :key="item.id" class="border-b border-gray-200 hover:bg-gray-100">
          <td class="py-3 px-6 text-left">{{ item.nama }}</td>
          <td class="py-3 px-6 text-left">{{ item.stok }}</td>
          <td class="py-3 px-6 text-left">{{ formatCurrency(item.harga) }}</td>
          <td class="py-3 px-6 text-center">
            <button @click="editItem(item)" class="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2">Edit</button>
            <button @click="deleteItem(item.id)" class="bg-red-500 text-white px-3 py-1 rounded-lg">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { db } from '../firebase';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { reactive, ref } from 'vue';

export default {
  setup() {
    const items = reactive([]); // Reactive state untuk daftar item
    const notification = ref(null); // Reactive state untuk notifikasi

    // Listener untuk update real-time dari Firestore
    const fetchItems = () => {
      const inventoryRef = collection(db, 'inventory');
      onSnapshot(inventoryRef, (snapshot) => {
        items.length = 0; // Reset data lokal
        snapshot.forEach((doc) => {
          items.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      });
    };

    // Memuat data saat komponen dimuat
    fetchItems();

    const showNotification = (message) => {
      notification.value = message;
      setTimeout(() => {
        notification.value = null; // Hilangkan notifikasi setelah 3 detik
      }, 3000);
    };

    const deleteItem = async (id) => {
      try {
        await deleteDoc(doc(db, 'inventory', id));
        showNotification('Item berhasil dihapus!');
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    };

    return {
      items,
      notification,
      deleteItem,
      fetchItems,
      showNotification,
    };
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(value);
    },
    editItem(item) {
      this.$emit('edit-item', item); // Emit event untuk membuka form edit
    },
  },
};
</script>
