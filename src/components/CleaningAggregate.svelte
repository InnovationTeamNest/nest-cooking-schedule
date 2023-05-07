<div class="aggregate">
  <div class="title">
    <div class="icon"><IconSpray /></div>
    <div class="date">
      { date.toLocaleString('it-IT', { weekday: 'short' }) }
      {
        date.toLocaleString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      }
    </div>
    <div class="week">Settimana { DateTime.fromJSDate(date).weekNumber }</div>
  </div>
  <div class="shifts">
    {#each shifts as shift (shift.group.number)}
      <CleaningShift {shift} />
    {/each}
  </div>
</div>

<script lang="ts">
import { DateTime } from 'luxon';
import CleaningShift from './CleaningShift.svelte';
import { IconSpray } from '@tabler/icons-svelte';
import type Shift from '../models/Shift';

export let shifts: Shift[];

$: date = shifts.map((x) => x.date).sort()[0];
</script>

<style>
.aggregate {
  border-radius: 16px;
  width: fit-content;
  height: fit-content;
  background: var(--color-card-bg);
  box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.title {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.date {
  text-transform: uppercase;
  font-family: Arvo;
  font-weight: bold;
}

.week {
  font-family: Arvo;
  font-weight: bold;
  margin-left: auto;
  opacity: 0.25;
}

.shifts {
  filter: drop-shadow(0px -2px 8px rgba(0, 0, 0, 0.15));
}

.shifts > :global(.shift:not(:last-child)) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.shifts > :global(.shift:first-child) {
  border-radius: 16px 16px 0 0;
}

.shifts > :global(.shift:not(:first-child):not(:last-child)) {
  border-radius: 0;
}

.shifts > :global(.shift:last-child) {
  border-radius: 0 0 16px 16px;
}
</style>
