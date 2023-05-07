<script lang="ts">
  import "../assets/main.css";
	import Footer from "../components/Footer.svelte";
	import Header from "../components/Header.svelte";
  import type { PageData } from './$types';
  import { loggedUser } from '../stores/app';
	import { onMount } from 'svelte';

  export let data: PageData;

  onMount(() => {
    console.log("Setting loggedUser (client): ", data.user);
    loggedUser.set(data.user);
  });
</script>

<Header />
<main>
  <slot />
</main>
<Footer />