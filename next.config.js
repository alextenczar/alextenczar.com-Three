const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const securityHeaders = [{
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
},
{
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self)'
},
{
    key: 'X-Content-Type-Options',
    value: 'nosniff'
},
{
    key: 'Referrer-Policy',
    value: 'same-origin'
},
]

/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: true,
    async headers() {
        return [
            {
                source: '/:path*',
                headers: securityHeaders,
            }
        ]
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
            }
        ],
    },
}

module.exports = withNextIntl(nextConfig)

