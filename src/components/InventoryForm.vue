<template>
    <div class="p-6 bg-white shadow-md rounded-lg mb-4">
      <h2 class="text-xl font-semibold mb-4">{{ isEdit ? 'Edit Item' : 'Tambah Item Baru' }}</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <input v-model="item.name" placeholder="Nama Produk" required class="w-full p-2 border border-gray-300 rounded-lg" />
        <input type="number" v-model="item.stock" placeholder="Stok" required class="w-full p-2 border border-gray-300 rounded-lg" />
        <input type="number" v-model="item.price" placeholder="Harga" required class="w-full p-2 border border-gray-300 rounded-lg" />
        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-lg">{{ isEdit ? 'Simpan' : 'Tambah' }}</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: ['item', 'isEdit'],
    methods: {
      submitForm() {
        this.$emit('submit-item', this.item);
      }
    }
  };
  </script>
  