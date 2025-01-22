

export function getDateTime() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const currentDate = new Date().toLocaleString("en-US", { timeZone: timezone });
  return {
    timezone,
    dateTime: currentDate
  }
}