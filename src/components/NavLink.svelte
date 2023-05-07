<script lang="ts">
  import { page } from "$app/stores";

  export let href: string;
  export let hidden: boolean;
</script>

<a {href} class:active={href === $page.url.pathname} hidden={hidden ? true : null} {...$$restProps}>
  <slot />
</a>