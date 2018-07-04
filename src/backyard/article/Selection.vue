<template>
  <div>

    <NbPagerSelection :pager="pager" :activeItem="activeArticle">

			<span slot="title">
				{{activeArticle.title?activeArticle.title:"请选择文章..."}}
			</span>

      <div class="mb10 p10 cursor br4 border" v-for="article in pager.data"
           @click.stop.prevent="clickItem(article)"
           :class="{'bg-white':article.uuid !== activeArticle.uuid,'bg-azure':article.uuid === activeArticle.uuid}"
           slot="cells">

        <div class="media">
          <div class="pull-left">
            <img class="img-rounded img-md" v-if="article.posterUrl" :src="article.posterUrl">
          </div>

          <div class="media-body">
            <div>
              <span class="f15 nb-a">{{article.title}}</span>
            </div>
            <div class="mt5">
              <span class="mr10">创建于:{{article.createTime | simpleDateTime}}</span>
              <span class="mr10">阅读:{{article.hit}}</span>
            </div>
          </div>
        </div>

      </div>

    </NbPagerSelection>


  </div>

</template>
<script>
  import Pager from "../../common/model/base/Pager";
  import Article from "../../common/model/article/Article";
  import NbPagerSelection from "../../common/widget/NbPagerSelection";

  export default {
    data() {
      return {
        pager: new Pager(Article, 5)
      }
    },
    props: {
      activeArticle: {
        type: Article,
        required: true
      }
    },
    watch: {
      "activeArticle.uuid"(newVal, oldVal) {
        this.httpUpdateActiveArticle();


      }
    },
    methods: {
      clickItem(article) {
        this.activeArticle.render(article);
      },
      httpUpdateActiveArticle() {

        console.log("变化了吗？")
        this.$emit("activeArticleChange")

        //如果传过来的activeArticle只有id没有其他内容，我们将要负责去获取其详细内容。
        if (this.activeArticle.uuid && !this.activeArticle.title) {
          this.activeArticle.httpDetail();
        }
      }
    },
    components: {
      NbPagerSelection
    },
    mounted() {
      this.httpUpdateActiveArticle();
    }
  }
</script>
