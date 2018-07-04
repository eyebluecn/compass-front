<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="pedia-navigation">
					<span class="item active">
						<span v-show="!carousel.editMode">新建轮播图</span>
						<span v-show="carousel.editMode">编辑轮播图</span>
					</span>
        </div>
      </div>
      <div class="col-md-12">
        <div class="bg-white br4 p20 mt10">

          <div class="row" v-validator="carousel.validatorSchema.title.error">
            <label class="col-md-2 control-label mt5 compulsory">轮播图标题</label>
            <div class="col-md-10 validate">
              <input type="text" class="form-control" v-model="carousel.title">
            </div>
          </div>

          <div class="row mt10">
            <label class="col-md-2 control-label mt5 compulsory">封面图片</label>
            <div class="col-md-10">
              <NbTank :tank="carousel.poster" hint="选择图片"/>
            </div>
          </div>

          <div class="row mt10">
            <label class="col-md-2 control-label mt5">转跳类型</label>
            <div class="col-md-10">
              <select v-model="carousel.jumpType" class="form-control">
                <option v-for="type in carousel.getJumpTypeList()" :value="type.value">{{type.name}}</option>
              </select>
            </div>
          </div>

          <div class="row mt10" v-if="carousel.jumpType === 'URL'">
            <label class="col-md-2 control-label mt5">转跳链接</label>
            <div class="col-md-10">
              <input type="text" class="form-control" v-model="carousel.payload">
            </div>
          </div>

          <div class="row mt10" v-if="carousel.jumpType === 'ARTICLE'">
            <label class="col-md-2 control-label mt5">文章</label>
            <div class="col-md-10">
              <ArticleSelection :activeArticle="carousel.article"
                                @activeArticleChange="carousel.payload=carousel.article.uuid"/>
            </div>
          </div>

          <div class="row mt10" v-if="carousel.jumpType === 'DIRECTORY'">
            <label class="col-md-2 control-label mt5">目录</label>
            <div class="col-md-10">
              <DirectorySelection :activeDirectory="carousel.directory"
                                  @activeDirectoryChange="carousel.payload=carousel.directory.uuid"/>
            </div>
          </div>


          <div class="row mt10">
            <label class="col-md-2 control-label mt5">是否启用</label>
            <div class="col-md-10">
              <NbSwitcher v-model="carousel.enable"/>
            </div>
          </div>

          <div class="row mt10">
            <div class="col-md-12 mt20">
              <div>
                <CreateSaveButton :entity="carousel" :callback="save"/>
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
  import Carousel from '../../common/model/carousel/Carousel'
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
        carousel: new Carousel()
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
        this.carousel.errorMessage = null
        this.carousel.httpSave(function (response) {
          Notification.success({
            message: that.carousel.editMode ? '修改轮播图成功！' : '创建轮播图成功！'
          })

          that.$router.go(-1)
        })
      }
    },
    mounted() {
      let that = this
      this.carousel.uuid = this.$store.state.route.params.uuid
      if (this.carousel.uuid) {
        this.carousel.editMode = true
        this.carousel.httpDetail()
      }
    }
  }
</script>

<style>

</style>
