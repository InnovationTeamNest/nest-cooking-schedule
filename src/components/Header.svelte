<script lang="ts">
	import TelegramLogin from './TelegramLogin.svelte';
	import CookingLogo from '../assets/logo-cooking.png';
	import { IconCalendar, IconDoor, IconDoorExit, IconLogout, IconSettings } from '@tabler/icons-svelte';
	import { loggedUser, logout } from '../stores/app';
	$: loggedIn = !!$loggedUser;
</script>

<header>
	<div class="logo">
		<img src={CookingLogo} alt="logo" />
	</div>
	<div class="title">
		<h1>COOKING CLUB</h1>
		<h2>Turni di pulizia</h2>
	</div>
	<div class="right">
		<button class="logout" hidden={!loggedIn} on:click={logout}>
			<IconLogout size={24} />
		</button>
		<button class="settings" hidden={!loggedIn}>
			<IconSettings size={24} />
		</button>
		<button class="calendar" hidden={!loggedIn}>
			<IconCalendar size={24} />
		</button>
		<div class="user">
			<TelegramLogin mode="callback" requestAccess="write" telegramLogin="NESTCookingBot" />
		</div>
	</div>
</header>


<style>
header {
	display: flex;
	align-items: center;
	padding: 64px 64px 0 64px;
	gap: 32px;
}

.logo {
	width: 100px;
	height: 100px;
}

.logo img {
	width: 100%;
	height: 100%;
}

.title {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.title h1,
.title h2 {
	margin: 0;
}

.title h1 {
	font-family: Arvo;
	font-size: 24px;
	font-weight: bold;
	color: var(--color-cooking-club-fg);
}

.title h2 {
	font-weight: 600;
	font-size: 24px;
}

.right {
	display: flex;
	align-items: center;
	margin-left: auto;
	gap: 8px;
}

.right .user {
	margin-left: 8px;
}

.right > button {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 16px;
	border-radius: 8px;
	background: none;
	border: 0;
	color: inherit;
}

.right > button.logout {
	color: rgb(199, 35, 35);
}

.right > button:hover {
	background: var(--color-button-hover);
	cursor: pointer;
}

@media (prefers-color-scheme: dark) {
	.right > button:hover {
		background: var(--color-button-hover);
	}
}
</style>
