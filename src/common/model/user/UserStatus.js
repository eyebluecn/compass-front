let UserStatus = {

  OK: 'OK',
  DISABLE: 'DISABLE'
}
let UserStatusMap = {

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


let UserStatusList = [];
for (let key in UserStatusMap) {
  if (UserStatusMap.hasOwnProperty(key)) {
    UserStatusList.push(UserStatusMap[key]);
  }
}

export {UserStatus, UserStatusMap, UserStatusList}
