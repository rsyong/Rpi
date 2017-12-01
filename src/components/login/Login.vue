<template>
<div class="login">
	<div class="text-center line-height">
		<img src="../../assets/logo.png" class="logo_index"/>
		<h3>{{title}}</h3>
	</div>
	<div class="login_bar mt-20">
		<p>手机号</p>
		<input placeholder="请输入你的手机号" v-model="phone" tabindex="1"/>
		<p>密码<a href="javaScript:void(0)" class="forgrt text-decoration" @click="forgrt">忘记密码?</a></p>
		<input placeholder="请输入你的密码" type="password" v-model="pwd" tabindex="2" @keyup.13="login"/>
		<a href="javaScript:void(0)" class="login_btn text-center color-fff mt-10 text-decoration" @click="login" tabindex="3">登录</a>
	</div>
	<div class="login_bar mt-20 text-center">
		新到Rpi， <a href="javaScript:void(0)" class="text-decoration" @click="register">创建一个账号</a> 。
	</div>
</div>
</template>

<script>
	export default {
		name: 'Login',
		data (){
			return {
				title:"登录Rpi",
				phone:'',
				pwd:''
			}
		},
		methods:{
			forgrt:function(){
				this.$router.push({
					path: '/login/Forget'
				})
			},
			register:function(){
				this.$router.push({
					path: '/login/Register'
				})
			},
			login:function(){
				var _this=this;
				this.$http.get("/login2.php",{params:{
					"phone":_this.phone,
					"pwd":_this.pwd
				}}).then(function(data){
					if(data.data.type==1){
						localStorage.userPhone=_this.phone;
						_this.$router.push({
							path: '/index'
						})
					}else if(data.data.type==0){
						alert(data.data.msg)
					}
				}).catch(function(){
					
				})
			}
		}
	}
</script>