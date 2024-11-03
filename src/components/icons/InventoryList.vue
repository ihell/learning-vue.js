<template>
    <div class="p-6 bg-gray-100">
      <h1 class="text-2xl font-bold mb-4">Inventory List</h1>
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
            <td class="py-3 px-6 text-left">{{ item.name }}</td>
            <td class="py-3 px-6 text-left">{{ item.stock }}</td>
            <td class="py-3 px-6 text-left">{{ item.price }}</td>
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
  export default {
    props: ['items'],
    methods: {
      editItem(item) {
        this.$emit('edit-item', item);
      },
      deleteItem(id) {
        this.$emit('delete-item', id);
      }
    }
  };
  </script>
  