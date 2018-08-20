import BaseEntity from '../base/BaseEntity'

export default class Preference extends BaseEntity {
  constructor(args) {
    super(args)
    //网站名称
    this.name = null


    this.version = null

    this.validatorSchema = {
      name: {
        rules: [{required: true, message: '网站名称必填'}],
        error: null
      }
    }
  }

  static URL_API_PREFERENCE_FETCH = '/api/preference/fetch'

  render(obj) {
    super.render(obj)

  }

  getForm() {
    return {
      name: this.name
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
