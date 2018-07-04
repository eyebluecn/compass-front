<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="pedia-navigation">
					<span class="item active">
						<span>备用图片</span>
					</span>
        </div>
      </div>
      <div class="col-md-12">
        <div class="bg-white br4 p20 mt10">
          <div class="text-right">
            <button class="btn btn-primary" @click="back">
              <i class="fa fa-arrow-left"></i>
              返回
            </button>
          </div>
          <div class="alert alert-info mt15">
            请首先保存图片到本地，然后再到"新建首页栏目"中上传图片。
          </div>

          <img v-for="i in 147" class="w100" :src="'/bystatic/img/icons/'+i+'.png'"/>

        </div>

      </div>
    </div>

  </div>

</template>

<script>

  export default {
    data() {
      return {}
    },
    components: {},
    methods: {
      back() {
        window.history.back(-1);
      }

    },
    mounted() {
      let that = this

    }
  }
</script>

<style>

</style>
