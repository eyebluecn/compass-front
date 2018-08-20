let UserRole = {
  GUEST: 'GUEST',
  USER: 'USER',
  ADMIN: 'ADMIN'
}
let UserRoleMap = {
  GUEST: {
    name: '游客',
    value: 'GUEST',
    style: 'primary'
  },
  USER: {
    name: '注册用户',
    value: 'USER',
    style: 'success'
  },

  ADMIN: {
    name: '管理员',
    value: 'ADMIN',
    style: 'danger'
  }
}

let UserRoleList = [];
let UserRoleAbleList = [];
for (let key in UserRoleMap) {
  if (UserRoleMap.hasOwnProperty(key)) {
    UserRoleList.push(UserRoleMap[key]);
    if (key !== UserRole.GUEST) {
      UserRoleAbleList.push(UserRoleMap[key]);
    }
  }
}

export {UserRole, UserRoleMap, UserRoleList, UserRoleAbleList}
