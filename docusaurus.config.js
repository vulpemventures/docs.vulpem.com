const path = require('path');
module.exports = {
  title: 'Vulpem Docs',
  tagline: 'Banking on Bitcoin - Enabling the next generation of bitcoin-native financial services',
  url: 'https://docs.vulpem.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'vulpemventures', // Usually your GitHub org/user name.
  projectName: 'docs.vulpem.com', // Usually your repo name.
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
    },
    prism: {
      theme: require('prism-react-renderer/themes/vsDark'),
      darkTheme: require('prism-react-renderer/themes/synthwave84')

    },
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
              href: 'https://vulpem.medium.com',
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
  plugins: [path.resolve(__dirname, 'custom-webpack-config')]
};
