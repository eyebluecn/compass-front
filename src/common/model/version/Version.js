import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import Tank from "../tank/Tank";

let Platform = {
  ANDROID: 'ANDROID',
  IOS: 'IOS',
  WEB: 'WEB'
}

let PlatformMap = {
  ANDROID: {
    name: 'android端',
    value: 'ANDROID',
    icon: 'fa-android'
  },
  IOS: {
    name: 'ios端',
    value: 'IOS',
    icon: 'fa-apple'
  },
  WEB: {
    name: 'web端',
    value: 'WEB',
    icon: 'fa-edge'
  }
}


export default class Version extends BaseEntity {
  constructor(args) {
    super(args)

    this.name = null
    this.identifier = null
    this.versionName = null
    this.versionCode = 0
    this.platform = Platform.WEB
    this.description = null
    this.apkUrl = null
    this.apkUuid = null
    this.apk = new Tank('.apk', false, 200 * 1024 * 1024, 'apk文件，最大200M')
    this.apkExist = null
    this.homepageUrl = null
    this.enabled = true


    this.validatorSchema = {
      name: {
        rules: [{required: true, message: '名称必填'}],
        error: null
      },
      identifier: {
        rules: [{required: true, message: '标识符必填'}],
        error: null
      },
      versionName: {
        rules: [{required: true, message: '版本名称必填'}],
        error: null
      },
      versionCode: {
        rules: [{required: true, message: '版本号必填'}, {type: 'number', message: '版本号必须为数字值'}],
        error: null
      },
      apkExist: {
        rules: [{required: true, message: 'apk必传'}],
        error: null
      },
      description: {
        rules: [{required: true, message: '描述必填'}],
        error: null
      }
    }
  }

  render(obj) {
    super.render(obj)

    this.renderEntity('apk', Tank)
  }

  getFilters() {
    return [

      new Filter(Filter.prototype.Type.SORT, '序号', 'orderSort'),
      new Filter(Filter.prototype.Type.INPUT, '名称', 'name'),
      new Filter(Filter.prototype.Type.INPUT, '唯一标识', 'identifier'),
      new Filter(Filter.prototype.Type.INPUT, '版本名称', 'versionName'),
      new Filter(Filter.prototype.Type.INPUT, '版本号', 'versionCode'),
      new Filter(Filter.prototype.Type.SELECTION, '客户端', 'platform', this.getPlatformList()),
      new Filter(Filter.prototype.Type.INPUT, '关键字', 'keyword'),
      new Filter(Filter.prototype.Type.CHECK, '是否支持', 'enabled')

    ]
  }

  getForm() {
    return {
      name: this.name,
      identifier: this.identifier,
      versionName: this.versionName,
      versionCode: this.versionCode,
      platform: this.platform,
      description: this.description,
      apkUrl: this.apk.url,
      apkUuid: this.apk.uuid,
      homepageUrl: this.homepageUrl,
      enabled: this.enabled,
      uuid: this.uuid ? this.uuid : null
    }
  }


  validate() {
    let that = this

    /**可能遇到的问题**/
    that.versionCode = Number(that.versionCode)
    /** **/

    /**特殊情况如下，直接越过验证**/
    if (this.platform !== Platform.ANDROID) {
      that.apkExist = true
    } else {
      that.apkExist = that.apk.exist()
    }
    /**  **/

    return super.validate()

  }


}
//注册枚举变量
Version.registerEnum('Platform', PlatformMap)
