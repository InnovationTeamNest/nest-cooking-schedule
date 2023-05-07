<script lang="ts">
  import CleaningAggregate from '../components/CleaningAggregate.svelte';
  import type Shift from '../models/Shift';

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
  :global(main) {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 48px 64px;
    box-sizing: border-box;
    gap: 32px;
  }
</style>
    
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
