<script lang="ts">
  import { enhance } from '$app/forms';
  import { IconCalendar, IconUsersGroup } from '@tabler/icons-svelte';
  import { DateInput } from 'date-picker-svelte';
  import { DateTime } from 'luxon';
  import Group from '../../../components/Group.svelte';
  import CleaningAggregate from '../../../components/CleaningAggregate.svelte';

  let until = new Date();

  $: untilTime = until.getTime();
  export let data;

  $: shiftsByDate = data.shifts.reduce((acc, shift) => {
    const date = shift.date.toISOString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(shift);
    return acc;
  }, {});
</script>

<h2>Azioni rapide</h2>
<div class="widgets">
  <div class="widget">
    <div class="title">
      <div class="icon">
        <IconCalendar size={16} />
      </div>
      <h3>Genera turni</h3>
    </div>
    <div class="contents">
      <p class="desc">Seleziona una data per generare tutti i turni a partire da essa.</p>
      <form id="form-generate-turns" method="POST" action="?/generateShifts" use:enhance>
        <label for="until">Fino al</label>
        <DateInput
          max={DateTime.now().plus({ years: 2 }).toJSDate()}
          format="dd/MM/yyyy"
          browseWithoutSelecting={true}
          closeOnSelection={true}
          placeholder={DateTime.now().toFormat('dd/MM/yyyy')}
          bind:value={until}
        />
        <input type="hidden" name="until" bind:value={untilTime} />
      </form>
    </div>
    <div class="bottom">
      <input type="submit" form="form-generate-turns" value="Genera" />
    </div>
  </div>

  <div class="widget">
    <div class="title">
      <div class="icon">
        <IconUsersGroup size={16} />
      </div>
      <h3>Genera gruppi</h3>
    </div>
    <div class="contents">
      <p class="desc">
        Inserisci il numero di gruppi da generare e premi &laquo;Genera&raquo; per crearli in massa
        con un colore casuale.
      </p>
      <form id="form-generate-groups" method="POST" action="?/generateGroups" use:enhance>
        <p>
          Genera <input
            type="text"
            name="howMany"
            inputmode="numeric"
            pattern="[0-9]+"
            class="inline"
            style="font-family: monospace; width: calc(2ch + 32px) !important"
            placeholder="20"
          /> gruppi
        </p>
      </form>
    </div>
    <div class="bottom">
      <input type="submit" form="form-generate-groups" value="Genera" />
    </div>
  </div>
</div>
<h2>Gruppi</h2>
<div class="groups-grid">
  {#each data.groups as group (group.number)}
    <Group {group} />
  {/each}
</div>

<h2>Turni</h2>
<div class="groups-grid">
  <!-- Group shifts by day -->
  {#each Object.keys(shiftsByDate) as date}
    <CleaningAggregate shifts={shiftsByDate[date]} />
  {/each}
</div>

<style>
  .widgets {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    gap: 32px;
  }

  .widget {
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: 'Title' 'Contents' 'Bottom';
    background: var(--color-page-bg-mid-contrast);
    border: 1px solid #85190fee;
    box-shadow: 1px 6px 7px -1px var(--color-page-bg-contrast);
    min-width: 400px;
    max-width: 400px;
    border-radius: 8px;
    padding: 16px;
  }

  .widget .title {
    grid-area: Title;
    display: flex;
    align-items: center;
  }

  .widget .title .icon {
    margin-right: 16px;
    padding: 16px;
    line-height: 1;
    font-size: 0;
    max-height: 48px;
    max-width: 48px;
    box-sizing: border-box;
    background: var(--color-page-bg-contrast);
    border-radius: 8px;
  }

  .widget .contents {
    grid-area: Contents;
  }

  .widget p.desc {
    font-size: 14px;
    opacity: 0.75;
    color: var(--color-page-fg);
  }

  .widget .bottom {
    padding-top: 8px;
    grid-area: Bottom;
  }

  .widget :global(input:not(input[type='submit']):not(.inline)) {
    width: 100% !important;
  }

  .widget input[type='submit'] {
    width: 100% !important;
  }

  .widget h3 {
    margin: 0;
  }

  .groups-grid {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    box-sizing: border-box;
    gap: 32px;
  }
</style>
