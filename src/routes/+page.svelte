<script lang="ts">
  import CleaningAggregate from '../components/CleaningAggregate.svelte';
  import type IShift from '../models/Shift';

  let decoyShift: IShift = {
    group: {
      number: 1,
      members: ['Demetrio Battaglia', 'Riccardo Lussana', 'Benedetta Freddi', 'Antonio Simon'],
      color: '#DE4C8A',
    },
    punishment: false,
    date: new Date(),
    when: 'lunch',
  };
  
  let decoyShiftDinner: IShift = {
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
  #all-shifts {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    box-sizing: border-box;
    gap: 32px;
  }
</style>

<div id="all-shifts">
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
</div>
