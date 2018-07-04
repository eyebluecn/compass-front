import {MessageBox} from 'element-ui'
import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import Tank from '../tank/Tank'
import User from '../user/User'
import Directory from "../directory/Directory";


let Type = {
  ARTICLE: 'ARTICLE',
  VIDEO: 'VIDEO'
}
let TypeMap = {
  ARTICLE: {
    name: '文章',
    value: 'ARTICLE',
    style: 'primary'
  },
  VIDEO: {
    name: '视频',
    value: 'VIDEO',
    style: 'success'
  }
}


export default class Article extends BaseEntity {

  constructor(args) {
    super(args)

    //发布者
    this.userUuid = null

    //标题
    this.title = null

    //作者
    this.author = null

    this.type = Type.ARTICLE

    //所在目录。文章可以对应操作系统中的文件，文件一定处于某个文件夹下。
    this.directoryUuid = null

    //封面图片
    this.posterTankUuid = null

    //封面图片Url
    this.posterUrl = null

    //视频
    this.videoTankUuid = null

    //视频链接
    this.videoUrl = null

    //摘要
    this.digest = null

    //html内容
    this.html = null

    //是否置顶
    this.top = false

    //点赞
    this.agree = 0

    //字数
    this.words = 0

    //点击数量
    this.hit = 1

    //文件夹
    this.directory = new Directory()

    //封面图片
    this.posterTank = new Tank('image', false, 5 * 1024 * 1024, '图片不能超过5M')

    //视频
    this.videoTank = new Tank('.mp4', false, 1024 * 1024 * 1024, '请上传mp4格式视频，大小不超过1G')

    //作者
    this.user = new User()

    //当前用户是否已经对这篇文章点赞了
    this.agreed = false


    //编辑用户资料时的验证规则。也是默认的验证规则。
    this.validatorSchema = {
      title: {
        rules: [{required: true, message: '标题必填'}, {min: 1, max: 255, message: '标题最长255字'}],
        error: null
      },
      author: {
        rules: [{required: true, message: '作者必填'}, {min: 1, max: 45, message: '作者最长45字'}],
        error: null
      },
      directoryUuid: {
        rules: [{required: true, message: '所在目录必填'}],
        error: null
      },
      posterTankUuid: {
        rules: [{required: true, message: '封面图片必填'}],
        error: null
      },

      html: {
        rules: [{required: true, message: '正文必填'}, {min: 1, max: 2147483647, message: '正文最长255字'}],
        error: null
      }

    }

  }

  static URL_API_ARTICLE_TOP = '/article/top'
  static URL_API_ARTICLE_CANCEL_TOP = '/article/cancel/top'

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.SORT, '自定义顺序', 'orderSort', null, null, false),
      new Filter(Filter.prototype.Type.SORT, '热点关注', 'orderTop'),
      new Filter(Filter.prototype.Type.SORT, '点击数', 'orderHit'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.CHECK, '热点关注', 'top'),
      new Filter(Filter.prototype.Type.INPUT, '标题', 'title'),
      new Filter(Filter.prototype.Type.INPUT, '作者', 'author'),
      new Filter(Filter.prototype.Type.SELECTION, '角色', 'role', this.getTypeList()),
      new Filter(Filter.prototype.Type.INPUT, '文件夹', 'directoryUuid', null, null, false),
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword')
    ]
  };

  render(obj) {
    super.render(obj)
    this.renderEntity('directory', Directory)
    this.renderEntity('posterTank', Tank)
    this.renderEntity('videoTank', Tank)
    this.renderEntity('user', User)

    if (!this.directory.uuid) {
      this.directory.uuid = this.directoryUuid;
    }
  }

  getForm() {
    return {
      title: this.title,
      author: this.author,
      type: this.type,
      directoryUuid: this.directory.uuid,
      posterTankUuid: this.posterTank.uuid,
      posterUrl: this.posterTank.url,
      videoTankUuid: this.videoTank.uuid,
      videoUrl: this.videoTank.url,
      digest: this.digest,
      html: this.html,
      words: this.words,
      top: this.top,
      uuid: this.uuid ? this.uuid : null
    }
  }

  httpChangeTop(successCallback, errorCallback) {
    let that = this
    let confirmText = '将该文章设为热点文章？'
    if (this.top) {
      confirmText = '取消该文章设为热点文章？'
    }
    MessageBox.confirm(confirmText, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(function () {
        that.httpPost(that.top ? Article.URL_API_ARTICLE_CANCEL_TOP : Article.URL_API_ARTICLE_TOP, {articleUuid: that.uuid}, function (response) {
          typeof successCallback === 'function' && successCallback(response)
        })

      },
      function () {
      }
    )
  }

}
Article.registerEnum('Type', TypeMap)
