export const is_in_app_browser = (): boolean => {
    const userAgent = 
      typeof navigator !== "undefined" && navigator.userAgent
        ? navigator.userAgent
        : typeof navigator !== "undefined" && navigator.vendor
        ? navigator.vendor
        : typeof window !== "undefined" && "opera" in window
        ? (window.opera as unknown as string) 
        : "";
  
    // Common patterns for in-app browsers
    const inAppBrowserPatterns = [
      /FBAN|FBAV/i,         // Facebook
      /Instagram/i,         // Instagram
      /Line/i,              // LINE
      /Twitter/i,           // Twitter
      /Snapchat/i,          // Snapchat
      /WhatsApp/i           // WhatsApp
    ];
  
    return inAppBrowserPatterns.some(pattern => pattern.test(userAgent));
  }
  