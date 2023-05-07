<script lang="ts">
	import TelegramLogin from './TelegramLogin.svelte';
	import CookingLogo from '../assets/logo-cooking.png';
</script>


<header>
	<div class="logo">
		<img src={CookingLogo} alt="logo" />
	</div>
	<div class="title">
		<h1>COOKING CLUB</h1>
		<h2>Turni di pulizia</h2>
	</div>
	<div class="login">
		<TelegramLogin mode="callback" requestAccess="write" telegramLogin="NESTCookingBot" />
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

.login {
	margin-left: auto;
}
</style>
