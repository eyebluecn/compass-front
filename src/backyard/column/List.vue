<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="pedia-navigation">
          <span class="item active">首页栏目列表</span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <NbFilter :filters="pager.filters" @change="search">
          <router-link class="btn btn-primary btn-sm" to="/by/column/create">
            <i class="fa fa-plus"></i>
            创建首页栏目
          </router-link>
        </NbFilter>
      </div>
      <div class="col-lg-12" v-for="(column,index) in pager.data">

        <div class="p10 bg-white br4 mb10">

          <div class="media">
            <div class="pull-left">
              <router-link :to="'/by/column/edit/'+column.uuid">
                <img class="br5 w80" :src="column.getPosterUrl()">
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


              <router-link class="btn-action" :to="'/by/column/edit/'+column.uuid">
                <i class="fa fa-pencil text-info f18"></i>
              </router-link>
              <a class="btn-action" href="javascript:void(0)" title="删除"
                 @click.stop.prevent="column.confirmDel(refresh)">
                <i class="fa fa-trash text-danger f18"></i>
              </a>
            </div>

            <div class="media-body">
              <div class="cell-title">
                <i v-if="!column.enable" title="已禁用，app中不会显示" class="fa fa-lock text-danger"></i>
                {{column.title}}
              </div>
              <div class="cell-content mt5">
                <span :class="'label label-'+column.getJumpTypeStyle()">{{column.getJumpTypeName()}}</span>
              </div>
              <div class="cell-content mt5" v-if="column.jumpType === 'URL'">
                目标url：
                <a :href="column.payload" target="_blank">
                  {{column.payload}}
                </a>
              </div>
              <div class="cell-content mt5" v-if="column.jumpType === 'ARTICLE'">
                目标文章：
                <router-link :to="'/by/article/detail/'+column.article.uuid">
                  {{column.article.title}}
                </router-link>
              </div>

              <div class="cell-content mt5" v-if="column.jumpType === 'DIRECTORY'">
                目标栏目：
                <router-link :to="'/by?directoryUuid='+column.directory.uuid">
                  {{column.directory.name}}
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
  import Column from '../../common/model/column/Column'

  export default {
    data() {
      return {
        pager: new Pager(Column),
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
          let column1 = this.pager.data[index - 1];
          let column2 = this.pager.data[index];
          column2.httpSort(column1, column2, function () {
            that.pager.data.splice(index, 1);
            that.pager.data.splice(index - 1, 0, column2);
          });
        }
      },
      down(index) {

        if (index !== this.pager.data.length - 1) {


          let that = this
          let column1 = this.pager.data[index + 1];
          let column2 = this.pager.data[index];
          column2.httpSort(column1, column2, function () {
            that.pager.data.splice(index, 1);
            that.pager.data.splice(index + 1, 0, column2);
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
