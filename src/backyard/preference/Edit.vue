<template>
	<div class="backyard-preference-edit animated fadeIn">
		<div class="row">
			<div class="col-lg-12">
				<div class="pedia-navigation">
					<span class="item active">
						偏好设置
					</span>
				</div>
			</div>

      <div class="col-lg-12">

        <div class="bg-white br4 p20 mt10">
          <div class="row" v-validator="preference.validatorSchema.name.error">
            <label class="col-md-2 control-label mt5 compulsory">网站名称</label>
            <div class="col-md-10 validate">
              <input type="text" class="form-control" v-model="preference.name">
            </div>
          </div>


          <div class="row mt10">
            <label class="col-md-2 control-label mt5">导航栏一页面类型</label>
            <div class="col-md-10">
              <select v-model="preference.tabJumpType1" class="form-control">
                <option v-for="type in JumpTypeList" :value="type.value">{{type.name}}</option>
              </select>
            </div>
          </div>


          <div class="row mt10" v-if="preference.tabJumpType1 !== 'NONE'">
            <label class="col-md-2 control-label mt5">导航栏一名称</label>
            <div class="col-md-10">
              <div>
                <input type="text" class="form-control" v-model="preference.tabName1">
              </div>

            </div>
          </div>

          <div class="row mt10" v-if="preference.tabJumpType1 === 'URL'">
            <label class="col-md-2 control-label mt5">导航栏一转跳链接</label>
            <div class="col-md-10">
              <input type="text" class="form-control" v-model="preference.tabPayload1">
            </div>
          </div>

          <div class="row mt10" v-if="preference.tabJumpType1 === 'ARTICLE'">
            <label class="col-md-2 control-label mt5">导航栏一文章</label>
            <div class="col-md-10">
              <ArticleSelection :activeArticle="preference.tabArticle1"
                                @activeArticleChange="preference.tabPayload1=preference.tabArticle1.uuid"/>
            </div>
          </div>

          <div class="row mt10" v-if="preference.tabJumpType1 === 'DIRECTORY'">
            <label class="col-md-2 control-label mt5">导航栏一目录</label>
            <div class="col-md-10">
              <DirectorySelection :activeDirectory="preference.tabDirectory1"
                                  @activeDirectoryChange="preference.tabPayload1=preference.tabDirectory1.uuid"/>
            </div>
          </div>


          <div class="row mt10">
            <label class="col-md-2 control-label mt5">导航栏二页面类型</label>
            <div class="col-md-10">
              <select v-model="preference.tabJumpType2" class="form-control">
                <option v-for="type in JumpTypeList" :value="type.value">{{type.name}}</option>
              </select>
            </div>
          </div>


          <div class="row mt10" v-if="preference.tabJumpType2 !== 'NONE'">
            <label class="col-md-2 control-label mt5">导航栏二名称</label>
            <div class="col-md-10">
              <div>
                <input type="text" class="form-control" v-model="preference.tabName2">
              </div>

            </div>
          </div>


          <div class="row mt10" v-if="preference.tabJumpType2 === 'URL'">
            <label class="col-md-2 control-label mt5">导航栏二转跳链接</label>
            <div class="col-md-10">
              <input type="text" class="form-control" v-model="preference.tabPayload2">
            </div>
          </div>

          <div class="row mt10" v-if="preference.tabJumpType2 === 'ARTICLE'">
            <label class="col-md-2 control-label mt5">导航栏二文章</label>
            <div class="col-md-10">
              <ArticleSelection :activeArticle="preference.tabArticle2"
                                @activeArticleChange="preference.tabPayload2=preference.tabArticle2.uuid"/>
            </div>
          </div>

          <div class="row mt10" v-if="preference.tabJumpType2 === 'DIRECTORY'">
            <label class="col-md-2 control-label mt5">导航栏二目录</label>
            <div class="col-md-10">
              <DirectorySelection :activeDirectory="preference.tabDirectory2"
                                  @activeDirectoryChange="preference.tabPayload2=preference.tabDirectory2.uuid"/>
            </div>
          </div>



          <div class="row mt10">
            <div class="col-md-12">
              <div>
                <CreateSaveButton :entity="preference" :callback="save"/>
              </div>
            </div>
          </div>

        </div>
      </div>
		</div>
	</div>
</template>

<script>
	import NbTank from '../../common/widget/NbTank'
  import CreateSaveButton from '../widget/CreateSaveButton'
  import Preference from '../../common/model/preference/Preference'
  import { JumpType, JumpTypeMap, JumpTypeList } from '../../common/model/base/JumpType'
	import { Notification } from 'element-ui'
  import ArticleSelection from '../article/Selection'
  import DirectorySelection from "../article/widget/DirectorySelection";

  export default {
    name: 'edit',
	  data(){
      return{
        JumpType,
        JumpTypeMap,
        JumpTypeList,
        currentPreference: this.$store.state.preference,
        preference: new Preference()
      }
	  },
	  components:{
      NbTank,
      CreateSaveButton,
      ArticleSelection,
      DirectorySelection
	  },
	  methods:{
      save(){
        let that = this
				this.preference.httpSave(function (response) {
          Notification.success({
            message: '修改偏好成功！'
          })
          that.currentPreference.render(response.data.data)

          that.$router.push('/by/preference')
        })
      }
	  },
	  mounted(){
      let that = this
      this.preference.httpFetch(function () {
        that.preference.editMode = true
      })
	  }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
