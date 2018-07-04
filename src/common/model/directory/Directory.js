import UserInputSelection from '../../../backyard/user/widget/UserInputSelection'
import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import User from '../user/User'

export default class Directory extends BaseEntity {
  constructor(args) {
    super(args)
    this.userUuid = null
    this.name = null
    this.puuid = null

    this.parent = null
    this.children = []


    //UI使用的，展开或者收起
    this.open = true

    this.validatorSchema = {
      name: {
        rules: [{required: true, message: '名称必填'}, {min: 1, max: 45, message: '名称最长45字'}],
        error: null
      }
    }
  }

  render(obj) {
    super.render(obj)

    this.renderEntity("parent", Directory)
    this.renderList("children", Directory)
  }


  getFilters() {
    return [
      new Filter(Filter.prototype.Type.SORT, '排序', 'orderSort'),
      new Filter(Filter.prototype.Type.INPUT, '名称', 'name'),
      new Filter(Filter.prototype.Type.HTTP_INPUT_SELECTION, '用户', 'userUuid', null, User, false, UserInputSelection),
      new Filter(Filter.prototype.Type.INPUT, '父级文件夹', 'puuid', null, null, false)
    ]
  }

  getForm() {
    return {
      name: this.name,
      puuid: this.puuid,
      uuid: this.uuid ? this.uuid : null
    }
  }

  validate() {
    return super.validate()
  }

}
