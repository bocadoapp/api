export const capitalize = (str: String) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

export const generateRandomPassword = () => Math.random().toString(36).slice(-8)

export const getName = (profile: any) => {
  if (profile.displayName) {
    return profile.displayName
  }

  let name = ''

  if (profile.name.givenName) {
    name = `${profile.name.givenName} `
  }

  if (profile.name.middleName) {
    name = `${name}${profile.name.middleName} `
  }

  if (profile.name.middleName) {
    name = `${name}${profile.name.middleName} `
  }

  if (profile.name.familyName) {
    name = `${name}${profile.name.familyName}`
  }

  return name.trim()
}
