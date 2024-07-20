module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'travel-journal-api-bootcamp.do.dibimbing.id',
      },
      {
        protocol: 'https',
        hostname: 'www.state.gov',
      },
      {
        protocol: 'https',
        hostname: 'a.travel-assets.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard/user',
        permanent: true,
      },
    ];
  },
};
