<template>
	<div class="model flex"  v-show="isShow" @click.stop="close">
		<div class="model-bar" @click.stop>
			<h4>接口管理</h4>
			<form>
				<div class="flex">
					<div class="flex mr-10">
						<div>接口名称：</div>
						<input class="flex" placeholder="接口名称" v-model="mydata.name" type="text" :readonly="mydata.isEdit"/>
					</div>
					<div class="flex">
						<div class="flex mr-10">
							<div>方法：</div>
							<select class="flex" v-model="mydata.moth" :disabled="mydata.isEdit">
								<option v-for="item in ['get','post']">{{item}}</option>
							</select>
						</div>
						<div class="flex">
							<div>分组：</div>
							<select class="flex" v-model="mydata.gorund" :disabled="mydata.isEdit" v-if="mydata.isEdit">
								<option v-for="item in listGround">{{item.name}}</option>
							</select>
							<select class="flex"  v-model="gorund" v-if="!mydata.isEdit">
								<option v-for="item in listGround">{{item.name}}</option>
							</select>
						</div>
					</div>
				</div>
				<div>接口地址：</div>
				<input placeholder="接口地址" v-model="mydata.api_url" :readonly="mydata.isEdit"/>
				<div class="rep">请求参数：</div>
				<div class="flex mb-10" v-for="(item,key) in mydata.canshu">
					<div class="flex mr-10">
						<input placeholder="参数名" v-model="item.name" :readonly="mydata.isEdit"/>
					</div>
					<div class="flex mr-10">
						<input placeholder="参数说明" v-model="item.valus" :readonly="mydata.isEdit"/>
					</div>
					<div class="add text-center border-radius-3 mr-10 transition-500" @click="addNode(1)" v-if="!mydata.isEdit">+</div>
					<div class="add text-center border-radius-3 transition-500" @click="delNode(1,key)" v-if="!mydata.isEdit">-</div>
				</div>
				<div class="rep">返回参数：</div>
				<div class="flex mb-10" v-for="(item,key) in mydata.fanhui">
					<div class="flex mr-10">
						<input placeholder="参数名" v-model="item.name" :readonly="mydata.isEdit"/>
					</div>
					<div class="flex mr-10">
						<input placeholder="参数说明" v-model="item.valus" :readonly="mydata.isEdit"/>
					</div>
					<div class="add text-center border-radius-3 mr-10 transition-500" @click="addNode(2)" v-if="!mydata.isEdit">+</div>
					<div class="add text-center border-radius-3 transition-500" @click="delNode(2,key)" v-if="!mydata.isEdit">-</div>
				</div>
				<div class="mt-40 alert">
					<a href="javaScript:" class="suer" @click.stop="suer" v-if="!mydata.isEdit">确定</a>
					<a href="javaScript:" class="suer" @click.stop="close" v-if="mydata.isEdit">确定</a>
					<a href="javaScript:" @click.stop="close">关闭</a>
					<a href="javaScript:" v-if='false'>修改</a>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	export default {
		props:['isShow','mydata'],
		data (){
			return{
				listGround:[{}],
				name:'',
				moth:'get',
				gorund:'所有分组',
				urls:'',
				canshu:[{name:'',valus:''}],
				fanhui:[{name:'',valus:''}],
			}
		},
		mounted() {
			var _this=this;
			this.$http.get("serachGround.php",{params:{
				"userid":_this.$route.query.userid
			}}).then(reponse=>{
				if(reponse.data.type==1){
					_this.listGround=reponse.data.data;
				}else{
					alert(reponse.data.msg)
				}
			})
		},
		methods:{
			suer:function(){
				var _this=this;
				var groundID='null';
				for(var o in _this.listGround){
					if(_this.listGround[o].name==_this.gorund){
						groundID=_this.listGround[o].ground_id;
						break;
					} 
			    }  
				this.$http.get("/addProject.php",{params:{
					"name":_this.mydata.name,
					"moth":_this.mydata.moth,
					"gorund":_this.gorund,
					"api_url":_this.mydata.api_url,
					"canshu":JSON.stringify(_this.mydata.canshu),
					"fanhui":JSON.stringify(_this.mydata.fanhui),
					"uuid":_this.$route.query.userid,
					"phone":localStorage.userPhone,
					"gorund_id":groundID,
				}}).then(reponse=>{
					if(reponse.data.type==1){
						_this.$emit("show",{"shows":false,"add":true})
					}
					alert(reponse.data.msg)
				})
			},
			close:function(){
				this.$emit("show",{"shows":false})
			},
			addNode(inx){
				if(inx==1){
					this.mydata.canshu.push({name:'',valus:''})
				}else{
					this.mydata.fanhui.push({name:'',valus:''})
				}
			},
			delNode(inx,val){
				if(val==0){
					return;
				}
				if(inx==1){
					this.mydata.canshu.splice(val,1)
				}else{
					this.mydata.fanhui.splice(val,1)
				}
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
		height: auto;
		max-height: 90%;
		transition: 500ms;
		overflow-y: auto;
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
	.rep{
		color: #4CAF77;
	}

</style>