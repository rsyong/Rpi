<template>
<div class="login">
	<div class="back">
		
	</div>
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
	import qs from 'Qs'
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
				this.$http.post("/user/login",qs.stringify({
					username:_this.phone,
					password:_this.pwd
				})).then(function(data){
					var data=data.data;
					if(data.code==1){
						localStorage.userPhone=_this.phone;
						_this.$message({
				          message: '登录成功',
				          type: 'success',
				          duration:600,
				          showClose:true,
				          onClose:function(){
				          	_this.$router.push({
								path: '/index'
							})
				          }
				       });
					}else{
						_this.$message({
				          message: data.msg,
				          type: 'error',
				          duration:3000,
				          showClose:true,
				       	});
					}
				}).catch(function(){
					_this.$message({
			          message: "登录失败",
			          type: 'error',
			          duration:3000,
			          showClose:true,
			       	});
				})
			}
		}
	}
</script>
<style>
.back{
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: url(../../assets/bg.jpg) center center no-repeat;
	background: cover 100%;
	z-index: -1;
}
.login_bar,.login_bar input{
	background: rgba(255,255,255,0.2);
}
a{
	transition: 500ms;
}
.login_btn:hover{background: green;}
</style>