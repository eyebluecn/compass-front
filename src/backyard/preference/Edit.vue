<template>
	<div class="backyard-preference-edit animated fadeIn">
		<div class="row">
			<div class="col-lg-12">
				<div class="pedia-navigation">
					<span class="item active">
						偏好设置
					</span>
				</div>
			</div>

      <div class="col-lg-12">

        <div class="bg-white br4 p20 mt10">
          <div class="row" v-validator="preference.validatorSchema.name.error">
            <label class="col-md-2 control-label mt5 compulsory">网站名称</label>
            <div class="col-md-10 validate">
              <input type="text" class="form-control" v-model="preference.name">
            </div>
          </div>




          <div class="row mt10">
            <div class="col-md-12">
              <div>
                <CreateSaveButton :entity="preference" :callback="save"/>
              </div>
            </div>
          </div>

        </div>
      </div>
		</div>
	</div>
</template>

<script>
	import NbTank from '../../common/widget/NbTank'
  import CreateSaveButton from '../widget/CreateSaveButton'
  import Preference from '../../common/model/preference/Preference'
	import { Notification } from 'element-ui'

  export default {
    name: 'edit',
	  data(){
      return{
        currentPreference: this.$store.state.preference,
        preference: new Preference()
      }
	  },
	  components:{
      NbTank,
      CreateSaveButton
	  },
	  methods:{
      save(){
        let that = this
				this.preference.httpSave(function (response) {
          Notification.success({
            message: '修改偏好成功！'
          })
          that.currentPreference.render(response.data.data)

          that.$router.push('/by/preference')
        })
      }
	  },
	  mounted(){
      let that = this
      this.preference.httpFetch(function () {
        that.preference.editMode = true
      })
	  }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
