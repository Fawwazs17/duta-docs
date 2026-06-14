// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.duta.indra.sh',
  integrations: [
    starlight({
      title: 'Duta Docs',
      description: 'Transactional email for Malaysian developers.',
      logo: { src: './src/assets/icon.svg', alt: 'Duta' },
      favicon: '/favicon.png',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/indra-sh/duta-js' },
      ],
      sidebar: [
        {
          label: 'Getting started',
          items: [
            { label: 'Introduction', slug: 'index' },
            { label: 'Quickstart', slug: 'quickstart' },
          ],
        },
        {
          label: 'API reference',
          items: [
            { label: 'Send an email', slug: 'api-reference/send' },
            { label: 'Retrieve an email', slug: 'api-reference/get' },
            { label: 'List emails', slug: 'api-reference/list' },
            { label: 'Errors', slug: 'api-reference/errors' },
          ],
        },
        {
          label: 'SDKs',
          items: [
            { label: 'TypeScript / JavaScript', slug: 'sdks/typescript' },
            { label: 'Python', slug: 'sdks/python' },
            { label: 'PHP', slug: 'sdks/php' },
            { label: '.NET / C#', slug: 'sdks/dotnet' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Verify a domain', slug: 'guides/domain-setup' },
            { label: 'Receive webhooks', slug: 'guides/webhooks' },
            { label: 'Migrate from Resend', slug: 'guides/migrate-from-resend' },
          ],
        },
        {
          label: 'Concepts',
          items: [
            { label: 'API keys', slug: 'concepts/api-keys' },
            { label: 'Domains', slug: 'concepts/domains' },
          ],
        },
      ],
    }),
  ],
});
