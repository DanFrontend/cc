<template>
  <div class="wrapp">
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      chartOptions: {
        responsive: true,
      },
    };
  },
  computed: {
    chartData() {
      return {
        labels: ["Долар", "Гривня", "Злотий", "Євро"],
        datasets: [
          {
            data: this.$store.getters.dataChart,
            label: "Найбільший попит",
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss">
.wrapp {
  width: 50%;
}
</style>
