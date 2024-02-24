export function formatIndianNumber(number) {
    let numStr = String(number);
    let parts = numStr.split(".");
  
    let formatted = "";
    let count = 0;
    let firstCommaPlaced = false;
  
    // Handle the part before the decimal point
    for (let i = parts[0].length - 1; i >= 0; i--) {
      // Add the current character to the beginning of the formatted string
      formatted = parts[0][i] + formatted;
  
      // Increment the count
      count++;
  
      // Add a comma after every two digits, except for the last two digits
      if (firstCommaPlaced && count % 2 === 0 && i !== 0) {
        formatted = "," + formatted;
      }
  
      // Add a comma after every three digits, except for the last three digits
      if (!firstCommaPlaced && count % 3 === 0 && i !== 0) {
        formatted = "," + formatted;
        count = 0;
      }
    }
  
    // Handle the part after the decimal point, if any
    if (parts.length > 1) {
      formatted += "." + parts[1].slice(0, 2); // Limit decimal places to 2
    } else {
      formatted += ".00"; // Add ".00" if there are no decimal places
    }
  
    return formatted;
  }
  