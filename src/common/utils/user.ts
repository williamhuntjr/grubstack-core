export function getAccessToken(): string | undefined {
  const localStorageData = localStorage.getItem('grubToken')
  if (localStorageData != null) {
    return localStorageData
  }
  return undefined
}

export function setAccessToken(accessToken: string): void {
  if (accessToken) {
    localStorage.setItem('grubToken', accessToken)
  }
}
