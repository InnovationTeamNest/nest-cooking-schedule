<script lang="ts">
  import '../../assets/main.css';
  import type { PageData } from '../$types';
  import { loggedUser } from '../../stores/app';
  import { onMount } from 'svelte';
  import NavLink from '../../components/NavLink.svelte';

  export let data: PageData;
</script>

<main>
  <nav>
    <h1>Direttivo</h1>
    <NavLink href="/admin">Dashboard</NavLink>
    <NavLink href="/admin/groups">Gruppi</NavLink>
    <NavLink href="/admin/shifts">Turni</NavLink>
    <NavLink href="/admin/users">Utenti</NavLink>
  </nav>
  <slot />
</main>

<style>
  nav {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-bottom: 1rem;
    gap: 32px;
  }

  nav h1 {
    margin-right: 12px;
  }

  nav :global(a) {
    text-decoration: none;
    font-family: Arvo;
    font-weight: bold;
    font-size: 14px;
    padding: 8px 16px;
    border-radius: 16px;
    transition: opacity 0.2s ease-in-out;
  }

  nav :global(a.active) {
    background-color: var(--color-cooking-club-fg);
    color: white;
  }

  nav :global(a:not(.active)) {
    background-color: transparent;
    opacity: 0.35;
    color: var(--color-text);
  }

  nav :global(a:not(.active):hover) {
    opacity: 0.75;
  }
</style>
