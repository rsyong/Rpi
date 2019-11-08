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
		<input placeholder="请输入你的手机号" v-model="phone"/>
		<p>密码</p>
		<input placeholder="请输入你的密码" type="password" v-model="pwd"/>
		<p>确认密码</p>
		<input placeholder="请再输入你的密码" type="password" v-model="suerPwd" @keyup.13="register"/>
		<a href="javaScript:void(0)" class="login_btn text-center color-fff mt-10 text-decoration" @click="register">注册</a>
	</div>
</div>
</template>

<script>
	import qs from 'Qs'
	export default {
		name: 'register',
		data (){
			return {
				title:"注册Rpi",
				phone:'',
				pwd:'',
				suerPwd:''
			}
		},
		methods:{
			register(){
				if(this.phone==''){
					alert("手机号不能为空");
					return;
				}else if(this.pwd=='' || this.suerPwd==''){
					alert("密码不能为空");
					return;
				}else if(this.pwd!=this.suerPwd){
					alert("密码不一致");
					return;
				}
				var that=this;
				this.$http.post('/user/register',qs.stringify({
					"username":that.phone,
					"password":that.pwd
				})).then(response => {
				 	if(response.data.code=="1"){
				 		that.$alert(response.data.msg, '提示', {
				          confirmButtonText: '确定',
				          callback: action => {
				            
				          }
				       });
				 	}else{
				 		that.$alert(response.data.msg, '提示', {
				          confirmButtonText: '确定',
				          callback: action => {
				            
				          }
				       });
				 	}
				}, response => {
				    // error callback 
				});
				
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