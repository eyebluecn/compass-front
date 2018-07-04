<template>
	<div class="article-info">

    <div class="mix">
          <span class="mr10">
            发布时间: {{article.createTime | simpleDateHourMinute}}
          </span>
      <span class="mr10">
            作者: {{article.author}}
          </span>
      <span class="mr10">
            字数: {{article.words}}
          </span>
      <span class="mr10">
            阅读: {{article.hit}}
          </span>
      <span class="mr10">
            点赞: {{article.agree}}
          </span>

      <span class="pull-right action-buttons">
						<span>
							<a href="javascript:void(0)" :title="article.top ? '取消热点文章':'置为热点文章'"
                 @click.stop.prevent="article.httpChangeTop(delCallback)">
								<i class="fa fa-fire f18" v-if="!article.top"></i>
								<i class="fa fa-fire f18 text-muted" v-else></i>
              </a>
						</span>
						<router-link :to="'/by/article/edit/'+article.uuid">
								<i class="fa fa-pencil text-info f18"></i>
						</router-link>
						<a href="javascript:void(0)" title="删除" @click.stop.prevent="article.confirmDel(delCallback)">
								<i class="fa fa-trash text-danger f18"></i>
            </a>
					</span>
    </div>
	</div>
</template>

<script>
  import Article from '../../../common/model/article/Article'
  import {FeatureType} from '../../../common/model/feature/FeatureType'

  export default {
    name: 'article-info',
	  data(){
      return{
        FeatureType,
				user: this.$store.state.user
      }
	  },
	  props:{
      article:{
        type:Article,
        required: true
      },

      delCallback: {
        type: Function,
	      required: false,
	      default: function () {
		      return true
        }
      }
	  }
  }
</script>

<style lang="less" rel="stylesheet/less">
	.article-info{

	}
</style>
