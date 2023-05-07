<script>
  import { page } from '$app/stores';
</script>
{#if $page.error}
<div class="error">
  <h1>{$page.status}</h1>
  <p><b>Message:</b> {$page.error.message}</p>
</div>
{/if}