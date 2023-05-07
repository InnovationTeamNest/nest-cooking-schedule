<script lang="ts">
  import { IconCalendar, IconUsersGroup } from '@tabler/icons-svelte';
import { DateInput } from 'date-picker-svelte';
  import { DateTime } from "luxon";

  let until = new Date();
</script>

<h1>Direttivo</h1>
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
      <form id="form-generate-turns">
        <label for="until">Fino al</label>
        <DateInput format="dd/MM/yyyy" browseWithoutSelecting={true} closeOnSelection={true} placeholder={ DateTime.now().toFormat("dd/MM/yyyy")} bind:value={until} />
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
      <p class="desc">Inserisci il numero di gruppi da generare e premi &laquo;Genera&raquo; per crearli in massa con un colore casuale.</p>
      <form id="form-generate-groups">
        <p>Genera <input type="text" inputmode="numeric" pattern="[0-9]+" class="inline" style="font-family: monospace; width: calc(2ch + 32px) !important" placeholder="20" /> gruppi</p>
      </form>
    </div>
    <div class="bottom">
      <input type="submit" form="form-generate-groups" value="Genera" />
    </div>
  </div>
</div>
<h2>Gruppi</h2>
<h2>Turni</h2>

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
    border: 1px solid #85190FEE;
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

  .widget :global(input:not(input[type=submit]):not(.inline)) {
    width: 100% !important;
  }

  .widget input[type=submit] {
    width: 100% !important;
  }

  .widget h3 {
    margin: 0;
  }
</style>