<template>
  <div id="app" class="p-6 bg-gray-50 min-h-screen">
    <inventory-form
      :item="selectedItem"
      :isEdit="isEdit"
      @submit-item="saveItem"
    />
    <inventory-list
      :items="items"
      @edit-item="editItem"
      @delete-item="deleteItem"
    />
  </div>
</template>

<script>
import InventoryForm from './components/icons/InventoryForm.vue';
import InventoryList from './components/icons/InventoryList.vue';

export default {
  components: {
    InventoryForm,
    InventoryList,
  },
  data() {
    return {
      items: [],
      selectedItem: { name: '', stock: 0, price: 0 },
      isEdit: false,
    };
  },
  methods: {
    saveItem(item) {
      if (this.isEdit) {
        const index = this.items.findIndex((i) => i.id === item.id);
        if (index !== -1) this.items.splice(index, 1, item);
      } else {
        item.id = Date.now();
        this.items.push(item);
      }
      this.resetForm();
    },
    editItem(item) {
      this.selectedItem = { ...item };
      this.isEdit = true;
    },
    deleteItem(id) {
      this.items = this.items.filter((item) => item.id !== id);
    },
    resetForm() {
      this.selectedItem = { name: '', stock: 0, price: 0 };
      this.isEdit = false;
    },
  },
};
</script>
