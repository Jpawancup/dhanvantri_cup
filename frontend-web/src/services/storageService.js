export const getData = (key) => {
  if (typeof window === "undefined") return []
  return JSON.parse(localStorage.getItem(key)) || []
}

export const saveData = (key, data) => {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(data))
}

export const generateId = () => {
  return Date.now().toString()
}
