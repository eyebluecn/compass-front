import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import $ from 'jquery'
import {readLocalStorage, removeLocalStorage, saveToLocalStorage} from '../../util/Utils'
import Tank from '../tank/Tank'
import {FeatureType} from '../feature/FeatureType'
import {Notification} from 'element-ui'

let Status = {
  OK: 'OK',
  DISABLE: 'DISABLE'
}
let StatusMap = {

  OK: {
    name: '正常',
    value: 'OK',
    style: 'info'
  },
  DISABLE: {
    name: '禁用',
    value: 'DISABLE',
    style: 'danger'
  }
}

let Gender = {
  UNKNOWN: 'UNKNOWN',
  MALE: 'MALE',
  FEMALE: 'FEMALE'
}
let GenderMap = {
  UNKNOWN: {
    name: '保密',
    value: 'UNKNOWN',
    style: 'success'
  },
  MALE: {
    name: '男',
    value: 'MALE',
    style: 'info'
  },
  FEMALE: {
    name: '女',
    value: 'FEMALE',
    style: 'primary'
  }
}

let Role = {
  GUEST: 'GUEST',
  USER: 'USER',
  ADMIN: 'ADMIN'
}
let RoleMap = {
  GUEST: {
    name: '游客',
    value: 'GUEST',
    style: 'primary'
  },
  USER: {
    name: '普通用户',
    value: 'USER',
    style: 'success'
  },
  ADMIN: {
    name: '管理员',
    value: 'ADMIN',
    style: 'info'
  }
}

export default class User extends BaseEntity {
  static URL_USER_STATUS = '/user/status'

  static URL_LOGIN = '/user/login'
  static URL_LOGOUT = '/user/logout'
  static URL_USER_CHANGE_PASSWORD = '/user/change/password'
  static URL_USER_RESET_PASSWORD = '/user/reset/password'
  static URL_USER_EMAIL_SEND = '/user/email/send'

  constructor(args) {
    super(args)

    this.role = Role.GUEST
    this.username = null
    this.password = null
    this.email = null
    this.phone = null
    //用户角色
    this.gender = Gender.UNKNOWN
    this.city = null

    this.avatarTankUuid = null
    this.avatarUrl = null
    //上次登录IP
    this.lastIp = null
    //上次登录时间
    this.lastTime = null

    //用户状态
    this.status = Status.OK

    this.avatar = new Tank('image', false, 1024 * 1024, '图片不能超过1M')

    //登录的密码，服务器返回字段中没有密码
    this.localPassword = null


    //编辑用户资料时的验证规则。也是默认的验证规则。
    this.validatorSchema = {
      username: {
        rules: [{required: true, message: '用户名必填'}],
        error: null
      },
      password: {
        rules: [{required: true, message: '密码必填'}],
        error: null
      },
      role: {
        rules: [{required: true, message: '用户角色必填'}],
        error: null
      },
      email: {
        rules: [{required: true, message: '邮箱必填'}, {
          type: 'string',
          pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
          message: '邮箱格式不正确'
        }],
        error: null
      },
      gender: {
        rules: [{required: true, message: '性别必填'}],
        error: null
      }

    }

  }

  static getLegalRoleList() {
    let getLegalRoleList = []
    for (let key in RoleMap) {
      if (RoleMap.hasOwnProperty(key) && key !== 'GUEST') {
        getLegalRoleList.push(RoleMap[key]);
      }
    }
    return getLegalRoleList
  }


  getFilters() {
    return [
      new Filter(Filter.prototype.Type.SORT, '序号', 'orderSort'),
      new Filter(Filter.prototype.Type.SORT, '最近', 'orderLastTime'),
      new Filter(Filter.prototype.Type.INPUT, '姓名', 'username'),
      new Filter(Filter.prototype.Type.INPUT, '邮箱', 'email'),
      new Filter(Filter.prototype.Type.INPUT, '电话', 'phone'),
      new Filter(Filter.prototype.Type.SELECTION, '角色', 'role', User.getLegalRoleList()),
      new Filter(Filter.prototype.Type.INPUT, '关键字', 'keyword')
    ]
  };

  //We use this method to get the full js Object.
  render(obj) {
    super.render(obj)
    this.renderEntity('lastTime', Date)
    this.renderEntity('avatar', Tank)
  }


  //获取用户头像的url.
  getAvatarUrl() {
    if (this.avatarUrl) {
      return this.avatarUrl
    } else {
      return require('../../../assets/img/avatar.png')
    }
  }


  //将用户信息存储在本地。
  renderFromLocalStorage() {

    try {
      let userString = readLocalStorage(this.getTAG())

      if (userString) {
        let json = JSON.parse(userString)
        this.render(json)

      }

    } catch (e) {
      removeLocalStorage(this.getTAG())
    }
  }

  //将用户信息存储在本地。
  saveToLocalStorage(rawUserObject = null) {

    saveToLocalStorage(this.getTAG(), JSON.stringify(rawUserObject))
  }

  //清除本地的user信息
  clearLocalStorage() {

    removeLocalStorage(this.getTAG())
  }

