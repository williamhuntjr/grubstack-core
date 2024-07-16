const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function getCurrentDay(): string {
  const d = new Date()
  let day = days[d.getDay()]
  return day
}

export function getDay(id: number): string {
  let day = days[id]
  return day
}
