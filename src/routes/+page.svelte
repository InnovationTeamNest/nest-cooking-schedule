<script lang="ts">
  import CleaningAggregate from '../components/CleaningAggregate.svelte';
  import type Shift from '../models/Shift';
  import type { PageData } from './$types';
  import { loggedUser } from '../stores/app';
	import { onMount } from 'svelte';

  export let data: PageData;

  onMount(() => {
    console.log("Setting loggedUser (client): ", data.user);
    loggedUser.set(data.user);
  });

  let decoyShift: Shift = {
    group: {
      number: 1,
      members: ['Demetrio Battaglia', 'Riccardo Lussana', 'Benedetta Freddi', 'Antonio Simon'],
      color: '#DE4C8A',
    },
    punishment: false,
    date: new Date(),
    when: 'lunch',
  };
  
  let decoyShiftDinner: Shift = {
    group: {
      number: 2,
      members: ['Demetrio Battaglia', 'Riccardo Lussana', 'Benedetta Freddi', 'Antonio Simon'],
      color: '#D6AE01',
    },
    punishment: false,
    date: new Date(),
    when: 'dinner',
  };
</script>

<style>
  main {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 48px 64px;
    box-sizing: border-box;
    gap: 32px;
  }
</style>
    
<main>
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
  <CleaningAggregate shifts={[decoyShift, decoyShiftDinner]} />
</main>
