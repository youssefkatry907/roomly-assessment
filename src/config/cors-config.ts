/**
 * Parses the comma-separated CORS allowlist from the environment.
 * Empty / unset yields an empty list (no browser origins allowed).
 */
export function getCorsOrigins(): string[] {
  return (process.env.CORS_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
}
