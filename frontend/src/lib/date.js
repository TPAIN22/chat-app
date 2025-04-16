export const formatTime = (dateString) => {
    if (!dateString) return "";
  
    const date = new Date(dateString);
    const now = new Date();
  
    const isToday = date.toDateString() === now.toDateString();
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();
  
    if (isToday) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }); // e.g., 02:45 PM
    } else if (isYesterday) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
      }); // e.g., Apr 14
    }
  };
  