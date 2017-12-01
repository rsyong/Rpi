<template>
<div class="login">
	<div class="text-center line-height">
		<img src="../../assets/logo.png" class="logo_index"/>
		<h3>{{title}}</h3>
	</div>
	<div class="login_bar mt-20">
		<p>请输入您的手机号</p>
		<input placeholder="请输入你的手机号" />
		<a href="javaScript:void(0)" class="login_btn text-center color-fff mt-10 text-decoration">发送</a>
	</div>
</div>
</template>

<script>
	export default {
		data:function(){
			return {
				title:"重置你的密码"
			}
		}
	}
</script>