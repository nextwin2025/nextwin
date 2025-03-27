export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function formatUrl(url: string): string {
  if (!url) return ""
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`
  }
  return url
}

export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null
  try {
    const urlObj = new URL(url)
    if (urlObj.hostname === "youtu.be") {
      return urlObj.pathname.slice(1)
    }
    if (urlObj.hostname === "www.youtube.com" || urlObj.hostname === "youtube.com") {
      const videoId = urlObj.searchParams.get("v")
      if (videoId) return videoId
      if (urlObj.pathname.startsWith("/embed/")) {
        return urlObj.pathname.slice(7)
      }
      if (urlObj.pathname.startsWith("/v/")) {
        return urlObj.pathname.slice(3)
      }
    }
    return null
  } catch {
    return null
  }
}

export function getTwitchChannelName(url: string): string | null {
  if (!url) return null
  try {
    const urlObj = new URL(url)
    if (urlObj.hostname === "www.twitch.tv" || urlObj.hostname === "twitch.tv") {
      const pathParts = urlObj.pathname.split("/").filter(Boolean)
      if (pathParts.length > 0) {
        return pathParts[0].toLowerCase()
      }
    }
    return null
  } catch {
    return null
  }
}

export function formatUsername(username: string): string {
  return username.toLowerCase().replace(/[^a-z0-9_-]/g, "")
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
} 