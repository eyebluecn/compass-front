<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="pedia-navigation">
					<span class="item active">
						<span v-show="!site.editMode">新建轮播图</span>
						<span v-show="site.editMode">编辑轮播图</span>
					</span>
        </div>
      </div>
      <div class="col-md-12">
        <div class="bg-white br4 p20 mt10">

          <div class="row" v-validator="site.validatorSchema.title.error">
            <label class="col-md-2 control-label mt5 compulsory">轮播图标题</label>
            <div class="col-md-10 validate">
              <input type="text" class="form-control" v-model="site.title">
            </div>
          </div>

          <div class="row mt10">
            <label class="col-md-2 control-label mt5 compulsory">封面图片</label>
            <div class="col-md-10">
              <NbTank :tank="site.poster" hint="选择图片"/>
            </div>
          </div>

          <div class="row mt10">
            <label class="col-md-2 control-label mt5">转跳类型</label>
            <div class="col-md-10">
              <select v-model="site.jumpType" class="form-control">
                <option v-for="type in site.getJumpTypeList()" :value="type.value">{{type.name}}</option>
              </select>
            </div>
          </div>

          <div class="row mt10" v-if="site.jumpType === 'URL'">
            <label class="col-md-2 control-label mt5">转跳链接</label>
            <div class="col-md-10">
              <input type="text" class="form-control" v-model="site.payload">
            </div>
          </div>

          <div class="row mt10" v-if="site.jumpType === 'ARTICLE'">
            <label class="col-md-2 control-label mt5">文章</label>
            <div class="col-md-10">
              <ArticleSelection :activeArticle="site.article"
                                @activeArticleChange="site.payload=site.article.uuid"/>
            </div>
          </div>

          <div class="row mt10" v-if="site.jumpType === 'DIRECTORY'">
            <label class="col-md-2 control-label mt5">目录</label>
            <div class="col-md-10">
              <DirectorySelection :activeDirectory="site.directory"
                                  @activeDirectoryChange="site.payload=site.directory.uuid"/>
            </div>
          </div>


          <div class="row mt10">
            <label class="col-md-2 control-label mt5">是否启用</label>
            <div class="col-md-10">
              <NbSwitcher v-model="site.enable"/>
            </div>
          </div>

          <div class="row mt10">
            <div class="col-md-12 mt20">
              <div>
                <CreateSaveButton :entity="site" :callback="save"/>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>

  </div>

</template>

<script>
  import {Notification} from 'element-ui'
  import Site from '../../common/model/site/Site'
  import NbTank from '../../common/widget/NbTank'
  import NbSwitcher from '../../common/widget/NbSwitcher'
  import NbEditor from '../../common/widget/NbEditor'
  import ArticleSelection from '../article/Selection'
  import CreateSaveButton from '../widget/CreateSaveButton'
  import DirectorySelection from "../article/widget/DirectorySelection";

  export default {
    name: 'create',
    data() {
      return {
        user: this.$store.state.user,
        site: new Site()
      }
    },
    components: {
      NbTank,
      NbSwitcher,
      NbEditor,
      ArticleSelection,
      DirectorySelection,
      CreateSaveButton
    },
    methods: {
      save() {
        let that = this
        this.site.errorMessage = null
        this.site.httpSave(function (response) {
          Notification.success({
            message: that.site.editMode ? '修改轮播图成功！' : '创建轮播图成功！'
          })

          that.$router.go(-1)
        })
      }
    },
    mounted() {
      let that = this
      this.site.uuid = this.$store.state.route.params.uuid
      if (this.site.uuid) {
        this.site.editMode = true
        this.site.httpDetail()
      }
    }
  }
</script>

<style>

</style>
