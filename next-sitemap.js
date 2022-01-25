const siteUrl = "https://amanieric.com";

// eslint-disable-next-line no-undef
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/account/*", "/password/*", "profile", "404"],
      },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [`${siteUrl}/server-sitemap.xml`],
  },
  exclude: ["/account/*", "/password/*", "profile", "404"],
};
