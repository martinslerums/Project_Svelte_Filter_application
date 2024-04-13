<script lang="ts">
  import type { PageData } from "../routes/$types";
  import type { Game, Retention } from "$lib/types";

  export let data: PageData;
  export let selectedGame: string;
  export let selectedVersion: string;
  export let selectedCountry: string;
  export let handleGameChange: (event: Event) => void;
  export let handleVersionChange: (event: Event) => void;
  export let handleCountryChange: (event: Event) => void;
  export let sortedGames: Game[];

  const uniqueVersions = (data: Retention[], selectedGame: string) => {
    const filteredData = data.filter(
      (retention) => selectedGame === "All" || retention.app_id === selectedGame
    );
    return Array.from(new Set(filteredData.map((version) => version.app_ver)));
  };

  const uniqueCountries = (data: Retention[], selectedGame: string) => {
    const filteredData = data.filter(
      (retention) => selectedGame === "All" || retention.app_id === selectedGame
    );
    return Array.from(new Set(filteredData.map((country) => country.country)));
  };
</script>

<div class="filterBar">
  <select bind:value={selectedGame} on:change={handleGameChange} class="select">
    <option value="All">All</option>
    {#each sortedGames as game (game.app_id)}
      <option value={game.app_id}>{game.name}</option>
    {/each}
  </select>

  <select
    bind:value={selectedVersion}
    on:change={handleVersionChange}
    class="select"
  >
    <option value="All">All</option>
    {#each uniqueVersions(data.retentions, selectedGame) as version (version)}
      <option value={version}>{version}</option>
    {/each}
  </select>

  <select
    bind:value={selectedCountry}
    on:change={handleCountryChange}
    class="select"
  >
    <option value="All">All</option>
    {#each uniqueCountries(data.retentions, selectedGame) as country (country)}
      <option value={country}>{country}</option>
    {/each}
  </select>
</div>

<style>
  .filterBar {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding-bottom: 25px;
  }

  .select {
    padding: 5px;
  }
</style>
