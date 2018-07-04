<template>
  <div class="animated fadeIn backyard-article-list">

    <div class="row">
      <div class="col-md-12">
        <div class="pedia-navigation">
          <span class="item active">文章管理</span>
          <span class="item pull-right cursor" @click.prevent.stop="showFilterPanel=!showFilterPanel">{{showFilterPanel?"收起筛选":"筛选"}}</span>
        </div>
      </div>
    </div>
    <div class="row">

      <div class="col-md-3">
        <div class="ibox float-e-margins">
          <div class="ibox-content mailbox-content">
            <div class="file-manager">
              <router-link class="btn btn-block btn-primary compose-mail" to="/by/article/create">
                <i class="fa fa-plus"></i>
                写 文 章
              </router-link>

              <div class="space-25"></div>
              <h5>
                文件夹
                <i class="fa fa-plus btn-action pull-right cursor" title="创建文件夹"
                   @click.prevent.stop="addDirectory"></i>
              </h5>

              <LoadingFrame :loading="rootDirectory.loading">
                <DirectoryBlock :directory="rootDirectory"
                                :activeDirectory="activeDirectory"
                                @activeDirectoryChange="activeDirectoryChange"
                                @structureChange="refreshDirectory"
                />
              </LoadingFrame>


              <div class="clearfix"></div>
            </div>
          </div>
        </div>

      </div>

      <div class="col-md-9">
        <div class="row mt10">

          <div class="col-md-12">
            <NbFilter :filters="articlePager.filters" :showTrigger="false" :showPanel="showFilterPanel"
                      @change="refreshArticle"></NbFilter>
          </div>

          <div class="col-md-12" v-for="(article,index) in articlePager.data">
            <ArticleCell :article="article" :showUser="false" :showOperate="true" :delCallback="refreshArticle"/>
          </div>

          <div class="col-md-12">
            <NbPager :pager="articlePager" @change="refreshArticle"/>
          </div>
        </div>
      </div>


    </div>

  </div>
</template>
<script>
  import NbFilter from '../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../common/widget/NbPager.vue'
  import ArticleCell from '../../backyard/article/widget/ArticleCell'
  import DirectoryBlock from './widget/DirectoryBlock'
  import Pager from '../../common/model/base/Pager'
  import Article from '../../common/model/article/Article'
  import Directory from '../../common/model/directory/Directory'
  import LoadingFrame from '../widget/LoadingFrame.vue'

  export default {
    data() {
      return {
        showFilterPanel: false,
        articlePager: new Pager(Article),
        rootDirectory: new Directory(),
        activeDirectory: new Directory(),
        user: this.$store.state.user
      }
    },
    components: {
      ArticleCell,
      DirectoryBlock,
      NbFilter,
      LoadingFrame,
      NbPager
    },
    computed: {},
    watch: {
      '$route'(to, from) {
        if (to.fullPath !== from.fullPath) {
          this.reset()
          this.refreshArticle()
        }
      }
    },
    methods: {
      reset() {
        this.articlePager.page = 0
        this.articlePager.resetFilter()
        this.articlePager.enableHistory()
      },
      search() {
        this.articlePager.page = 0
        this.refreshArticle()
      },
      refreshArticle() {
        this.articlePager.httpFastPage()
      },
      refreshDirectory() {
        this.rootDirectory.httpDetail();
      },

      activeDirectoryChange(activeDirectory) {
        this.articlePager.setFilterValue('directoryUuid', activeDirectory.uuid)
        this.refreshArticle();
      },
      addDirectory() {
        let that = this;
        this.$prompt('请输入文件夹名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{1,45}$/,
          inputErrorMessage: '名称必填，并且不超过45个字'
        }).then(({value}) => {

          let d = new Directory();
          d.name = value;
          d.puuid = "root";
          d.httpSave(function () {

            that.$message({
              type: 'success',
              message: '创建成功'
            });

            //刷新结构
            that.refreshDirectory();
          })

        }).catch(() => {

        });
      }
    },
    created() {

    },
    mounted() {

      //默认按照置顶倒序排列。
      this.rootDirectory.name = "我的文件夹";
      this.rootDirectory.uuid = "root";
      this.refreshDirectory();

      this.articlePager.enableHistory()

      //默认按照top倒序排列。
      if (this.articlePager.getFilter('orderTop').isEmpty()) {
        this.articlePager.setFilterValue('orderTop', 'DESC')
      }

      //默认按照top倒序排列。
      if (this.articlePager.getFilter('orderCreateTime').isEmpty()) {
        this.articlePager.setFilterValue('orderCreateTime', 'DESC')
      }

      //如果没有设置用户的话，那么默认显示当前登录用户的资料
      if (!this.articlePager.getFilterValue('userUuid')) {
        this.articlePager.setFilterValue('userUuid', this.user.uuid)
      }

      this.refreshArticle()
    }
  }
</script>
<style lang="less" rel="stylesheet/less">


  @import "../../assets/css/global/variables";

  .backyard-article-list {

  }
</style>
