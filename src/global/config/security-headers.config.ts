export const securityHeadersConfig = {
  xRobotsTag: 'index, follow',
  xFrameOptions: 'SAMEORIGIN',
  xContentTypeOptions: 'nosniff',
  referrerPolicy: 'strict-origin-when-cross-origin',
  permissionsPolicy: 'camera=(), microphone=(), geolocation=()',
} as const;

/** Request header the middleware uses to hand the nonce to server components. */
export const NONCE_HEADER = 'x-nonce';

type CspOptions = {
  nonce: string;
  /** React refresh in `next dev` needs eval; production never gets it. */
  dev?: boolean;
};

/**
 * Per-request policy for HTML routes. Inline scripts run only with the nonce;
 * 'strict-dynamic' lets those trusted scripts load their own chunks.
 */
export function buildContentSecurityPolicy({ nonce, dev }: CspOptions) {
  return [
    "default-src 'self'",
    [
      "script-src 'self'",
      `'nonce-${nonce}'`,
      "'strict-dynamic'",
      'https://va.vercel-scripts.com',
      dev ? "'unsafe-eval'" : '',
    ]
      .filter(Boolean)
      .join(' '),
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://img.shields.io",
    "font-src 'self'",
    "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
}

/**
 * Static policy for /api responses (JSON and the proxied badge SVG): nothing
 * may run, even if an SVG is opened directly.
 */
export const apiContentSecurityPolicy = [
  "default-src 'none'",
  "style-src 'unsafe-inline'",
  'img-src data:',
  "frame-ancestors 'none'",
  'sandbox',
].join('; ');

export function getSecurityHeaders(): { key: string; value: string }[] {
  const {
    xRobotsTag,
    xFrameOptions,
    xContentTypeOptions,
    referrerPolicy,
    permissionsPolicy,
  } = securityHeadersConfig;

  return [
    { key: 'X-Robots-Tag', value: xRobotsTag },
    { key: 'X-Frame-Options', value: xFrameOptions },
    { key: 'X-Content-Type-Options', value: xContentTypeOptions },
    { key: 'Referrer-Policy', value: referrerPolicy },
    { key: 'Permissions-Policy', value: permissionsPolicy },
  ];
}
