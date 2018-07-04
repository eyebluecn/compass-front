<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-md-12">

        <div class="pedia-navigation">
					<span class="item active">
            <span v-show="!version.editMode">创建版本</span>
            <span v-show="version.editMode">编辑版本</span>
					</span>
        </div>

      </div>
    </div>


    <div class="bg-white br4 border p10">
      <div>

        <div class="row mt10" v-validator="version.validatorSchema.identifier.error">
          <label class="col-md-2 control-label mt5 compulsory">名称</label>
          <div class="col-md-10 validate">
            <input type="text" class="form-control" v-model="version.name">
          </div>

        </div>

        <div class="row mt10" v-validator="version.validatorSchema.identifier.error">
          <label class="col-md-2 control-label mt5 compulsory">唯一标识</label>
          <div class="col-md-10 validate">
            <input type="text" class="form-control" v-model="version.identifier">
          </div>

        </div>

        <div class="row mt10" v-validator="version.validatorSchema.versionName.error">
          <label class="col-md-2 control-label mt5 compulsory">版本名称</label>
          <div class="col-md-10 validate">
            <input type="text" class="form-control" v-model="version.versionName">
          </div>
        </div>


        <div class="row mt10" v-validator="version.validatorSchema.versionCode.error">
          <label class="col-md-2 control-label mt5 compulsory">版本号</label>
          <div class="col-md-10 validate">
            <input type="number" class="form-control" v-model="version.versionCode">
          </div>
        </div>


        <div class="row mt10">
          <label class="col-md-2 control-label mt5 compulsory">客户端</label>
          <div class="col-md-10 validate">

            <select class="form-control" v-model="version.platform">
              <option v-for="(item,index) in version.getPlatformList()" :value="item.value">{{item.name}}</option>
            </select>

          </div>
        </div>

        <div class="row mt10" v-if="version.platform === 'ANDROID'"
             v-validator="version.validatorSchema.apkExist.error">
          <label class="col-md-2 control-label mt5">apk</label>
          <div class="col-md-10 validate">
            <NbTank :tank="version.apk"/>
          </div>
        </div>


        <div class="row mt10">
          <label class="col-md-2 control-label mt5">主页Url</label>
          <div class="col-md-10 ">
            <input type="text" class="form-control" v-model="version.homepageUrl">
          </div>
        </div>

        <div class="row mt10">
          <label class="col-md-2 control-label mt5 compulsory">当前版本是否可用</label>
          <div class="col-md-10">
            <NbCheckbox v-model="version.enabled"></NbCheckbox>
            {{version.enabled ? '正常可用' : '强制升级'}}
          </div>
        </div>

        <div class="row mt10" v-validator="version.validatorSchema.description.error">
          <label class="col-md-2 control-label mt5 compulsory">版本描述</label>
          <div class="col-md-10 validate">
            <textarea class="form-control" v-model="version.description" rows="8"></textarea>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <!--<div class="alert alert-danger mt10" v-show="version.errorMessage">
                    {{version.errorMessage}}
                </div>-->
        <div class="mt10">
          <CreateSaveButton :entity="version" :callback="save"></CreateSaveButton>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

</style>
<script>
  import {Notification} from 'element-ui'
  import NbSlidePanel from '../../common/widget/NbSlidePanel.vue'
  import Version from '../../common/model/version/Version'
  import NbRadio from '../../common/widget/NbRadio.vue'
  import NbCheckbox from '../../common/widget/NbCheckbox.vue'
  import NbEditor from '../../common/widget/NbEditor.vue'
  import NbTank from '../../common/widget/NbTank.vue'
  import CreateSaveButton from '../widget/CreateSaveButton'


  export default {
    data() {
      return {
        version: new Version()
      }
    },
    components: {
      NbSlidePanel,
      CreateSaveButton,
      NbRadio,
      NbEditor,
      NbTank,
      NbCheckbox
    },
    computed: {},
    watch: {},
    methods: {
      save() {
        let that = this
        this.version.httpSave(function (response) {

          Notification.success({
            message: that.version.editMode ? '修改版本成功！' : '创建版本成功！'
          })
          that.$router.push('/by/version/detail/' + that.version.uuid)

        })
      }
    },
    mounted() {
      this.version.errorMessage = null
      this.version.uuid = this.$store.state.route.params.uuid
      if (this.version.uuid) {
        this.version.httpDetail()
      }

    }
  }
</script>


