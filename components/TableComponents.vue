<template>
  <div>
    <input v-model="filter" placeholder="Фильтр по названию" />

    <!-- Filtering Buttons -->
    <div class="filter-buttons">
      <button @click="applyFilter('status', 'Available')">Available</button>
      <button @click="applyFilter('status', 'Out of Stock')">Out of Stock</button>
      <button @click="applyPriceFilter(0, 5)">Price: $0 - $5</button>
      <button @click="applyPriceFilter(5, 10)">Price: $5 - $10</button>
      <button @click="applyDateFilter('2025-03-01', '2025-03-31')">March 2025</button>
      <button @click="applyDateFilter('2025-04-01', '2025-04-30')">April 2025</button>
      <button @click="clearFilters">Clear Filters</button>
    </div>

    <table>
      <tr>
        <th>ID</th>
        <th>Название</th>
        <th>Статус</th>
        <th>Цена</th>
        <th>Дата создания</th>
      </tr>
      <tr v-for="item in filteredItems" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.status }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.date_created }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import products from '~/products.json'; // Import the JSON file

const filter = ref('');
const items = ref([]);
const activeFilters = ref({}); // Object to store active filters
const priceFilter = ref(null); // Object to store price range filter
const dateFilter = ref(null); // Object to store date range filter

// Load the data from the JSON file
onMounted(() => {
  items.value = products;
});

// Apply a filter based on a specific field and value
const applyFilter = (field, value) => {
  activeFilters.value[field] = value;
};

// Apply a price range filter
const applyPriceFilter = (min, max) => {
  priceFilter.value = { min, max };
};

// Apply a date range filter
const applyDateFilter = (startDate, endDate) => {
  dateFilter.value = { startDate, endDate };
};

// Clear all filters
const clearFilters = () => {
  activeFilters.value = {};
  priceFilter.value = null;
  dateFilter.value = null;
};

// Filtered items based on the search input and active filters
const filteredItems = computed(() => {
  return items.value.filter((item) => {
    // Check if the item matches the search filter
    const matchesSearch = item.name.toLowerCase().includes(filter.value.toLowerCase());

    // Check if the item matches all active filters
    const matchesFilters = Object.keys(activeFilters.value).every((key) => {
      return activeFilters.value[key] === item[key];
    });

    // Check if the item matches the price range filter
    const matchesPrice =
      !priceFilter.value ||
      (item.price >= priceFilter.value.min && item.price <= priceFilter.value.max);

    // Check if the item matches the date range filter
    const matchesDate =
      !dateFilter.value ||
      (new Date(item.date_created) >= new Date(dateFilter.value.startDate) &&
        new Date(item.date_created) <= new Date(dateFilter.value.endDate));

    return matchesSearch && matchesFilters && matchesPrice && matchesDate;
  });
});
</script>

<style scoped>
.filter-buttons {
  margin-bottom: 10px;
}

.filter-buttons button {
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #6d4c41;
  color: white;
  border: none;
  border-radius: 5px;
}

.filter-buttons button:hover {
  background-color: #5d4037;
}
</style>
