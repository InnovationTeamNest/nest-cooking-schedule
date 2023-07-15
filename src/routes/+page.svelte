<script lang="ts">
	import CleaningAggregate from '../components/CleaningAggregate.svelte';
	import type IShift from '../models/Shift';

	export let data;

	$: shiftsByDate = data.shifts.reduce((acc: { [key: string]: IShift[] }, shift) => {
		const date = shift.date.toISOString();
		if (!acc[date]) acc[date] = [];
		acc[date].push(shift);
		return acc;
	}, {});
</script>

<div id="all-shifts">
	{#each Object.keys(shiftsByDate) as shiftDate}
		<CleaningAggregate shifts={shiftsByDate[shiftDate]} />
	{/each}
</div>

<style>
	#all-shifts {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		box-sizing: border-box;
		gap: 32px;
	}
</style>
