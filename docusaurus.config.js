module.exports = {
  title: 'Vulpem Docs',
  tagline: 'Banking on Bitcoin - Enabling the next generation of bitcoin-native financial services',
  url: 'https://docs.vulpem.com',
  baseUrl: '/docs.vulpem.com/', // TODO change before production with custom domain
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
        src: 'img/vulpem_logo.png',
      },
      items: [
        {
          href: 'mailto:hello@vulpem.com',
          label: 'Contact',
          position: 'right',
        },
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
            {
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
            },
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
              href: 'vulpem.medium.com',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/vulpemventures/docs.vulpem.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Vulpem Ventures OU. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/vulpemventures/docs.vulpem.com/edit/master/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
