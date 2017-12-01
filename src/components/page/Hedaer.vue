<template>
	<header>
		<div class="logo">
			<img src="../../assets/logo.png"/>
			<span>项目api接口管理</span>
		</div>
		<div class="user">欢迎你：{{user}}</div>
	</header>
</template>

<script>
	export default{
		name:'Hedaer',
		data(){
			return{
				user:localStorage.userPhone
			}
		}
	}
</script>