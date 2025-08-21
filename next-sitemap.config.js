/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://liquidglass.liqueai.com', // 替换为你的域名
  generateRobotsTxt: true, // 自动生成 robots.txt
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  // 可选：多语言、排除页面等配置
  // exclude: ['/admin/*', '/404'],
};