let UserGender = {
  UNKNOWN: 'UNKNOWN',
  MALE: 'MALE',
  FEMALE: 'FEMALE'
}
let UserGenderMap = {
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


let UserGenderList = [];
let UserGenderAbleList = [];
for (let key in UserGenderMap) {
  if (UserGenderMap.hasOwnProperty(key)) {
    UserGenderList.push(UserGenderMap[key]);
    if (key !== UserGender.UNKNOWN) {
      UserGenderAbleList.push(UserGenderMap[key]);
    }
  }
}

export {UserGender, UserGenderMap, UserGenderList, UserGenderAbleList}
