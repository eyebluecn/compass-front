import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import Tank from '../tank/Tank'
import {JumpType, JumpTypeMap} from "../base/JumpType";
import Carousel from "../carousel/Carousel";
import Article from "../article/Article";
import Directory from "../directory/Directory";

export default class Preference extends BaseEntity {
  constructor(args) {
    super(args)
    //网站名称
    this.name = null

    //2个自定义菜单
    this.tabName1 = null
    this.tabJumpType1 = JumpType.NONE
    this.tabPayload1 = null

    //自定义菜单2
    this.tabName2 = null
    this.tabJumpType2 = JumpType.NONE
    this.tabPayload2 = null

    this.version = null

    this.tabArticle1 = new Article()
    this.tabDirectory1 = new Directory()

    this.tabArticle2 = new Article()
    this.tabDirectory2 = new Directory()

    this.validatorSchema = {
      name: {
        rules: [{required: true, message: '网站名称必填'}],
        error: null
      }
    }
  }

  static URL_API_PREFERENCE_FETCH = '/preference/fetch'

  render(obj) {
    super.render(obj)
    this.renderEntity('tabArticle1', Article)
    this.renderEntity('tabDirectory1', Directory)
    this.renderEntity('tabArticle2', Article)
    this.renderEntity('tabDirectory2', Directory)

  }

  getForm() {
    return {
      name: this.name,
      tabName1: this.tabName1,
      tabJumpType1: this.tabJumpType1,
      tabPayload1: this.tabPayload1,
      tabName2: this.tabName2,
      tabJumpType2: this.tabJumpType2,
      tabPayload2: this.tabPayload2
    }
  }

  validate() {

    return super.validate()
  }

  httpFetch(successCallback, errorCallback) {
    let that = this
    this.httpPost(Preference.URL_API_PREFERENCE_FETCH, {needJumpTypeDetail: true}, function (response) {
      that.render(response.data.data)
      typeof successCallback === 'function' && successCallback(response)
    }, errorCallback)
  }


}
