export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export const formatFullTime = date => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const hour = d.getHours()
  const minute = d.getMinutes()
  const second = d.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const formatTime = date => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  return [year,month,day] 
}

export const wait = time => {
  return new Promise(resolve => { setTimeout(resolve, time) })
}

//强制保留2位小数
export const toDecimal = (x) => { 
  x = parseFloat(x)
  if (isNaN(x)) { 
    return "3.50"
  } 
  let f = Math.round(x*100)/100 
  let s = f.toString() 
  let rs = s.indexOf('.')
  if (rs < 0) { 
    rs = s.length
    s += '.' 
  } 
  while (s.length <= rs + 2) { 
    s += '0' 
  } 
  return s 
}





