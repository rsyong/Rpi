<template>
<div>
	<Hedaer/>
	<div class="flex">
		<div class="content-left text-center">
			<ul>
				<li v-for="(item,key) in ['API接口','状态码']" :class="[key==isactive ? 'ul-active':'']" @click="changeActive(1,key)">{{item}}</li>
			</ul>
		</div>
		<div class="content-right flex flex-column">
			<div>
				<a href="javaScript:void(0)" class="new_projct text-center" @click="newGroun">+ 新建分组</a>
				<a href="javaScript:void(0)" class="new_projct text-center" style="margin-left: 150px;" @click="addApi(1)">+ 添加接口</a>
			</div>
			<div class="flex mt-20 border border-radius-3">
				<div class="gorun">
					<h4>分组</h4>
					<ul>
						<li v-for="(item,key) in groun" :class="[key==isactiveGroun ? 'ul-active':'']" @click="changeActive(2,key,item)">{{item.name}}</li>
					</ul>
				</div>
				<div class="flex">
					<table class="api_table">
						<tr>
							<td>ID</td>
							<td>接口名称</td>
							<td>接口URL</td>
							<td>更新日期</td>
							<td class="text-center">操作</td>
						</tr>
						<tr v-for="(item,key) in apiData" @click.stop="addApi(2,item)">
							<td style="width: 30px;"><span class="moths key">{{key+1}}</span></td>
							<td>{{item.name}}</td>
							<td><span class="moths">{{item.moth}}</span>{{item.api_url}}</td>
							<td>{{item.time}}</td>
							<td class="text-center"><i class="el-icon-delete del" @click.stop="del(key,item.id)"></i></td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
	<apiShow :isShow='show' v-on:show="incrementTotal" :mydata="mydata"/>
</div>
</template>

<script>
	import Hedaer from './Hedaer'
	import apiShow from './apiShow'
	export default {
		components:{Hedaer,apiShow},
		data(){
			return{
				show:false,
				groun:[{}],
				isactive:0,
				isactiveGroun:0,
				apiData:[{}],
				mydata:{},
				groundID:'0000000000000',
			}
		},
		mounted(){
			var _this=this;
			this.$http.get("showList.php",{params:{
				"phone":localStorage.userPhone,
				"uuid":_this.$route.query.userid,
				"ground_id":_this.groundID,
			}}).then(reponse=>{
				if(reponse.data.type==1){
					_this.apiData=reponse.data.data;
				}else{
					alert(reponse.data.msg)
				}
			})
			this.$http.get("serachGround.php",{params:{
				"userid":_this.$route.query.userid
			}}).then(reponse=>{
				if(reponse.data.type==1){
					_this.groun=reponse.data.data;
				}else{
					alert(reponse.data.msg)
				}
			})
		},
		computed:{
			
		},
		methods:{
			del(keys,val){
				this.$http.get("delA.php",{params:{
					id:val,
				}}).then((res)=>{
					if(res.data.type==1){
						this.apiData.splice(keys,1);
					}
					alert(res.data.msg);
				})
			},
			incrementTotal(val){
				this.show=val.shows;
				if(val.add){
					this.ajaxData();
				}
			},
			ajaxData(num){
				var _this=this;
				this.$http.get("showList.php",{params:{
					"phone":localStorage.userPhone,
					"uuid":_this.$route.query.userid,
					"ground_id":_this.groundID,
					"null":"null",
				}}).then(reponse=>{
					if(reponse.data.type==1){
						var ln=reponse.data.data.length
						if(num==1){
							_this.apiData=reponse.data.data;
						}else{
							_this.apiData.push(reponse.data.data[ln-1]);
						}
					}
				})
			},
			newGroun(){
				var val=prompt("请输入分组名称");
				var timestamp = Date.parse(new Date()); 
				var _this=this;
				this.$http.get("/ground.php",{params:{
					name:val,
					keys:timestamp,
					uuid:_this.$route.query.userid,
				}}).then((res)=>{
					if(res.data.type==1){
						this.groun.push({name:val,keys:timestamp});
					}
				})
			},
			addApi(inx,val){
				var _this=this;
				if(inx==1){
					this.mydata={canshu:[{name:'',valus:''}],fanhui:[{name:'',valus:''}],moth:'get',gorund:'所有分组'};
				}else if(inx==2){
					if(typeof val.canshu=="string"){
						val.canshu=eval('('+ val.canshu +')');
					}
					if(typeof val.fanhui=="string"){
						val.fanhui=eval('('+ val.fanhui +')');
					}
					val.isEdit=true;
					this.mydata=val;
				}
				this.show=true;
			},
			changeActive(inx,val,data){
				if(inx==1){
					if(val==1){
						this.$alert('开发中', '提示', {
				          confirmButtonText: '确定',
				          callback: action => {
				            
				          }
				        });
						return;
					}
					this.isactive=val;
				}else{
					this.isactiveGroun=val;
					this.groundID=data.ground_id;
					this.ajaxData(1);
				}
			}
		}
	}
</script>