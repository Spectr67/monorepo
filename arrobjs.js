// let arr1 = ['foo', 'bar', 'baz']
// let arr2 = [...arr1]

// arr2[1] = 'xxx'

// console.log(arr1[1])

// //

// let arr3 = [{ x: 'foo' }, { x: 'bar' }, { x: 'baz' }]
// let arr4 = [...arr3]

// arr3[1].x = 'xxx'

// console.log(arr4[1].x)

let personOksana = {
  id: 1,
  name: 'Oksana',
}

let yuraPhoneBook = [{ phone: '111', person: personOksana }]

let arturPhoneBook = [...yuraPhoneBook]

console.log(yuraPhoneBook)

console.log(arturPhoneBook)

yuraPhoneBook[0].phone = '333'

console.log(yuraPhoneBook)

console.log(arturPhoneBook)

// value-objects

// let moneyA = {
//   ccy: 'UAH',
//   value: 20,
// }

// let moneyB = {
//   ccy: 'UAH',
//   value: 30,
// }

// let moneyC = {
//   ccy: 'UAH',
//   value: 50,
// }

// passport

// policeman.validatePassport(passport)
