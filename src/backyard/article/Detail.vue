<template>
	<div class="animated fadeIn">
		<div class="row">
			<div class="col-md-12">

				<div class="pedia-navigation">
					<span class="item active">文章详情</span>
				</div>

			</div>
		</div>

		<!--编辑，权限设置-->
		<div class="row">
      <div class="col-md-12 text-right mb10">

				<a class="btn btn-primary btn-sm" :href="'/home/article/'+ article.uuid">
					<i class="fa fa-arrow-right"></i>
					前台文章
				</a>
				<router-link class="btn btn-primary btn-sm" :to="'/by/article/edit/'+ article.uuid">
					<i class="fa fa-pencil"></i>
					编辑文章
				</router-link>
			</div>
		</div>


		<LoadingFrame :loading="article.detailLoading">
			<div class="row">

        <div class="col-md-12">
					<div class="article-detail">
						<div class="row">
							<div class="col-md-10 col-md-offset-1">


								<div class="article-title">
                  <i class="fa fa-lock" v-if="article.privacy" title="私有文章，只有自己可见"></i>
									{{article.title}}
								</div>

								<ArticleInfo :article="article" :showUser="true"/>

                <div class="mt20" v-if="article.type === 'VIDEO'">
                  <video :src="article.videoUrl" controls="controls">
                    您的浏览器不支持 video 标签。
                  </video>
                </div>
                <div class="mt20">
                  <div v-html="article.html"></div>
                </div>


							</div>
						</div>

					</div>


				</div>

			</div>
		</LoadingFrame>

	</div>
</template>
<script>
  import Article from '../../common/model/article/Article'
  import ArticleInfo from './widget/ArticleInfo'
  import LoadingFrame from '../widget/LoadingFrame'
  import NbMarkdownPreview from '../../common/widget/markdown/NbMarkdownPreview'

  export default {

    data () {
      return {
        user: this.$store.state.user,
        article: new Article(),
        tags: []

      }
    },
    components: {
      LoadingFrame,
      NbMarkdownPreview,
      ArticleInfo
    },
    computed: {

    },
    methods: {
      markdownComplete(){

      }
    },
    mounted () {
      let that = this
      this.article.uuid = this.$store.state.route.params.uuid

      if (this.article.uuid) {
        this.article.httpDetail()
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
	.article-detail {
		background: white;
		padding: 20px;
		border-radius: 4px;
		.article-title {
			word-break: break-all;
			margin: 20px 0;
			font-size: 28px;
			color: black;
			font-weight: 700;
			line-height: 1.3;
		}

		.article-info {
			border-top: 1px solid #eeeeee;
			padding-top: 20px;
			.author {
				a {
					font-size: 20px;
					color: #555;
					&:hover {
						color: #000;
						text-decoration: underline;
					}
				}

			}
			.mix {
			}
		}
	}
</style>
