<template>
  <div class="backyard-user-list animated fadeIn">
    <div class="row">
      <div class="col-lg-12">
        <div class="pedia-navigation">
          <span class="item active">文章列表</span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <NbFilter :filters="pager.filters" :callback="search">
          <router-link class="btn btn-primary btn-sm" to="/by/user/create">
            <i class="fa fa-plus"></i>
            创建用户
          </router-link>
        </NbFilter>
      </div>

      <div class="col-md-12" v-for="(u,index) in pager.data">
        <div class="bg-white border br4 p10 mb10">
          <div class="media">
            <div class="pull-left">
              <span>
                <img class="img-circle img-md" :src="u.getAvatarUrl()">
              </span>
            </div>
            <div class="media-body">
              <div>
							<span class="f16">
								<span class="black">
											{{u.nickname}}
                  <span v-if="u.status === 'DISABLE'" :class="'label label-'+u.getStatusStyle()">禁用</span>
                  <span v-if="u.status === 'NEW'" :class="'label label-'+u.getStatusStyle()">申请注册</span>
									<span v-if="u.uuid === user.uuid" class="text-danger">(It's you)</span>
								</span>
							</span>
              </div>
              <div>

                <div class="mt5">
                  <span>{{u.getRoleName()}}</span>
                  <span>
                    <i class="fa fa-phone text-info" v-if="u.phone"></i>
                  {{u.phone}}
                  </span>
                  <span>
                    <i class="fa fa-envelope" :class="{'text-success':u.emailValidate}"
                       :title="u.emailValidate ? '已验证邮箱':'未认证邮箱'" v-if="u.email"></i>
                  {{u.email}}
                  </span>


                </div>

                <div class="mt5" v-if="u.status === 'DISABLE' && u.remark">
                  禁用理由：<span class="text-danger">{{u.remark}}</span>
                </div>
                <div class="mt5" v-if="u.status === 'NEW' && u.remark">
                  申请理由：<span class="text-danger">{{u.remark}}</span>
                </div>

              </div>
              <div class="mv5 text-muted one-line">
                {{u.description}}
              </div>
              <div>
                <span class="mr10">上次登录: {{u.lastTime | humanTime}}</span>
                <span class="mr10">上次IP: {{u.lastIp}}</span>

                <span class="pull-right action-buttons">
									<router-link :to="'/by/user/edit/'+u.uuid">
										<i class="fa fa-pencil text-info f18"></i>
									</router-link>
									<a v-if="u.status === 'OK'" href="javascript:void(0)" title="禁用用户"
                     @click.stop.prevent="changeStatusDisable(u)">
                    <i class="fa fa-close text-danger f18"></i>
									</a>
                  <a v-if="u.status === 'NEW'" href="javascript:void(0)" title="通过审核"
                     @click.stop.prevent="changeStatusOk(u)">
                    <i class="fa fa-check text-success f18"></i>
									</a>
                  <a v-if="u.status === 'DISABLE'" href="javascript:void(0)" title="激活用户"
                     @click.stop.prevent="changeStatusOk(u)">
                    <i class="fa fa-check text-success f18"></i>
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
  import NbFilter from '../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../common/widget/NbPager.vue'
  import Pager from '../../common/model/base/Pager'
  import User from '../../common/model/user/User'

  export default {
    name: 'list',
    data() {
      return {
        pager: new Pager(User),
        user: this.$store.state.user
      }
    },
    components: {
      NbFilter,
      NbPager
    },
    methods: {
      search() {
        this.pager.page = 0
        this.refresh()
      },
      refresh() {
        this.pager.httpFastPage()
      },
      changeStatusOk(user) {
        user.httpStatus("OK")
      },
      changeStatusDisable(user) {
        let that = this
        this.$prompt('请输入禁用理由', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{0,45}$/,
          inputErrorMessage: '选填，不超过45个字'
        }).then(({value}) => {

          user.httpStatus('DISABLE', value)

        }).catch(() => {

        });

      }
    },
    mounted() {
      this.pager.enableHistory()
      this.refresh()
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .backyard-user-list {

  }
</style>
