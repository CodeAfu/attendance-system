

export function getDateTime() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const currentDate = new Date().toLocaleString("en-US", { timeZone: timezone });
  return {
    timezone,
    dateTime: currentDate
  }
}

export function getUrl() {
  const isDev = process.env.NODE_ENV === "development";
  
  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL; // For Vercel deployments
  const customDomain = process.env.NEXT_PUBLIC_SITE_URL; // For custom domains
  
  const protocol = isDev ? "http" : "https";
  
  const host = isDev 
    ? "localhost:3000" 
    : customDomain || vercelUrl || "your-production-domain.com";

  const cleanHost = host?.replace(/\/$/, "") || "";

  return `${protocol}://${cleanHost}`;
}
