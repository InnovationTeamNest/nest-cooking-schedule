<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  import { IconUsersGroup, IconGripVertical } from '@tabler/icons-svelte';
  import { contrast } from '$lib/colors';
  import type IGroup from '../models/Group';

  let dropTargetCounter = 0;
  let isEasterEgg = false;
  let deactivateEgg: NodeJS.Timeout;
  $: isDropTarget = dropTargetCounter > 0 && !isEasterEgg;

  function attemptEasterEgg(e: DragEvent) {
    if (!(e.dataTransfer!.files.length > 0)) {
      return;
    }

    clearInterval(deactivateEgg);

    isEasterEgg = true;
    deactivateEgg = setTimeout(() => {
      isEasterEgg = false;
    }, 5000);
  }

  export let group: IGroup;
</script>

<div
  class="group"
  class:drop-target={isDropTarget}
  class:easter={isEasterEgg}
  style:border-left-color={group.color}
  on:dragenter={(e) => {
    dropTargetCounter++;
  }}
  on:dragleave={(e) => {
    dropTargetCounter--;
  }}
  on:drop={(e) => {
    attemptEasterEgg(e);
    dropTargetCounter = 0;
    dispatch('memberDrop', { event: e, groupNumber: group.number });
  }}
  on:dragover={(e) => e.preventDefault()}
>
  <div class="title">
    <div class="icon">
      <IconUsersGroup size={24} />
    </div>
    <div class="number">
      Gruppo n. {group.number}
    </div>
  </div>
  <ol class="members">
    {#each group.members as member (member.id)}
      <li
        draggable={true}
        on:dragstart={(e) =>
          dispatch('memberDragStart', {
            event: e,
            groupNumber: group.number,
            memberNumber: group.members.findIndex((x) => x.fullName == member.fullName)
          })}
      >
        {member.fullName}<IconGripVertical size={20} />
      </li>
    {/each}
    {#each [...Array(5 - group.members.length).keys()] as _}
      <li class="no-member">vuoto</li>
    {/each}
  </ol>
</div>

<style>
  @keyframes rainbow-border-external {
    0% {
      box-shadow: inset 1px 0px 0px red, 0px 2px 8px 1px rgba(0, 0, 0, 0.2), 0 0 0 1px red;
      background: linear-gradient(-12deg, red, orange, #dada09, green, blue, violet);
    }
    16% {
      box-shadow: inset 1px 0px 0px orange, 0px 2px 8px 1px rgba(0, 0, 0, 0.2), 0 0 0 1px orange;
      background: linear-gradient(-12deg, orange, #dada09, green, blue, violet, red);
    }
    33% {
      box-shadow: inset 1px 0px 0px #dada09, 0px 2px 8px 1px rgba(0, 0, 0, 0.2), 0 0 0 1px #dada09;
      background: linear-gradient(-12deg, #dada09, green, blue, violet, red, orange);
    }
    50% {
      box-shadow: inset 1px 0px 0px green, 0px 2px 8px 1px rgba(0, 0, 0, 0.2), 0 0 0 1px green;
      background: linear-gradient(-12deg, green, blue, violet, red, orange, #dada09);
    }
    66% {
      box-shadow: inset 1px 0px 0px blue, 0px 2px 8px 1px rgba(0, 0, 0, 0.2), 0 0 0 1px blue;
      background: linear-gradient(-12deg, blue, violet, red, orange, #dada09, green);
    }
    83% {
      box-shadow: inset 1px 0px 0px indigo, 0px 2px 8px 1px rgba(0, 0, 0, 0.2), 0 0 0 1px indigo;
      background: linear-gradient(-12deg, indigo, red, orange, #dada09, green, blue);
    }
    100% {
      box-shadow: inset 1px 0px 0px violet, 0px 2px 8px 1px rgba(0, 0, 0, 0.2), 0 0 0 1px violet;
      background: linear-gradient(-12deg, violet, red, orange, #dada09, green, blue);
    }
  }

  @keyframes rainbow-border-title {
    0% {
      color: red;
      border-bottom-color: red;
    }
    16% {
      color: orange;
      border-bottom-color: orange;
    }
    33% {
      color: #dada09;
      border-bottom-color: #dada09;
    }
    50% {
      color: green;
      border-bottom-color: green;
    }
    66% {
      color: blue;
      border-bottom-color: blue;
    }
    83% {
      color: indigo;
      border-bottom-color: indigo;
    }
    100% {
      color: violet;
      border-bottom-color: violet;
    }
  }

  .group {
    --g-border-color: var(--color-page-bg-contrast);
    border-radius: 16px;
    background: var(--color-card-bg);
    border-left-width: 8px;
    border-left-style: solid;
    box-shadow: inset 1px 0px 0px var(--g-border-color), 0px 2px 8px 1px rgba(0, 0, 0, 0.2),
      0 0 0 1px var(--g-border-color);
    overflow: hidden;
  }

  .group.drop-target {
    --g-border-color: var(--color-cooking-club-fg);
  }

  .group.drop-target .title {
    color: var(--g-border-color);
  }

  .group.easter {
    animation: rainbow-border-external 0.15s linear infinite;
  }

  .group.easter .title {
    animation: rainbow-border-title 0.5s linear infinite;
  }

  .title {
    padding: 12px 16px;
    border-bottom: 1px solid var(--g-border-color);
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .number {
    font-family: Arvo;
    font-weight: bold;
  }

  .members {
    display: flex;
    gap: 12px;
    padding: 12px 16px 16px 16px;
    border-radius: 16px;
    margin: 0;
    list-style-type: none;
  }

  .members > li {
    display: block;
    background: var(--color-page-bg-mid-contrast);
    padding: 12px 16px;
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15));
    border: 1px solid var(--color-page-bg-contrast);
    border-radius: 12px;
    counter-increment: list-item;
  }

  .members > li::before {
    content: counter(list-item) '.';
    margin-right: 1ch;
    font-family: Arvo;
    font-weight: bold;
    user-select: none;
  }

  .members > li > :global(svg) {
    vertical-align: middle;
    opacity: 0.5;
    cursor: grab;
    margin-left: 12px;
    margin-right: -6px;
  }

  .members > .no-member {
    opacity: 0.5;
  }
</style>
