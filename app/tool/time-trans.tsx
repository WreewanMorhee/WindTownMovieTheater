export const format_timestamp_to_ISO8601 = (date: Date): string => {
  
    // Get components of the date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
  
    // Format to ISO 8601 format
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  }