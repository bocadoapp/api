export const capitalize = (str: String) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

export const generateRandomPassword = () => Math.random().toString(36).slice(-8)
