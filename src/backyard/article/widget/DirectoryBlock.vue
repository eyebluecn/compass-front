<template>

  <ul class="directory-ul folder-list directory-block" :class="{'sub':level>0}" style="padding: 0">

    <li class="directory-li" v-for="(directory1,index) in directory.children">
      <a class="directory-a" :class="{'active':directory1.uuid === activeDirectory.uuid}" href="javascript:void(0)"
         @click.prevent.stop="clickDirectory(directory1)">
        <i class="caret-icon fa"
           :class="{'fa-caret-down':directory1.open,'fa-caret-right':!directory1.open}"
           :style="'visibility:'+((directory1.children.length > 0)?'visible':'hidden')"
           @click.prevent.stop="directory1.open=!directory1.open"
        ></i>
        <i class="folder-icon fa fa-folder"></i>
        <span>
          {{directory1.name}}
        </span>

        <el-dropdown v-if="!forSelection" trigger="click" class="dropdown-box" @command="handleCommand">
          <i class="menu-icon fa fa-caret-down el-dropdown-link" @click.prevent.stop=""></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="'createArticle,'+directory1.uuid+','+index">写文章</el-dropdown-item>
            <el-dropdown-item :command="'createDirectory,'+directory1.uuid+','+index">新增文件夹</el-dropdown-item>
            <el-dropdown-item :command="'renameDirectory,'+directory1.uuid+','+index">重命名文件夹</el-dropdown-item>
            <el-dropdown-item :command="'upDirectory,'+directory1.uuid+','+index"  v-show="index !== 0">上移</el-dropdown-item>
            <el-dropdown-item :command="'downDirectory,'+directory1.uuid+','+index"  v-show="index !== directory.children.length - 1">下移</el-dropdown-item>
            <el-dropdown-item :command="'delDirectory,'+directory1.uuid+','+index">删除文件夹</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </a>

      <NbExpanding>
        <DirectoryBlock
          v-if="directory1.open && directory1.children && directory1.children.length > 0"
          :directory="directory1"
          :level="level+1"
          :forSelection="forSelection"
          :activeDirectory="activeDirectory"
          @activeDirectoryChange="bubbleActiveDirectoryChange"
          @structureChange="bubbleStructureChange"
        />
      </NbExpanding>


    </li>
  </ul>


</template>

<script>
  import NbExpanding from '../../../common/widget/NbExpanding.vue'
  import Directory from "../../../common/model/directory/Directory";

  export default {
    //利用name，进行递归。
    name: 'DirectoryBlock',
    data() {
      return {}
    },
    props: {
      directory: {
        type: Directory,
        required: true
      },
      level: {
        type: Number,
        required: false,
        "default": 0
      },
      forSelection: {
        type: Boolean,
        required: false,
        "default": false
      },
      activeDirectory: {
        type: Directory,
        required: false,
        "default": function () {
          return new Directory();
        }
      }
    },
    components: {
      NbExpanding
    },
    computed: {},
    watch: {},
    methods: {

      getDirectory(uuid) {
        if (uuid) {
          for (let i = 0; i < this.directory.children.length; i++) {
            let d = this.directory.children[i];
            if (d.uuid === uuid) {
              return d;
            }
          }
        }

        return new Directory();
      },
      handleCommand(command) {
        let that = this;
        let arr = command.split(",");

        //创建文件夹
        if (arr[0] === "createArticle") {

          let d = that.getDirectory(arr[1]);

          that.$router.push({path: '/by/article/create', query: {directoryUuid: arr[1]}})

        } else if (arr[0] === "createDirectory") {

          let d = that.getDirectory();
          d.puuid = arr[1];

          this.$prompt('请输入文件夹名称', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^.{1,45}$/,
            inputErrorMessage: '名称必填，并且不超过45个字'

          }).then(({value}) => {

            d.name = value;
            d.httpSave(function () {

              that.$message({
                type: 'success',
                message: '创建成功'
              });

              //刷新结构
              that.$emit("structureChange")
            })

          }).catch(() => {

          });
        } else if (arr[0] === "renameDirectory") {

          let d = that.getDirectory(arr[1]);

          this.$prompt('请输入文件夹名称', '提示', {
            inputValue: d.name,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPlaceholder: '请输入文件夹名称',
            inputPattern: /^.{1,45}$/,
            inputErrorMessage: '名称必填，并且不超过45个字'

          }).then(({value}) => {

            d.name = value
            d.httpSave(function () {

              that.$message({
                type: 'success',
                message: '创建成功'
              });

              //刷新结构
              that.$emit("structureChange")
            })

          }).catch(() => {

          });
        } else if (arr[0] === "upDirectory") {

          let d = that.getDirectory(arr[1]);


          let index = parseInt(arr[2]);

          let d1 = that.directory.children[index - 1];
          let d2 = that.directory.children[index];
          d.httpSort(d1, d2, function () {
            that.directory.children.splice(index, 1);
            that.directory.children.splice(index - 1, 0, d2);
          });


        } else if (arr[0] === "downDirectory") {

          let d = that.getDirectory(arr[1]);


          let index = parseInt(arr[2]);

          let d1 = that.directory.children[index + 1];
          let d2 = that.directory.children[index];
          d.httpSort(d1, d2, function () {
            that.directory.children.splice(index, 1);
            that.directory.children.splice(index + 1, 0, d2);
          });


        } else if (arr[0] === "delDirectory") {

          let d = that.getDirectory(arr[1]);

          that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {


            d.httpDel(function () {

              that.$message({
                type: 'success',
                message: '成功删除【' + d.name + '】'
              });

              //刷新结构
              that.$emit("structureChange")
            });

          }).catch(() => {
            that.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }


      },
      clickDirectory(directory) {

        if (this.activeDirectory.uuid === directory.uuid) {
          this.activeDirectory.uuid = null
          this.activeDirectory.name = null
          this.activeDirectory.puuid = null
        } else {
          this.activeDirectory.uuid = directory.uuid
          this.activeDirectory.name = directory.name
          this.activeDirectory.puuid = directory.puuid
        }

        this.$emit("activeDirectoryChange", this.activeDirectory)

      },
      bubbleActiveDirectoryChange(directory) {
        this.$emit("activeDirectoryChange", directory)
      },
      bubbleStructureChange() {
        this.$emit("structureChange")
      }
    },
    mounted() {
    }
  }
</script>

<style lang="less" rel="stylesheet/less">


  @import "../../../assets/css/global/variables";

  .directory-ul {

    font-size: 14px;

    &.sub {
      margin-left: 18px;
    }

    .directory-li {
      border-bottom: none;

      .directory-a {

        border-bottom: 1px solid #e7eaec;

        .caret-icon {
          width: 5px;

          &:hover {
            color: @brand-warning;
          }
        }

        .folder-icon {

        }
        .dropdown-box {
          float: right;
          display: inline-block;
          .menu-icon {
            visibility: hidden;
            &:hover {
              color: @brand-warning;
            }
          }
        }

        &.active {
          color: @brand-primary;
          font-weight: bold;

          .folder-icon {
            color: @brand-primary;
          }
        }
        &:hover {
          color: @brand-primary;

          .folder-icon {
            color: @brand-primary;
          }
          .menu-icon {
            visibility: visible;
          }
        }
      }

    }

  }
</style>

