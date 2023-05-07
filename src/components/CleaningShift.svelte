<div class="shift" style:background={shift.group.color}>
  <div class="group">{ shift.group.number }</div>
  <div class="type">
    { shift.punishment ? 'Punizione' : 'Ordinario' }
  </div>
  <div class="when {shift.when}">
    {#if shift.when === 'lunch'}
    <IconSun color="white" />
    {:else}
    <IconMoon color="white" />
    {/if}
  </div>
</div>

<script lang="ts">
import type Shift from '../models/Shift';
import { IconSun, IconMoon } from '@tabler/icons-svelte';

export let shift: Shift;
</script>

<style>
.shift {
  font-family: Arvo;
  width: 400px;
  height: fit-content;
  padding: 16px 16px 16px 24px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.55);
}

.group {
  font-weight: bold;
  font-size: 30px;
  width: 64px;
  text-align: center;
  margin-right: 24px;
}

.date {
  font-weight: bold;
}

.type {
  width: 100%;
  text-transform: uppercase;
  font-weight: bold;
}

.when {
  font-size: 16px;
  font-weight: bold;
  padding: 16px;
  border-radius: 16px;
  text-transform: uppercase;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.when.lunch {
  background: var(--color-daylight-bg);
}

.when.dinner {
  background: var(--color-nighttime-bg);
}

.when.lunch::after {
  content: 'Pranzo';
}

.when.dinner::after {
  content: 'Cena';
}
</style>
