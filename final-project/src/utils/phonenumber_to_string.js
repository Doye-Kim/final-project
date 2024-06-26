const getMask = (phoneNumber) => {
  if (!phoneNumber) return phoneNumber
  phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

  let res = ''
  if (phoneNumber.length < 3) {
    res = phoneNumber
  } else {
    if (phoneNumber.length < 8) {
      res = phoneNumber
    } else if (phoneNumber.length == 8) {
      res = phoneNumber.substr(0, 4) + '-' + phoneNumber.substr(4)
    } else if (phoneNumber.length == 9) {
      res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6)
    } else if (phoneNumber.length == 10) {
      res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6)
    } else if (phoneNumber.length > 10) {
      //010-1234-5678
      res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 4) + '-' + phoneNumber.substr(7)
    }
  }
  return res
}
export default getMask
