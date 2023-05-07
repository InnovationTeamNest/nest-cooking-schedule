<div bind:this={telegram} hidden={loggedIn}></div>
<div class="user-data" hidden={!loggedIn}>
  <div class="name">
    <div class="full-name">{ $loggedUser?.fullName }</div>
    <div class="username">
      { $loggedUser?.telegram.handle }
    </div>
  </div>
  <div class="picture">
    <img alt="User" src={$loggedUser?.photoUrl} />
  </div>
</div>

<script lang="ts">
import { onMount } from 'svelte';
import { logout } from '../stores/app';
import type { UserInfo } from '../stores/app';
import { createEventDispatcher } from 'svelte';
import { getContext } from 'svelte';
import type { IStudent } from '$lib/server/models/Student';
import { loggedUser } from '../stores/app';

export let mode: 'callback' | 'redirect';
export let telegramLogin: string;
export let redirectUrl: string = '';
export let requestAccess: 'read' | 'write' = 'read';
export let size: 'small' | 'medium' | 'large' = 'large';
export let userpic: boolean = true;
export let radius: string = '20';

$: loggedIn = !!$loggedUser;
let user: UserInfo | null = null;

const dispatch = createEventDispatcher<{
  auth: UserInfo;
  loaded: null
}>();

async function onTelegramAuth(authUser: UserInfo) {
  let signIn = await fetch("/api/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authUser),
    credentials: "same-origin"
  });

  $loggedUser = await signIn.json() as IStudent;
  
  dispatch('auth', authUser);
}

let telegram: HTMLElement | null = null;
onMount(() => {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://telegram.org/js/telegram-widget.js?3';

  script.setAttribute('data-size', size);

  if (!userpic) script.setAttribute('data-userpic', 'false');

  script.setAttribute('data-telegram-login', telegramLogin);
  script.setAttribute('data-request-access', requestAccess);

  script.onload = () => {
    dispatch('loaded');
  };

  if (radius) script.setAttribute('data-radius', radius);

  if (mode === 'callback') {
    // @ts-ignore
    window.onTelegramAuth = onTelegramAuth;
    script.setAttribute('data-onauth', 'window.onTelegramAuth(user)');
  } else {
    script.setAttribute('data-auth-url', redirectUrl);
  }

  if (telegram && telegram instanceof HTMLElement) telegram.appendChild(script);
});
</script>

<style>
.user-data {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-data .name {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: right;
}

.user-data .name .full-name {
  font-weight: bold;
  font-size: 20px;
}

.user-data .name .username {
  font-size: 16px;
  color: var(--color-soft-fg);
}

.user-data .name .username::before {
  content: '@';
}

.user-data .picture {
  --size: 100px;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  overflow: hidden;
}

.user-data .picture img {
  width: 100%;
  height: 100%;
}
</style>
