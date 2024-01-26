<template>
  <table>
    <thead>
      <tr>
        <th class="text-left">ID</th>
        <th class="text-left">Віддаю</th>
        <th class="text-left">Отримую</th>
        <th class="text-left">По курсу</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in $store.state.exchangeOperations" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.give }}</td>
        <td>{{ item.get }}</td>
        <td>{{ item.receive }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "TableChange",

  data() {
    return {};
  },
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
td {
  text-transform: uppercase;
}

tr:nth-child(even) {
  background-color: #c1c1c1;
}
</style>
