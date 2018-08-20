import BaseEntity from "../base/BaseEntity";
import Filter from "../base/Filter";
import Tank from "../tank/Tank";
import User from "../user/User";
import { FilterType } from "../base/FilterType";


export default class Site extends BaseEntity {
  constructor(args) {
    super(args);

    this.userUuid = null;
    this.name = null;
    this.faviconTankUuid = null;
    this.faviconUrl = null;

    this.url = null;
    this.hit = null;
    this.visible = true;


    this.favicon = new Tank("image", false, 1024 * 1024, "图片尺寸200*200,超过部分会被裁剪。");
    this.user = new User();


    this.validatorSchema = {
      name: {
        rules: [
          { required: true, message: "名称必填" }],
        error: null
      },
      url: {
        rules: [
          { required: true, message: "链接必填" }
        ],
        error: null
      }
    };
  }

  render(obj) {
    super.render(obj);

    this.renderEntity("user", User);
    this.renderEntity("favicon", Tank);
  }

  getFilters() {
    return [
      new Filter(FilterType.INPUT, "名称", "name"),
      new Filter(FilterType.INPUT, "链接", "url"),
      new Filter(FilterType.CHECK, "可见性", "visible"),
      new Filter(FilterType.SORT, "修改时间", "orderModifyTime"),
      new Filter(FilterType.SORT, "创建时间", "orderCreateTime"),
      new Filter(FilterType.SORT, "排序", "orderSort")
    ];
  }

  getForm() {
    let form = {
      name: this.name,
      url: this.url,
      faviconTankUuid: this.faviconTankUuid,
      faviconUrl: this.faviconUrl,
      visible: this.visible
    };

    if (this.uuid) {
      form.uuid = this.uuid;
    }

    return form;

  }

  getDisplayTitle() {
    return this.name;
  }
}
