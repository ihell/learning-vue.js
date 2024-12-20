<template>
  <div class="p-4 sm:p-6 bg-gray-100">
    <!-- Tombol Kembali -->
    <router-link 
      to="/" 
      class="bg-gray-500 text-white px-4 py-2 rounded-lg mb-6 inline-block"
    >
      Kembali ke Halaman Utama
    </router-link>

    <!-- Form Tambah/Edit Item -->
    <div class="bg-white shadow-md rounded-lg p-4 mb-6">
      <h2 class="text-lg sm:text-xl font-semibold mb-4">{{ isEdit ? 'Edit Item' : 'Tambah Item Baru' }}</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <input
          v-model="itemData.nama"
          placeholder="Nama Produk"
          required
          class="w-full p-2 border border-gray-300 rounded-lg text-sm sm:text-base"
        />
        <input
          type="number"
          v-model="itemData.stok"
          placeholder="Stok"
          required
          class="w-full p-2 border border-gray-300 rounded-lg text-sm sm:text-base"
        />
        <input
          type="number"
          v-model="itemData.harga"
          placeholder="Harga"
          required
          class="w-full p-2 border border-gray-300 rounded-lg text-sm sm:text-base"
        />
        <button
          type="submit"
          class="bg-green-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto text-sm sm:text-base"
        >
          {{ isEdit ? 'Simpan' : 'Tambah' }}
        </button>
      </form>
    </div>

    <!-- Daftar Item -->
    <div class="bg-white shadow-md rounded-lg p-4">
      <h2 class="text-lg sm:text-xl font-semibold mb-4">Daftar Barang</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200 rounded-lg text-sm sm:text-base">
          <thead>
            <tr class="bg-gray-200 text-gray-600 uppercase text-xs sm:text-sm leading-normal">
              <th class="py-2 px-4 text-left">Nama</th>
              <th class="py-2 px-4 text-left">Stok</th>
              <th class="py-2 px-4 text-left">Harga</th>
              <th class="py-2 px-4 text-center">Aksi</th>
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
              <td class="py-2 px-4 text-center space-y-1 sm:space-y-0 sm:space-x-2">
                <button
                  @click="editItem(item)"
                  class="bg-blue-500 text-white px-3 py-1 rounded-lg w-full sm:w-auto"
                >
                  Edit
                </button>
                <button
                  @click="deleteItem(item.id)"
                  class="bg-red-500 text-white px-3 py-1 rounded-lg w-full sm:w-auto"
                >
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { reactive } from 'vue';

export default {
  props: {
    isEdit: Boolean,
    item: Object,
  },
  setup(props) {
    const items = reactive([]);
    const itemData = reactive(props.item || { nama: '', stok: 0, harga: 0 });

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

    const submitForm = async () => {
      try {
        if (props.isEdit) {
          const itemRef = doc(db, 'inventory', props.item.id);
          await updateDoc(itemRef, { ...itemData });
        } else {
          await addDoc(collection(db, 'inventory'), { ...itemData });
        }
      } catch (error) {
        console.error('Error saving item:', error);
      }
    };

    const deleteItem = async (id) => {
      try {
        await deleteDoc(doc(db, 'inventory', id));
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    };

    const formatCurrency = (value) =>
      new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(value);

    const editItem = (item) => {
      Object.assign(itemData, item);
    };

    return {
      items,
      itemData,
      submitForm,
      deleteItem,
      formatCurrency,
      editItem,
    };
  },
};
</script>
