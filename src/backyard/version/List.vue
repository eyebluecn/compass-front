<template>
  <div class="animated fadeIn">


    <div class="row">
      <div class="col-md-12">

        <div class="pedia-navigation">
					<span class="item active">
						版本列表
					</span>
        </div>

      </div>
    </div>

    <div class="row">

      <div class="col-md-12">
        <NbFilter :filters="pager.filters" @change="search">
          <router-link class="btn btn-sm btn-primary" to="/by/version/create">
            <i class="fa fa-plus"></i>
            发布新版本
          </router-link>
        </NbFilter>
      </div>

      <div class="col-md-6" v-for="version in pager.data">
        <div class="bg-white p10 mb10 br4">

          <div class="media">
            <div class="media-body">
              <div>
								<span class="f16">
									<router-link class="black" :to="'/by/version/detail/'+version.uuid">
											{{version.name}}
									</router-link>
								</span>
              </div>
              <div>
                <div class="mt5">
                  <i class="fa text-success"
                     :class="[version.platform === 'ANDROID' ? version.getPlatformMap().ANDROID.icon : '',version.platform === 'IOS' ? version.getPlatformMap().IOS.icon : '',version.platform === 'WEB' ? version.getPlatformMap().WEB.icon : '']"></i>
                  {{version.platform}}
                </div>
              </div>
              <div>
                <div class="mt5">
                  唯一标识：{{version.identifier}}
                </div>
                <div class="mt5">
                  版本名称：{{version.versionName}} 版本号：{{version.versionCode}}
                </div>
                <div class="mt5">
                  <span class="label label-success" v-if="version.enabled">正常</span>
                  <span class="label label-warning" v-if="!version.enabled">强制升级</span>
                </div>

              </div>
              <div class="mt5">
                <span class="mr10">创建时间: {{version.createTime | simpleDateTime}}</span>

                <span class="pull-right action-buttons">
									<router-link :to="'/by/version/edit/'+version.uuid">
										<i class="fa fa-pencil text-info f18"></i>
									</router-link>
									<a href="javascript:void(0)" title="删除" @click.stop.prevent="version.confirmDel(refresh)">
										<i class="fa fa-trash text-danger f18"></i>
									</a>
								</span>

              </div>

            </div>
          </div>
        </div>

      </div>


      <div class="col-md-12 mt20">
        <NbPager :pager="pager" :callback="refresh"></NbPager>
      </div>

    </div>


  </div>

</template>
<script>

  import Version from '../../common/model/version/Version'


  import NbFilter from '../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../common/widget/NbPager.vue'

  import Pager from '../../common/model/base/Pager'

  export default {

    data() {
      return {
        pager: new Pager(Version)
      }
    },
    components: {
      NbFilter,
      NbPager
    },
    computed: {},
    watch: {},
    methods: {

      search() {
        this.pager.page = 0
        this.refresh()
      },
      refresh() {
        this.pager.httpFastPage()
      }
    },
    mounted() {
      this.pager.enableHistory()
      this.refresh()
    }
  }

</script>
