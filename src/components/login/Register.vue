<template>
<div class="login">
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
				this.$http.get('/login.php',{params:{
					"phone":that.phone,
					"pwd":that.pwd
				}}).then(response => {
				 	if(response.data.type=="1"){
				 		alert(response.data.msg);
				 	}else if(response.data.type=="0"){
				 		alert(response.data.msg);
				 	}
				}, response => {
				    // error callback 
				});
				
			}
		}
	}
</script>