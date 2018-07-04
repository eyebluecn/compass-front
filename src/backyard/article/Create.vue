<template>
  <div class="animated fadeIn backyard-article-create">
    <div class="row">
      <div class="col-md-12">
        <div class="pedia-navigation">
					<span class="item active">
						<span v-show="!article.editMode">新建文章</span>
						<span v-show="article.editMode">编辑文章</span>
					</span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 text-right">
        <CreateSaveButton :entity="article" :callback="save"/>
      </div>
    </div>

    <LoadingFrame :loading="article.detailLoading">

      <div class="bg-white br4 p20 mt10">

        <div class="row" v-validator="article.validatorSchema.title.error">
          <label class="col-md-12 control-label mt5 compulsory">文章名称</label>
          <div class="col-md-12 validate">
            <input type="text" class="form-control" v-model="article.title">
          </div>
        </div>

        <div class="row" v-validator="article.validatorSchema.author.error">
          <label class="col-md-12 control-label mt5 compulsory">作者</label>
          <div class="col-md-12 validate">
            <input type="text" class="form-control" v-model="article.author">
          </div>
        </div>


        <div class="row" v-validator="article.validatorSchema.directoryUuid.error">
          <label class="col-md-12 control-label mt5 compulsory">文章目录</label>
          <div class="col-md-12 validate">
            <DirectorySelection :activeDirectory="article.directory"
                                @activeDirectoryChange="article.directoryUuid=article.directory.uuid"/>
          </div>
        </div>

        <div class="row" v-validator="article.validatorSchema.posterTankUuid.error">
          <label class="col-md-12 control-label mt5 compulsory">封面图片</label>
          <div class="col-md-12 validate">
            <NbTank :tank="article.posterTank" @uploadSuccess="article.posterTankUuid=article.posterTank.uuid"/>
          </div>
        </div>

        <div class="row">
          <label class="col-md-12 control-label mt5 compulsory">发布类型</label>
          <div class="col-md-12">
            <select v-model="article.type" class="form-control">
              <option v-for="type in article.getTypeList()" :value="type.value">{{type.name}}</option>
            </select>
          </div>
        </div>


        <NbExpanding>
          <div class="row" v-if="article.type === 'VIDEO'">
            <label class="col-md-12 control-label mt5 compulsory">视频文件</label>
            <div class="col-md-12">
              <NbTank :tank="article.videoTank"/>
            </div>
          </div>
        </NbExpanding>


        <div class="row" v-validator="article.validatorSchema.html.error">
          <label class="col-md-12 control-label mt5 compulsory">文章正文</label>
          <div class="col-md-12 validate">
            <NbEditor v-model="article.html"/>
          </div>
        </div>

        <div class="row mt15" v-if="article.errorMessage">
          <div class="col-md-12">
            <div class="alert alert-danger">
              {{article.errorMessage}}
            </div>
          </div>
        </div>

      </div>

    </LoadingFrame>
  </div>
</template>
<script>

  import {DatePicker, Notification} from 'element-ui'
  import Article from '../../common/model/article/Article'
  import NbSlidePanel from '../../common/widget/NbSlidePanel.vue'
  import NbEditor from '../../common/widget/NbEditor.vue'
  import NbCheckbox from '../../common/widget/NbCheckbox.vue'
  import NbTank from '../../common/widget/NbTank'
  import NbSwitcher from '../../common/widget/NbSwitcher.vue'
  import NbTags from '../../common/widget/NbTags'
  import NbExpanding from '../../common/widget/NbExpanding'
  import CreateSaveButton from '../widget/CreateSaveButton.vue'
  import LoadingFrame from '../widget/LoadingFrame.vue'
  import DirectorySelection from "./widget/DirectorySelection";
  import $ from 'jquery'

  export default {

    data() {
      return {
        user: this.$store.state.user,
        article: new Article()
      }
    },
    components: {
      DatePicker,
      CreateSaveButton,
      LoadingFrame,
      NbTags,
      NbEditor,
      NbExpanding,
      NbCheckbox,
      NbSlidePanel,
      NbSwitcher,
      DirectorySelection,
      NbTank
    },
    computed: {},
    watch: {},
    methods: {

      save() {
        let that = this

        let wangEditorTxt = $('.wangEditor-txt')
        if (wangEditorTxt) {
          this.article.words = wangEditorTxt.text().length
        }

        this.article.httpSave(function (response) {
          Notification.success({
            message: that.article.editMode ? '修改文章成功！' : '创建文章成功！'
          })
          that.$router.push('/by')
        })
      }
    },
    mounted() {
      let that = this
      this.article.uuid = this.$store.state.route.params.uuid
      if (this.article.uuid) {
        this.article.httpDetail()
      } else {
        this.article.author = this.user.nickname

        //回填directoryUuid.
        let query = this.$store.state.route.query
        if (typeof query.directoryUuid !== 'undefined') {
          this.article.directory.uuid = query.directoryUuid;
          this.article.directoryUuid = query.directoryUuid
        }

      }
    }
  }


</script>
<style lang="less" rel="stylesheet/less">
  @import "../../assets/css/global/variables";

  .backyard-article-create {

  }
</style>
