<script lang="ts">
	import { IconUsersGroup, IconSun } from '@tabler/icons-svelte';
	import type IGroup from '../models/Group';

	export let group: IGroup;
</script>

<div class="group" style:background={group.color}>
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
			<li>{member.fullName}</li>
		{/each}
		{#each Array.from({ length: 5 - group.members.length }) as _}
			<li class="no-member">vuoto</li>
		{/each}
	</ol>
</div>

<style>
	.group {
		width: 400px;
		border-radius: 16px;
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
		border-radius: 16px;
		background: var(--color-card-bg);
		margin: 0;
		padding: 0;
		list-style-type: none;
	}

	.members > li {
		padding: 12px 16px;
		border-bottom: 1px solid var(--color-card-bg-contrast);
		counter-increment: list-item;
	}

	.members > li::before {
		content: counter(list-item) '.';
		margin-right: 1ch;
		font-family: Arvo;
		font-weight: bold;
		user-select: none;
	}

	.members > .no-member {
		opacity: 0.5;
	}
</style>
