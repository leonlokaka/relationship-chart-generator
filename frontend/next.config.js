/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './assetsLoader.ts',
  },
  env: {
    //Production
    // GA_MEASUREMENT_ID: "",

    // Dev
    GA_MEASUREMENT_ID: "",
  },
};

module.exports = nextConfig;
