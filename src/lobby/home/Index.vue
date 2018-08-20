<template>
  <div class="page-index">
    <div class="skin-wrapper"></div>

    <div class="container">
      <div class="row search-area">
        <div class="col-md-5 col-md-offset-3">
          <input title="搜索框" class="form-control" v-model="searchText" @keydown.enter="startSearch"/>
        </div>
        <div class="col-md-1">
          <button class="btn btn-primary" @click.stop.prevent="startSearch">
            <i class="fa fa-search"></i>
            搜索
          </button>
        </div>
      </div>
      <div class="row content-area">

        <div class="com-md-12 text-right">
          <button class="btn btn-primary btn-sm" @click.stop.prevent="createSite()">
            <i class="fa fa-plus"></i>
            添加
          </button>
        </div>
        <div class="col-md-12">
          <a class="link-block" v-for="(site,index) in pager.data" :href="site.url" target="_blank">
            {{site.name}}
          </a>
        </div>

      </div>
    </div>

  </div>
</template>
<script>


  import Pager from "../../common/model/base/Pager";
  import Site from "../../common/model/site/Site";
  import { MessageBox, Message } from "element-ui";
  import EditPanel from "./widget/EidtPanel";

  export default {
    data() {
      return {
        searchText: null,
        pager: new Pager(Site),
        user: this.$store.state.user
      };
    },
    components: {},
    computed: {},
    watch: {},
    methods: {
      refresh() {
        this.pager.httpFastPage();
      },
      //添加或者修改
      createSite() {

        let that = this;

        let site = new Site();

        let dom = this.$createElement(EditPanel, {
          props: {
            site: site
          }
        });

        MessageBox({
          title: "添加收藏",
          message: dom,
          showCancelButton: true,
          confirmButtonText: "提交",
          cancelButtonText: "取消",
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = "提交中...";

              site.httpSave(function() {
                instance.confirmButtonLoading = false;

                that.refresh();

                Message.success("修改成功！");


                done();

              }, function(response) {
                instance.confirmButtonLoading = false;

                site.defaultErrorHandler(response);


                done();

              });
            } else {
              done();
            }
          }
        }).then(action => {

          console.log("取消了。");

        });

      },
      startSearch() {
        window.open("http://caup.cn/search?q=" + this.searchText)
      }


    },
    created() {

    },
    mounted() {

      this.refresh();

    }
  };
</script>
<style lang="less" rel="stylesheet/less">


  @import "../../assets/css/global/variables";

  .page-index {
    .search-area {
      margin-top: 100px;
    }
    .content-area {
      background: rgba(255, 255, 255, 0.8);

      margin-top: 200px;

      .link-block {
        color: black;
      }
    }

  }

  .skin-wrapper {

    background-image: url(https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/117.jpg);

    position: fixed;
    _position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    min-width: 1000px;
    z-index: -10;
    background-position: center 0;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    zoom: 1;

  }
</style>
