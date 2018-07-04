let JumpType = {
  //不响应
  NONE: "NONE",
  //转跳到一个普通URL中去
  URL: "URL",
  //转跳到一篇文章中去
  ARTICLE: "ARTICLE",
  //转跳到一个栏目中去
  DIRECTORY: "DIRECTORY"
}

let JumpTypeMap = {
  NONE: {
    name: '不响应',
    value: 'NONE',
    style: 'default'
  },
  URL: {
    name: '网页链接',
    value: 'URL',
    style: 'success'
  },
  ARTICLE: {
    name: '文章',
    value: 'ARTICLE',
    style: 'info'
  },
  DIRECTORY: {
    name: '栏目',
    value: 'DIRECTORY',
    style: 'primary'
  }
}

let JumpTypeList = [];
for (let key in JumpTypeMap) {
  if (JumpTypeMap.hasOwnProperty(key)) {
    JumpTypeList.push(JumpTypeMap[key]);
  }
}

export { JumpType, JumpTypeMap, JumpTypeList }
