<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="pedia-navigation">
          <span class="item active">轮播图列表</span>
        </div>
      </div>
    </div>


    <div class="row">
      <div class="col-lg-12">
        <NbFilter :filters="pager.filters" @change="search">
          <router-link class="btn btn-primary btn-sm" to="/by/carousel/create">
            <i class="fa fa-plus"></i>
            创建轮播图
          </router-link>
        </NbFilter>
      </div>
      <div class="col-lg-12" v-for="(carousel,index) in pager.data">

        <div class="p10 bg-white br4 mb10">

          <div class="media">
            <div class="pull-left">
              <router-link :to="'/by/carousel/edit/'+carousel.uuid">
                <img class="br5 w200" :src="carousel.getPosterUrl()">
              </router-link>
            </div>
            <div class="pull-right">


              <a class="btn-action" title="上移" v-show="index !== 0" @click.stop.prevent="up(index)">
                <i class="fa fa-arrow-up f18"></i>
              </a>

              <a class="btn-action" title="下移" v-show="index !== pager.data.length - 1"
                 @click.stop.prevent="down(index)">
                <i class="fa fa-arrow-down f18"></i>
              </a>

              <router-link class="btn-action" :to="'/by/carousel/edit/'+carousel.uuid">
                <i class="fa fa-pencil text-info f18"></i>
              </router-link>
              <a class="btn-action" href="javascript:void(0)" title="删除"
                 @click.stop.prevent="carousel.confirmDel(refresh)">
                <i class="fa fa-trash text-danger f18"></i>
              </a>
            </div>

            <div class="media-body">
              <div class="cell-title">
                <i v-if="!carousel.enable" title="已禁用，app中不会显示" class="fa fa-lock text-danger"></i>
                {{carousel.title}}
              </div>
              <div class="cell-content mt5">
                <span :class="'label label-'+carousel.getJumpTypeStyle()">{{carousel.getJumpTypeName()}}</span>
              </div>
              <div class="cell-content mt5" v-if="carousel.jumpType === 'URL'">
                目标url：
                <a :href="carousel.payload" target="_blank">
                  {{carousel.payload}}
                </a>
              </div>
              <div class="cell-content mt5" v-if="carousel.jumpType === 'ARTICLE'">
                目标文章：
                <router-link :to="'/by/article/detail/'+carousel.article.uuid">
                  {{carousel.article.title}}
                </router-link>
              </div>

              <div class="cell-content mt5" v-if="carousel.jumpType === 'DIRECTORY'">
                目标栏目：
                <router-link :to="'/by?directoryUuid='+carousel.directory.uuid">
                  {{carousel.directory.name}}
                </router-link>
              </div>

            </div>

          </div>

        </div>

      </div>


      <div class="col-lg-8 col-lg-offset-2 mt20">
        <NbPager :pager="pager" @change="refresh"/>
      </div>


    </div>

  </div>
</template>

<script>
  import NbFilter from '../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../common/widget/NbPager.vue'
  import NbSwitcher from '../../common/widget/NbSwitcher'
  import Pager from '../../common/model/base/Pager'
  import Carousel from '../../common/model/carousel/Carousel'

  export default {
    data() {
      return {
        pager: new Pager(Carousel),
        user: this.$store.state.user
      }
    },
    components: {
      NbFilter,
      NbSwitcher,
      NbPager
    },
    methods: {
      up(index) {
        if (index !== 0) {

          let that = this
          let carousel1 = this.pager.data[index - 1];
          let carousel2 = this.pager.data[index];
          carousel2.httpSort(carousel1, carousel2, function () {
            that.pager.data.splice(index, 1);
            that.pager.data.splice(index - 1, 0, carousel2);
          });

        }
      },
      down(index) {

        if (index !== this.pager.data.length - 1) {


          let that = this
          let carousel1 = this.pager.data[index + 1];
          let carousel2 = this.pager.data[index];
          carousel2.httpSort(carousel1, carousel2, function () {
            that.pager.data.splice(index, 1);
            that.pager.data.splice(index + 1, 0, carousel2);
          });

        }

      },
      search() {
        this.pager.page = 0
        this.refresh()
      },
      refresh() {
        this.pager.httpFastPage()
      }
    },
    created() {

    },
    mounted() {
      this.pager.enableHistory()

      //默认按照sort倒序排列。
      if (this.pager.getFilter('orderSort').isEmpty()) {
        this.pager.setFilterValue('orderSort', 'DESC')
      }

      this.pager.setFilterValue("withArticle", true)
      this.pager.setFilterValue("withDirectory", true)


      this.refresh()
    }
  }
</script>

<style>

</style>
