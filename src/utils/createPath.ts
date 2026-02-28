/**
 * Generates a full URL path by prepending the site's base URL.
 * Handles duplicate slashes to ensure a clean URL.
 * 
 * @param path - The path to append to the base URL (e.g., "/about" or "about")
 * @returns The complete URL path including the base URL
 */
export function createPath(path: string): string {
    // Remove trailing slash from base URL if present
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");

    // Ensure path starts with a slash
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    return `${base}${normalizedPath}`;
}
