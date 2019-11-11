<template>
<div>
	<Hedaer/>
	<div class="flex">
		<div class="content-left text-center">
			<ul>
				<li class="ul-active">接口管理</li>
				<li onclick="alert('开发中...')">数据库管理</li>
			</ul>
		</div>
		<div class="content-right flex flex-column">
			<div><a href="javaScript:void(0)" class="new_projct text-center" @click="adds"><i class="el-icon-plus color-fff mr-5"></i>新增项目</a></div>
			<div class="project mt-10">
				<table>
					<tr>
						<th style="min-width: 200px;">项目名称</th>
						<th>版本号</th>
						<th>类型</th>
						<th>最后修改时间</th>
						<th style="text-align: center;">操作</th>
					</tr>
					<tr v-for="(item,key) in listData" :title="item.shou_ming" @click="toPush(item.id)" :key="key">
						<td>{{item.projectClass}}</td>
						<td>{{item.vction}}</td>
						<td>{{item.kinds}}</td>
						<td>{{item.time}}</td>
						<td style="text-align: center;"><i class="el-icon-delete del" @click.stop="del(key,item.id)"></i></td>
					</tr>
				</table>
			</div>
		</div>
	</div>
	<addProject :isShow='show' v-on:ee="incrementTotal"/>
</div>
</template>

<script>
	import qs from 'Qs';
	import Hedaer from './Hedaer'
	import addProject from './addProject'
	export default {
		components:{Hedaer,addProject},
		data (){
			return{
				show:false,
				listData:[],
			}
		},
		created(){
			this.ajaxData();
		},
		methods:{
			del(keys,val){
				var _this=this;
				this.$http.post("/data/deleted",qs.stringify({
					id:val,
				})).then((res)=>{
					if(res.data.code==1){
						_this.$message({
				          message: res.data.msg,
				          type: 'success',
				          duration:1000,
				          showClose:true,
				          onClose:function(){
				          	_this.$router.push({
								path: '/index'
							})
				          }
				       });
						_this.listData.splice(keys,1);
					}
				})
			},
			adds(){
				this.show=true;
			},
			incrementTotal:function(val){
				this.show=val;
				this.ajaxData();
			},
			toPush:function(data){
				this.$router.push({
					path:'/index/apiAdmin?id='+data
				})
			},
			ajaxData(){
				var _this=this;
				_this.$http.get("/data/getList",{params:{
					phone:localStorage.userPhone
				}}).then(reponse=>{
					if(reponse.data.code==1){
						_this.listData=reponse.data.data;
					}
				})
			}
		}
	}
</script>
