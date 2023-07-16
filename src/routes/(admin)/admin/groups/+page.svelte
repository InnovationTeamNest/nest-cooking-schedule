<script lang="ts">
  import GroupCompact from '../../../../components/GroupCompact.svelte';
  export let data;
  console.log(data.groups);

  function dragStart(svelteEvent: CustomEvent) {
    const {
      event,
      groupNumber,
      memberNumber
    }: { event: DragEvent; groupNumber: number; memberNumber: number } = svelteEvent.detail;
    // The data we want to make available when the element is dropped
    // is the index of the item being dragged and
    // the index of the basket from which it is leaving.
    const data = { groupNumber, memberNumber };
    event.dataTransfer!.setData('text/plain', JSON.stringify(data));
  }

  function drop(svelteEvent: CustomEvent) {
    const { event, groupNumber }: { event: DragEvent; groupNumber: number } = svelteEvent.detail;
    event.preventDefault();

    // Check if it's files
    if (event.dataTransfer!.files.length > 0) {
      console.log('OK, for real?', event);
      return;
    }

    const json = event.dataTransfer!.getData('text/plain');
    const srcGroupData = JSON.parse(json);

    if (srcGroupData.groupNumber === groupNumber) {
      return;
    }

    const [item] = data.groups[srcGroupData.groupNumber - 1].members.splice(
      srcGroupData.memberNumber,
      1
    );

    data.groups[groupNumber - 1].members.push(item);
    data.groups = data.groups;
  }
</script>

<h2>Gruppi</h2>
<div class="groups">
  {#each data.groups as group (group._id)}
    <GroupCompact {group} on:memberDragStart={dragStart} on:memberDrop={drop} />
  {/each}
</div>

<style>
  .groups {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>
