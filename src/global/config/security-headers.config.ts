export const securityHeadersConfig = {
  xRobotsTag: 'index, follow',
  xFrameOptions: 'SAMEORIGIN',
  xContentTypeOptions: 'nosniff',
  referrerPolicy: 'strict-origin-when-cross-origin',
  permissionsPolicy: 'camera=(), microphone=(), geolocation=()',
  contentSecurityPolicy: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://img.shields.io",
    "font-src 'self'",
    "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
} as const;

export function getSecurityHeaders(): { key: string; value: string }[] {
  const {
    xRobotsTag,
    xFrameOptions,
    xContentTypeOptions,
    referrerPolicy,
    permissionsPolicy,
    contentSecurityPolicy,
  } = securityHeadersConfig;

  return [
    { key: 'X-Robots-Tag', value: xRobotsTag },
    { key: 'X-Frame-Options', value: xFrameOptions },
    { key: 'X-Content-Type-Options', value: xContentTypeOptions },
    { key: 'Referrer-Policy', value: referrerPolicy },
    { key: 'Permissions-Policy', value: permissionsPolicy },
    { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  ];
}
