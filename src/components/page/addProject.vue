<template>
	<div class="model flex" @click.stop="closeModel" v-show="isShow">
		<div class="model-bar" @click.stop>
			<h4>新增项目</h4>
			<form>
				<div>项目名称：</div>
				<input placeholder="新增项目" v-model="projectClass"/>
				<div class="flex">
					<div class="flex flex-column flex-center" style="margin-right: 10px;">
						<div>版本号：</div>
						<input placeholder="版本号" v-model="vction"/>
					</div>
					<div style="width: 162px;">
						<div>项目类型：</div>
						<select v-model="kinds">
							<option v-for="(item,index) in projectList" :key="index">{{item.name}}</option>
						</select>
					</div>
				</div>
				<div>项目说明：</div>
				<input placeholder="项目说明" v-model="shuoMing" @keydown.13="suer"/>
				<div class="mt-40 alert"><a href="javaScript:" class="suer" @click="suer">确定</a><a href="javaScript:" @click.stop="closeModel">取消</a></div>
			</form>
		</div>
	</div>
</template>

<script>
	import qs from 'Qs';
	export default {
		props:['isShow'],
		data (){
			return{
				projectList:[{
					name:'Web'
				},{
					name:'App'
				},{
					name:'PC'
				},{
					name:'硬件/互联网'
				},{
					name:'其他'
				}],
				projectClass:'',
				vction:'',
				kinds:"Web",
				shuoMing:'',
				userPhone:localStorage.userPhone
			}
		},
		methods:{
			suer:function(){
				var _this=this;
				this.$http.post("/data/addList",qs.stringify({
					"projectClass":_this.projectClass,
					"vction":_this.vction,
					"kinds":_this.kinds,
					"shouMing":_this.shuoMing,
					"userphone":_this.userPhone
				})).then(response=>{
					if(response.data.code==1){
						_this.$alert(response.data.msg, '提示', {
				          confirmButtonText: '确定',
				          callback: action => {
				            _this.$emit('ee',false);
				          }
				       });
					}else{
						_this.$alert(response.data.msg, '提示', {
				          confirmButtonText: '确定',
				          callback: action => {
				            
				          }
				       	});
					}
				})
			},
			closeModel:function(){
				this.$emit('ee',false)
			}
		}
	}
</script>
<style>
	.model{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 100;
		background: rgba(0,0,0,.6);
	}
	.model-bar{
		width: 65%;
		min-width: 700px;
		background: #fff;
		padding: 15px;
		margin: auto;
		line-height: 35px;
		border-radius: 5px;
		box-sizing: border-box;
	}
	.model-bar input,select{
		height: 35px;
		border-radius: 3px;
		border: 1px solid #DDD;
		padding: 0px 10px;
		box-sizing: border-box;
		width: 100%;
	}
	input:focus{
		border-color: #2188ff;
	    outline: none;
	    box-shadow: inset 0 1px 2px rgba(27,31,35,0.075), 0 0 0 0.2em rgba(3,102,214,0.3);
	}
	.alert a{
		display: inline-block;
		padding: 0px 25px;
		border-radius: 3px;
		border: 1px solid #DDD;
		margin-right: 10px;
		color: #333;
	}
	.suer{
		background: #4CAF50;
		color: #fff !important;
	}
</style>