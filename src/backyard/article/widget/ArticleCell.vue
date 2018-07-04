<template>
  <div class="article-cell">

    <div class="box">
      <div class="box-figure">
        <router-link :to="'/by/article/detail/' + article.uuid">
          <img v-if="article.posterUrl"
               :src="article.posterUrl + '?imageProcess=resize&imageResizeM=fit&imageResizeW=100'"
               alt="">
          <img v-else class="w100" src="../../../assets/img/hand.png" alt="">
        </router-link>
      </div>
      <div class="box-body">
        <div class="title">
          <div>
            <i class="fa fa-fire text-danger f18 mr5" v-if="article.top" title="热点关注"></i>
            <router-link :to="'/by/article/detail/' + article.uuid">
              {{article.title}}
            </router-link>
          </div>
          <div class="mt10">
            <span :class="'label label-'+article.getTypeStyle()">{{article.getTypeName()}}</span>
          </div>

        </div>
        <div>
          <ArticleInfo :article="article" :showOperate="showOperate" :delCallback="delCallback"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ArticleInfo from '../widget/ArticleInfo'
  import Article from '../../../common/model/article/Article'


  export default {
    name: 'article-cell',
    data() {
      return {}
    },
    props: {
      article: {
        type: Article,
        required: true
      },
      articleInfoPosition: {
        type: String,
        required: false,
        default: 'top'
      },

      showOperate: {
        type: Boolean,
        required: false,
        default: false
      },
      activeTagUuid: {
        type: String,
        required: false,
        default: ''
      },
      delCallback: {
        type: Function,
        required: false,
        default: function () {
          return true
        }
      }
    },
    components: {
      ArticleInfo
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .article-cell {
    background-color: #fff;
    border-bottom: 1px solid #eeeeee;
    padding: 20px;

    .box {
      display: flex;
      align-items: stretch;

      .box-figure {
        margin-right: 10px;
      }

      .box-body {
        flex: 1;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }

    .title {
      margin-bottom: 10px;
      a {
        font-size: 18px;
        font-weight: bold;
        color: #555;
        &:hover {
          color: #000;
          text-decoration: underline;
        }
      }
    }

  }
</style>
