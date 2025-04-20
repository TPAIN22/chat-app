export function cn(...args) {
    return args
      .flatMap(arg => {
        if (typeof arg === "string") return arg;
        if (typeof arg === "object" && arg !== null) {
          return Object.entries(arg)
            .filter(([_, value]) => Boolean(value))
            .map(([key]) => key);
        }
        return [];
      })
      .join(" ");
  }
  