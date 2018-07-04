<template>
  <div class="backyard-preference">
    <div class="row">
      <div class="col-lg-12">
        <div class="pedia-navigation">
          <span class="item active">网站偏好</span>
        </div>
      </div>
      <div class="col-lg-12 text-right">
        <router-link class="btn btn-sm btn-primary" to="/by/preference/edit">
          <i class="fa fa-pencil"></i>
          修改
        </router-link>
      </div>
      <div class="col-lg-12">
        <div class="mt10 bg-white br4 border">
          <div class="row p10 border-bottom">
            <div class="col-md-2 col-sm-2 col-xs-4 bold">
              网站名称
            </div>
            <div class="col-md-10 col-sm-10 col-xs-8">
              {{preference.name}}
            </div>
          </div>


          <div class="row p10 border-bottom">
            <div class="col-md-2 col-sm-2 col-xs-4 bold">
              导航栏一
            </div>
            <div class="col-md-10 col-sm-10 col-xs-8">
              {{preference.menuName1}}

              <span :class="'label label-'+JumpTypeMap[preference.tabJumpType1].style">{{JumpTypeMap[preference.tabJumpType1].name}}</span>

              <span v-if="preference.tabJumpType1 === 'URL'">

                <a :href="preference.tabPayload1" target="_blank">
                  {{preference.tabPayload1}}
                </a>
              </span>
              <span class="cell-content mt5" v-if="preference.tabJumpType1 === 'ARTICLE'">

                <router-link :to="'/by/article/detail/'+preference.tabArticle1.uuid">
                  {{preference.tabArticle1.title}}
                </router-link>
              </span>

              <span class="cell-content mt5" v-if="preference.tabJumpType1 === 'DIRECTORY'">

                <router-link :to="'/by?directoryUuid='+preference.tabDirectory1.uuid">
                  {{preference.tabDirectory1.name}}
                </router-link>
              </span>

            </div>
          </div>


          <div class="row p10 border-bottom">
            <div class="col-md-2 col-sm-2 col-xs-4 bold">
              导航栏二
            </div>
            <div class="col-md-10 col-sm-10 col-xs-8">
              {{preference.menuName2}}

              <span :class="'label label-'+JumpTypeMap[preference.tabJumpType2].style">{{JumpTypeMap[preference.tabJumpType2].name}}</span>

              <span v-if="preference.tabJumpType2 === 'URL'">
                目标url：
                <a :href="preference.tabPayload2" target="_blank">
                  {{preference.tabPayload2}}
                </a>
              </span>
              <span class="cell-content mt5" v-if="preference.tabJumpType2 === 'ARTICLE'">
                目标文章：
                <router-link :to="'/by/article/detail/'+preference.tabArticle2.uuid">
                  {{preference.tabArticle2.title}}
                </router-link>
              </span>

              <span class="cell-content mt5" v-if="preference.tabJumpType2 === 'DIRECTORY'">
                目标栏目：
                <router-link :to="'/by?directoryUuid='+preference.tabDirectory2.uuid">
                  {{preference.tabDirectory2.name}}
                </router-link>
              </span>

            </div>
          </div>


        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import Preference from '../../common/model/preference/Preference'
  import {JumpType, JumpTypeMap, JumpTypeList} from '../../common/model/base/JumpType'

  export default {
    name: 'index',
    data() {
      return {
        JumpType,
        JumpTypeMap,
        JumpTypeList,
        preference: new Preference()
      }
    },
    methods: {},
    mounted() {
      this.preference.httpFetch()
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .backyard-preference {
    .tankImg {
      max-height: 100px
    }
  }
</style>
