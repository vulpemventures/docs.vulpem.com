module.exports = {
  title: 'Vulpem Docs',
  tagline: 'Banking on Bitcoin - Enabling the next generation of bitcoin-native financial services',
  url: 'https://docs.vulpem.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'vulpemventures', // Usually your GitHub org/user name.
  projectName: 'docs.vulpem.com', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Vulpem Docs',
      logo: {
        alt: 'Vulpem Ventures Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/vulpemventures/docs.vulpem.com',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            /* {
              label: 'Marina',
              to: 'docs/marina/',
            },
            {
              label: 'Nigiri',
              to: 'docs/nigiri/',
            },
            {
              label: 'Liquid.Taxi',
              to: 'docs/taxi/',
            }, */
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/vulpemventures',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/vulpemventures/docs.vulpem.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
