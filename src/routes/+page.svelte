<script lang="ts">
  import type { PageData } from "./$types";
  import type { Game, Retention } from "$lib/types";
  import { onMount } from "svelte";
  import Chart from "../components/Chart.svelte";
  import FilterBar from "../components/FilterBar.svelte";

  export let data: PageData;

  let selectedGame: string = "All";
  let selectedVersion: string = "All";
  let selectedCountry: string = "All";
  let filteredData: Retention[] = [];
  let chartData: Retention | null = null;

  let showTable = true;

  const handleGameChange = (event: Event) => {
    selectedGame = (event.target as HTMLSelectElement).value;
    filterData();
  };

  const handleVersionChange = (event: Event) => {
    selectedVersion = (event.target as HTMLSelectElement).value;
    filterData();
  };

  const handleCountryChange = (event: Event) => {
    selectedCountry = (event.target as HTMLSelectElement).value;
    filterData();
  };

  let sortedGames = data.games.slice().sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  const filterData = () => {
    filteredData = data.retentions.filter(
      (retention) =>
        (selectedVersion === "All" || retention.app_ver === selectedVersion) &&
        (selectedCountry === "All" || retention.country === selectedCountry) &&
        (selectedGame === "All" || retention.app_id === selectedGame)
    );

    chartData = filteredData.length === 1 ? filteredData[0] : null;
  };

  onMount(filterData);

  const toggleView = () => {
    showTable = !showTable;
  };
</script>

<main>
  <h1 class="heading">Retention Data</h1>

  <FilterBar
    {data}
    {selectedGame}
    {selectedVersion}
    {selectedCountry}
    {handleGameChange}
    {handleVersionChange}
    {handleCountryChange}
    {sortedGames}
  />

  <div class="viewBar">
    <button on:click={toggleView}>Show {showTable ? "Chart" : "Table"}</button>
  </div>

  {#if showTable}
    {#if filteredData.length > 0}
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Version</th>
              <th>Country</th>
              {#each Array.from({ length: 91 }, (_, i) => i) as day}
                <th>D{day}</th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each filteredData as retention}
              <tr>
                <td>{retention.app_ver}</td>
                <td>{retention.country}</td>
                {#each retention.days as dayValue, index}
                  <td
                    >{index === 0
                      ? 100
                      : Math.round((dayValue / retention.days[0]) * 100)}</td
                  >
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <p>No retention data available.</p>
    {/if}
  {:else}
    <Chart {chartData} />
  {/if}
</main>

<style>
  .heading {
    text-align: center;
  }

  .viewBar {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding-bottom: 25px;
  }

  .table-container {
    width: 100%;
    max-width: 1280px;
    overflow-x: auto;
    margin: 0 auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
  }
</style>
