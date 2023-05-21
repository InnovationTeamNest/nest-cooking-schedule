<div class="group">
  <div class="title">
    <div class="icon">
      <IconUsersGroup size={24} />
    </div>
    <div class="number">
      Gruppo { group.number }
    </div>
  </div>
  <div class="members">
    {#each group.members as member (member.id)}
      <li>{ member.fullName }</li>
    {/each}
  </div>
</div>

<script lang="ts">
import { DateTime } from 'luxon';
import CleaningShift from './CleaningShift.svelte';
import { IconUsersGroup } from '@tabler/icons-svelte';
import type IGroup from '../models/Group';

export let group: IGroup;
</script>

<style>
.group {
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

.number {
  font-family: Arvo;
  font-weight: bold;
}

.members {
  filter: drop-shadow(0px -2px 8px rgba(0, 0, 0, 0.15));
}

.members > :global(.shift:not(:last-child)) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.members > :global(.shift:first-child) {
  border-radius: 16px 16px 0 0;
}

.members > :global(.shift:not(:first-child):not(:last-child)) {
  border-radius: 0;
}

.members > :global(.shift:last-child) {
  border-radius: 0 0 16px 16px;
}
</style>
