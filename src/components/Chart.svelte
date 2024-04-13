<script lang="ts">
  import { Bar } from "svelte-chartjs";
  import { Chart, BarElement, LinearScale, CategoryScale } from "chart.js";
  import { onMount, afterUpdate } from 'svelte';
  import type { ChartOptions } from "chart.js";
  import type { Retention } from "$lib/types";

  Chart.register(BarElement, LinearScale, CategoryScale);
  export let chartData: Retention | null;

  let playerPrecentage: number[] = [];

  const calculateRetentionValues = () => {
    if (chartData !== null) {
      playerPrecentage = chartData.days.map((day) => (day / chartData!.days[0]) * 100);
    }
    updateChartData(); 
  };

  const updateChartData = () => {
    data.datasets[0].data = playerPrecentage; 
  };

  onMount(() => {
    if (chartData) {
      calculateRetentionValues();
    }
  });

  afterUpdate(() => {
    calculateRetentionValues();
  });

  const xAxis = ["D0", "D5", "D10", "D20", "D25", "D30", "D60", "D90"];

  const data = {
    labels: xAxis,
    datasets: [
      {
        data: playerPrecentage,
        backgroundColor: "rgba(165, 240, 167, 0.5)",
        borderColor: "rgba(165, 240, 167, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
</script>

{#if chartData !== null}
  <div class="wrapper">
    <Bar data={data} options={options} />
  </div>
{/if}

<style>
  .wrapper {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
  }
</style>
