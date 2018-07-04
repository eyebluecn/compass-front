<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="pedia-navigation">
          <span class="item active">站点列表</span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <NbFilter :filters="pager.filters" @change="search">
          <router-link class="btn btn-primary btn-sm" to="/by/site/create">
            <i class="fa fa-plus"></i>
            创建站点
          </router-link>
        </NbFilter>
      </div>
      <div class="col-lg-12" v-for="(site,index) in pager.data">

        <div class="p10 bg-white br4 mb10">

          <div class="media">
            <div class="pull-right">


              <a class="btn-action" title="上移" v-show="index !== 0" @click.stop.prevent="up(index)">
                <i class="fa fa-arrow-up f18"></i>
              </a>

              <a class="btn-action" title="下移" v-show="index !== pager.data.length - 1"
                 @click.stop.prevent="down(index)">
                <i class="fa fa-arrow-down f18"></i>
              </a>

              <router-link class="btn-action" :to="'/by/site/edit/'+site.uuid">
                <i class="fa fa-pencil text-info f18"></i>
              </router-link>
              <a class="btn-action" href="javascript:void(0)" title="删除"
                 @click.stop.prevent="site.confirmDel(refresh)">
                <i class="fa fa-trash text-danger f18"></i>
              </a>
            </div>

            <div class="media-body">
              <div class="cell-title">
                <i v-if="!site.visible" title="不显示" class="fa fa-lock text-danger"></i>
                {{site.name}}
              </div>


              <div class="cell-content mt5">
                {{site.url}}
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
  import Site from '../../common/model/site/Site'

  export default {
    data() {
      return {
        pager: new Pager(Site),
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
          let site1 = this.pager.data[index - 1];
          let site2 = this.pager.data[index];
          site2.httpSort(site1, site2, function () {
            that.pager.data.splice(index, 1);
            that.pager.data.splice(index - 1, 0, site2);
          });

        }
      },
      down(index) {

        if (index !== this.pager.data.length - 1) {

          let that = this
          let site1 = this.pager.data[index + 1];
          let site2 = this.pager.data[index];
          site2.httpSort(site1, site2, function () {
            that.pager.data.splice(index, 1);
            that.pager.data.splice(index + 1, 0, site2);
          });

        }

      },
      search() {
        this.pager.page = 0
        this.refresh()
      },
      refresh() {
        console.log("刷新了？")
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

      this.refresh()
    }
  }
</script>

<style>

</style>