  //更新本地持久化了的个别字段。
  updateLocalStorage(opt = {}) {
    try {
      let userString = readLocalStorage(this.getTAG())

      if (userString) {
        let json = JSON.parse(userString)
        $.extend(json, opt)

        saveToLocalStorage(this.getTAG(), JSON.stringify(json))
      }

    } catch (e) {
      removeLocalStorage(this.getTAG())
    }
  }

  getForm() {

    return {
      username: this.username,
      password: this.password,
      email: this.email,
      avatarTankUuid: this.avatar.uuid,
      avatarUrl: this.avatar.url ? this.avatar.url : null,
      phone: this.phone,
      gender: this.gender,
      role: this.role,
      city: this.city,
      uuid: this.uuid ? this.uuid : null
    }
  }

  validate() {

    return super.validate()
  }

  httpSave(successCallback, errorCallback) {
    let that = this
    let url = this.getUrlCreate()
    if (this.uuid) {
      url = this.getUrlEdit()
    }

    if (!this.validate()) {
      that.defaultErrorHandler(this.errorMessage, errorCallback)
      return
    }

    let form = this.getForm()

    this.httpPost(url, form, function (response) {

      that.render(response.data.data)

      successCallback && successCallback(response)

    }, errorCallback)
  }

  //local logout.
  innerLogout() {

    this.render(new User())


    this.clearLocalStorage()

  }

  innerLogin(response) {
    let that = this
    that.errorMessage = null
    that.render(response.data.data)

    //登录成功后去本地保存一下用户的简单信息，方便下次自动填入个别字段。
    this.saveToLocalStorage(response.data.data)

  }

  resetValidate() {

    if (!this.phone) {
      this.errorMessage = '手机必填'
      return false
    }
    if (!this.password) {
      this.errorMessage = '密码必填'
      return false
    }

    return true
  }

  hasPermission(featureType) {
    if (this.role === Role.ADMIN) {
      return true
    } else if (this.role === Role.USER) {
      return featureType === FeatureType.PUBLIC || featureType === FeatureType.USER_MINE
    } else {
      return featureType === FeatureType.PUBLIC
    }

  }

  getResetForm() {
    return {
      phone: this.phone,
      password: this.password
    }
  }

  httpLogin(successCallback, errorCallback) {

    let that = this

    //验证参数。
    if (!this.email) {
      this.errorMessage = '邮箱必填'
      return
    }
    if (!this.localPassword) {
      this.errorMessage = '密码必填'
      return
    }
    this.errorMessage = null

    let form = {
      email: this.email,
      password: this.localPassword
    }

    this.httpPost(User.URL_LOGIN, form, function (response) {

      that.innerLogin(response)

      successCallback && successCallback(response)
    }, function (response) {

      that.errorMessage = that.getErrorMessage(response)
      errorCallback && errorCallback(response)
    })
  }

  httpResetPassword(successCallback, errorCallback) {
    let that = this

    if (!this.resetValidate()) {
      return
    }

    let form = this.getResetForm()

    this.httpPost(User.URL_MEMBER_RESET_PASSWORD, form, function (response) {

      successCallback && successCallback(response)
    }, errorCallback)

  }

  httpLogout(successCallback, errorCallback) {

    let that = this

    that.innerLogout()

    this.httpPost(User.URL_LOGOUT, {}, function (response) {

      successCallback && successCallback(response)
    }, errorCallback)
  }

  httpUserChangePassword(oldPassword, newPassword, successCallback, errorCallback) {
    let that = this
    this.httpPost(User.URL_USER_CHANGE_PASSWORD, {
      'oldPassword': oldPassword,
      'newPassword': newPassword
    }, function (response) {
      typeof successCallback === 'function' && successCallback(response)
    }, errorCallback)
  }

  httpUserResetPassword(newPassword, successCallback, errorCallback) {
    let that = this
    this.httpPost(User.URL_USER_RESET_PASSWORD, {
      'userUuid': this.uuid,
      'newPassword': newPassword
    }, function (response) {
      typeof successCallback === 'function' && successCallback(response)
    }, errorCallback)
  }

  httpConfirmEmail(successCallback, errorCallback) {
    let that = this
    this.httpPost(User.URL_USER_EMAIL_SEND, {}, function (response) {
      Notification.success({
        message: '验证短信发送成功，请登录邮箱查看'
      })
      typeof successCallback === 'function' && successCallback(response)
    }, errorCallback)
  }


  //修改用户状态
  httpStatus(status, remark, successCallback, errorCallback) {
    let that = this

    let form = {
      uuid: this.uuid,
      status: status,
      remark: remark || null
    }

    this.httpPost(User.URL_USER_STATUS, form, function (response) {

      that.render(response.data.data)

      if (typeof successCallback === 'function') {
        successCallback(response)
      } else {
        let message = "修改状态成功";
        if (status === Status.OK) {
          message = "已成功将用户置为正常状态"
        } else if (status === Status.DISABLE) {
          message = "已禁用用户"
        }
        Notification.success({
          message: message
        })

      }
    }, errorCallback)
  }
}

//注册Gender这个枚举变量
User.registerEnum('Gender', GenderMap)
User.registerEnum('Role', RoleMap)
User.registerEnum('Status', StatusMap)


