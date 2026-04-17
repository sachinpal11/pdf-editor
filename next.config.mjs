/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['pdfjs-dist'],
  webpack: (config, { isServer }) => {
    config.resolve.alias.canvas = false;
    if (!isServer) {
      config.resolve.alias['pdfjs-dist/legacy/build/pdf.mjs'] = 'pdfjs-dist/build/pdf.mjs';
    }
    return config;
  },
};

export default nextConfig;
