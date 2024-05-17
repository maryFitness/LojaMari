/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: 'ik.imagekit.io',
        },
        {
          hostname: 'plus.unsplash.com'
        }
      ]
    }
  };
  
  export default nextConfig;