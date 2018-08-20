//显示bool值
import {simpleDate, simpleDateTime} from "../filter/time";
import {SortDirection} from "../model/base/SortDirection";

export function booleanFormatter(row, column) {
  return row[column.property] ? "是" : "否";
}

//日期格式化
export function dateFormatter(row, column) {
  return simpleDate(row[column.property]);
}

//日期时间格式化
export function dateTimeFormatter(row, column) {
  return simpleDateTime(row[column.property]);
}

//自动排序
export function sortChangeHandler(item, pager, searchFunc) {

  if (!item || !pager) {
    return
  }

  if (!item.order) {
    //清除排序
    pager.resetSortFilters()

  } else {
    let order = SortDirection.ASC
    if (item.order === "descending") {
      order = SortDirection.DESC
    }
    //首字母大写
    let field = item.prop
    field = field.replace(/^\w/, c => c.toUpperCase());

    pager.resetSortFilters()
    pager.setFilterValue('order' + field, order)
  }

  if (typeof searchFunc === "function") {
    searchFunc()
  }
}
