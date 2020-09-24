export const distributeIntegerGen = function* (total, divider) {
  if (divider === 0) {
    yield 0
  } else {
    let base = total
    let rest = total % divider
    let result = total / divider

    for (let i = 0; i < divider - 1; i++) {
      if(i == 0) {
        yield total
      }
      if (rest-- > 0) {
        base = base - Math.ceil(result)
        yield base
      } else {
        base = base - Math.floor(result)
        yield base
      }
    }
  } 
}

export const distributeInteger = function (total, divider, reverse = false) {
  let distribution = []
  if (divider === 0) {
    distribution = [0]
  } else {
    let base = total
    let rest = total % divider
    let result = total / divider

    for (let i = 0; i < divider; i++) {
      if(i == 0) {
        distribution.push(total)
        continue
      }
      if(distribution[i-1] <= 0 ){
        distribution.push(distribution[i-1] - 1)
        continue
      }
      if (rest-- > 0) {
        base = base - Math.ceil(result)
        distribution.push(base)
        continue
      } else {
        base = base - Math.floor(result)
        distribution.push(base)
        continue
      }
    }
  }
  if(reverse) {
    distribution.reverse()
  }
  return distribution
}