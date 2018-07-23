<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="pedia-navigation">
					<span class="item active">
						<span v-show="!site.editMode">新建站点</span>
						<span v-show="site.editMode">编辑站点</span>
					</span>
        </div>
      </div>
      <div class="col-md-12">
        <div class="bg-white br4 p20 mt10">

          <div class="row" v-validator="site.validatorSchema.name.error">
            <label class="col-md-2 control-label mt5 compulsory">站点标题</label>
            <div class="col-md-10 validate">
              <input type="text" class="form-control" v-model="site.name">
            </div>
          </div>
          <div class="row" v-validator="site.validatorSchema.url.error">
            <label class="col-md-2 control-label mt5 compulsory">站点链接</label>
            <div class="col-md-10 validate">
              <input type="text" class="form-control" v-model="site.url">
            </div>
          </div>

          <div class="row">
            <label class="col-md-2 control-label mt5">站点图标</label>
            <div class="col-md-10">
              <NbTank :tank="site.favicon" @uploadSuccess="uploadSuccess"/>
            </div>
          </div>


          <div class="row mt10">
            <div class="col-md-12 mt20">
              <div>
                <CreateSaveButton :entity="site" :callback="save"/>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>

  </div>

</template>

<script>
  import { Notification } from "element-ui";
  import Site from "../../common/model/site/Site";
  import NbTank from "../../common/widget/NbTank";
  import NbSwitcher from "../../common/widget/NbSwitcher";
  import NbEditor from "../../common/widget/NbEditor";
  import CreateSaveButton from "../widget/CreateSaveButton";

  export default {
    name: "create",
    data() {
      return {
        user: this.$store.state.user,
        site: new Site()
      };
    },
    components: {
      NbTank,
      NbSwitcher,
      NbEditor,
      CreateSaveButton
    },
    methods: {
      save() {
        let that = this;
        this.site.errorMessage = null;
        this.site.httpSave(function(response) {
          Notification.success({
            message: that.site.editMode ? "修改站点成功！" : "创建站点成功！"
          });

          that.$router.go(-1);
        });
      },
      uploadSuccess() {
        this.site.faviconTankUuid = this.site.favicon.uuid;
        this.site.faviconUrl = this.site.favicon.url;
      }
    },
    mounted() {
      let that = this;
      this.site.uuid = this.$store.state.route.params.uuid;
      if (this.site.uuid) {
        this.site.editMode = true;
        this.site.httpDetail();
      }
    }
  };
</script>

<style>

</style>
