<template>
  <div class="p-6 bg-white shadow-md rounded-lg mb-4">
    <h2 class="text-xl font-semibold mb-4">{{ isEdit ? 'Edit Item' : 'Tambah Item Baru' }}</h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <input
        v-model="itemData.nama"
        placeholder="Nama Produk"
        required
        class="w-full p-2 border border-gray-300 rounded-lg"
      />
      <input
        type="number"
        v-model="itemData.stok"
        placeholder="Stok"
        required
        class="w-full p-2 border border-gray-300 rounded-lg"
      />
      <input
        type="number"
        v-model="itemData.harga"
        placeholder="Harga"
        required
        class="w-full p-2 border border-gray-300 rounded-lg"
      />
      <button
        type="submit"
        class="bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        {{ isEdit ? 'Simpan' : 'Tambah' }}
      </button>
    </form>
  </div>
</template>

<script>
import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

export default {
  props: {
    item: {
      type: Object,
      default: () => ({ nama: '', stok: 0, harga: 0 }),
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      itemData: { ...this.item }, // Copy item data to avoid direct mutations
    };
  },
  methods: {
    async submitForm() {
      try {
        if (this.isEdit) {
          // Update existing item
          const itemRef = doc(db, 'inventory', this.item.id);
          await updateDoc(itemRef, {
            nama: this.itemData.nama,
            stok: this.itemData.stok,
            harga: this.itemData.harga,
          });
        } else {
          // Add new item
          await addDoc(collection(db, 'inventory'), {
            nama: this.itemData.nama,
            stok: this.itemData.stok,
            harga: this.itemData.harga,
          });
        }
        this.$emit('submit-item', this.itemData);
      } catch (error) {
        console.error('Error saving item:', error);
      }
    },
  },
  watch: {
    item(newItem) {
      this.itemData = { ...newItem }; // Update local itemData when prop changes
    },
  },
};
</script>
