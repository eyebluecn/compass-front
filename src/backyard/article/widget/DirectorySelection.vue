<template>
  <div class="directory-selection">

    <div class="title-area clearfix">
      <span>
        {{activeDirectory.name?activeDirectory.name:"请选择文章所属文件夹..."}}
      </span>
      <button class="btn btn-default btn-sm ml15" @click="show=!show">
				<span v-if="show">
            <i class="fa fa-angle-up"></i>
				收起
          </span>
        <span v-else>
            <i class="fa fa-angle-down"></i>
				选择
        </span>

      </button>
    </div>
    <NbExpanding>
      <div v-show="show">
        <div class="content-area">

          <DirectoryBlock :directory="rootDirectory"
                          :activeDirectory="activeDirectory"
                          :forSelection="true"
                          @activeDirectoryChange="activeDirectoryChange"
          />
        </div>
      </div>

    </NbExpanding>


  </div>

</template>

<script>
  import DirectoryBlock from './DirectoryBlock'
  import NbExpanding from '../../../common/widget/NbExpanding.vue'
  import Directory from "../../../common/model/directory/Directory";

  export default {
    data() {
      return {
        show: false,
        rootDirectory: new Directory(),
        //这个值用来标识，uuid的改变是外面引起的还是里面自身变化引起的。
        innerDirectoryUuid: null
      }
    },
    props: {
      activeDirectory: {
        type: Directory,
        required: true
      }
    },
    components: {
      NbExpanding,
      DirectoryBlock
    },
    computed: {},
    watch: {
      "activeDirectory.uuid"(newVal, oldVal) {
        //外部变化引起的
        if (newVal !== this.innerDirectoryUuid) {
          this.refreshDirectory()
        }
      }
    },
    methods: {
      getDirectory(directory, targetUuid) {
        if (directory && directory.children && directory.children.length > 0) {
          for (let i = 0; i < directory.children.length; i++) {
            let d = directory.children[i]
            if (d.uuid === targetUuid) {
              return d;
            }

            let childResult = this.getDirectory(d, targetUuid)
            if (childResult != null) {
              return childResult;
            }
          }
        }
        return null;
      },
      fillBack() {
        //回填
        let that = this
        //如果activeDirectory只有uuid，那么我们自动帮忙回填了。
        if (that.activeDirectory.uuid && !that.activeDirectory.name) {

          let target = that.getDirectory(that.rootDirectory, that.activeDirectory.uuid)


          if (target) {
            that.activeDirectory.render(target)
          }

        }
      },
      refreshDirectory() {


        let that = this

        if (this.rootDirectory.uuid && this.rootDirectory.name && this.rootDirectory.children && this.rootDirectory.children.length) {
          that.fillBack()
        } else {
          this.rootDirectory.httpDetail(function () {
            that.fillBack()
          });
        }

      },
      activeDirectoryChange(directory) {

        this.innerDirectoryUuid = directory.uuid
        this.activeDirectory.render(directory)
        this.show = false

        this.$emit("activeDirectoryChange", this.activeDirectory)
      }
    },
    mounted() {
      //默认按照置顶倒序排列。
      this.rootDirectory.name = "我的文件夹";
      this.rootDirectory.uuid = "root";
      this.refreshDirectory();
    }
  }
</script>

<style lang="less" rel="stylesheet/less">


  @import "../../../assets/css/global/variables";

  .directory-selection {

    .title-area {

    }
    .content-area {
      margin-top: 10px;
      padding: 10px;
      border: 1px dashed #1167a9;
    }

  }
</style>

