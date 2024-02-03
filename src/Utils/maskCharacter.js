export function maskMiddle(number) {
    if (!number || number.length <= 5) {
      // If the number is undefined or has 5 or fewer digits, don't mask
      return number;
    }
  
    const startVisible = number.slice(0, 2);
    const middleMasked = "*".repeat(number.length - 5); // Mask all except 2 digits on each side
    const endVisible = number.slice(-3);
  
    return startVisible + middleMasked + endVisible;
  }
  