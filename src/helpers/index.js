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

/**
 * Create UUIDs 
 * @return {string} Unique UUID
 */
export const createUUID = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => {
    const crypto = window.crypto || window.msCrypto
    //eslint-disable-next-line
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  })
}