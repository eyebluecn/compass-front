import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import Tank from "../tank/Tank";
import User from "../user/User";
import Article from "../article/Article";
import Directory from "../directory/Directory";
import {JumpType, JumpTypeMap} from "../base/JumpType";



export default class Column extends BaseEntity {
  constructor(args) {
    super(args)

    this.title = null;
    this.posterTankUuid = null;
    this.posterUrl = null;
    this.description = null;

    this.jumpType = JumpType.URL;

    //当type = URL 时是链接。当type = ARTICLE 时是 articleUuid。当type = DIRECTORY时是directoryUuid
    this.payload = null;



    this.url = null;
    this.enable = true;

    this.poster = new Tank('image', false, 1024 * 1024, '图片尺寸200*200,超过部分会被裁剪。')
    this.article = new Article()
    this.directory = new Directory()

    this.validatorSchema = {
      title: {
        rules: [{required: true, message: '标题必填'}, {min: 1, max: 255, message: '标题最长255字'}],
        error: null
      }
    }

  }

  render(obj) {
    super.render(obj)

    this.renderEntity("poster", Tank)
    this.renderEntity("article", Article)
    this.renderEntity("directory", Directory)
  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.SORT, '排序', 'orderSort'),
      new Filter(Filter.prototype.Type.INPUT, '名称', 'title'),
      new Filter(Filter.prototype.Type.CHECK, '是否启用', 'enable'),
      new Filter(Filter.prototype.Type.INPUT, '文章详情', 'withArticle', null, null, false),
      new Filter(Filter.prototype.Type.INPUT, '目录详情', 'withDirectory', null, null, false)
    ]
  }

  getForm() {
    return {
      title: this.title,
      posterTankUuid: this.poster.uuid,
      posterUrl: this.poster.url,
      description: this.description,
      jumpType: this.jumpType,
      payload: this.payload,
      enable: this.enable,
      uuid: this.uuid ? this.uuid : null
    }
  }


  //获取url.
  getPosterUrl() {
    if (this.posterUrl) {
      return this.posterUrl
    } else {
      return require('../../../assets/img/hand.png')
    }
  }

  getDisplayTitle() {
    return this.title;
  }
}
//注册枚举变量
Column.registerEnum('JumpType', JumpTypeMap)
