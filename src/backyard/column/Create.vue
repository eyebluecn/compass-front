<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="pedia-navigation">
					<span class="item active">
						<span v-show="!column.editMode">新建首页栏目</span>
						<span v-show="column.editMode">编辑首页栏目</span>
					</span>
        </div>
      </div>
      <div class="col-md-12">
        <div class="bg-white br4 p20 mt10">

          <div class="row" v-validator="column.validatorSchema.title.error">
            <label class="col-md-2 control-label mt5 compulsory">首页栏目标题</label>
            <div class="col-md-10 validate">
              <input type="text" class="form-control" v-model="column.title">
            </div>
          </div>


          <div class="row mt10">
            <label class="col-md-2 control-label mt5 compulsory">封面图片</label>
            <div class="col-md-10">
              <div>
                <NbTank :tank="column.poster" hint="封面图片"/>
              </div>
              <div class="bold">
                我们为您提供了多张风格类似的图片，您可以从 <router-link to="/by/column/pictures">这里</router-link> 选择图片。

              </div>

            </div>
          </div>


          <div class="row mt10">
            <label class="col-md-2 control-label mt5">类型</label>
            <div class="col-md-10">
              <select v-model="column.jumpType" class="form-control">
                <option v-for="type in column.getJumpTypeList()" :value="type.value">{{type.name}}</option>
              </select>
            </div>
          </div>

          <div class="row mt10" v-if="column.jumpType === 'URL'">
            <label class="col-md-2 control-label mt5">转跳链接</label>
            <div class="col-md-10">
              <input type="text" class="form-control" v-model="column.payload">
            </div>
          </div>

          <div class="row mt10" v-if="column.jumpType === 'ARTICLE'">
            <label class="col-md-2 control-label mt5">文章</label>
            <div class="col-md-10">
              <ArticleSelection :activeArticle="column.article"
                                @activeArticleChange="column.payload=column.article.uuid"/>
            </div>
          </div>

          <div class="row mt10" v-if="column.jumpType === 'DIRECTORY'">
            <label class="col-md-2 control-label mt5">目录</label>
            <div class="col-md-10">
              <DirectorySelection :activeDirectory="column.directory"
                                  @activeDirectoryChange="column.payload=column.directory.uuid"/>
            </div>
          </div>


          <div class="row mt10">
            <label class="col-md-2 control-label mt5">是否启用</label>
            <div class="col-md-10">
              <NbSwitcher v-model="column.enable"/>
            </div>
          </div>

          <div class="row mt10">
            <div class="col-md-12 mt20">
              <div>
                <CreateSaveButton :entity="column" :callback="save"/>
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
  import Column from '../../common/model/column/Column'
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
        column: new Column()
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
        this.column.errorMessage = null
        this.column.httpSave(function (response) {
          Notification.success({
            message: that.column.editMode ? '修改首页栏目成功！' : '创建首页栏目成功！'
          })
          that.$router.push('/by/column/list')
        })
      }
    },
    mounted() {
      let that = this
      this.column.uuid = this.$store.state.route.params.uuid
      if (this.column.uuid) {
        this.column.editMode = true
        this.column.httpDetail()
      }
    }
  }
</script>

<style>

</style>
