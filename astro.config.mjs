// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://corebau.local',
  redirects: {
    '/': '/es/',
  },
  integrations: [
    starlight({
      title: 'CoreBau Docs',
      description:
        'Documentación oficial del monorepo CoreBau: módulos, permisos, placeholders, glifos, compilación y guía de implementación.',
      logo: {
        src: './src/assets/logo.png',
        replacesTitle: true,
      },
      favicon: '/favicon.png',
      defaultLocale: 'es',
      locales: {
        es: { label: 'Español', lang: 'es' },
      },
      social: {
        github: 'https://github.com/xgamerscl/CoreBau',
      },
      editLink: {
        baseUrl: 'https://github.com/xgamerscl/CoreBau/edit/main/docs/',
      },
      lastUpdated: true,
      sidebar: [
        {
          label: 'Empezar',
          items: [
            { label: 'Introducción', link: '/' },
            { label: 'Arquitectura', link: '/introduccion/arquitectura/' },
            { label: 'Instalación', link: '/introduccion/instalacion/' },
          ],
        },
        {
          label: 'Módulos',
          items: [
            { label: 'Visión general', link: '/modulos/overview/' },
            { label: 'Board', link: '/modulos/board/' },
            { label: 'Selector', link: '/modulos/selector/' },
            { label: 'Lobby', link: '/modulos/lobby/' },
            { label: 'Baúl + Pets', link: '/modulos/baul/' },
            { label: 'NPC', link: '/modulos/npc/' },
            { label: 'Perfil', link: '/modulos/profile/' },
            { label: 'Core (Velocity)', link: '/modulos/core-velocity/' },
          ],
        },
        {
          label: 'Permisos & Placeholders',
          items: [
            { label: 'Permisos por módulo', link: '/permisos/listado/' },
            { label: 'Placeholders nativos', link: '/permisos/placeholders/' },
          ],
        },
        {
          label: 'Glifos',
          items: [
            { label: 'Visión general', link: '/glifos/overview/' },
            { label: 'ItemsAdder (1.21.11)', link: '/glifos/itemsadder/' },
            { label: 'Nexo Engine (1.21.11)', link: '/glifos/nexo/' },
          ],
        },
        {
          label: 'Implementación',
          items: [
            { label: 'Cómo se hizo', link: '/implementacion/como-se-hizo/' },
            { label: 'Buenas prácticas', link: '/implementacion/buenas-practicas/' },
            { label: 'Agregar un módulo', link: '/implementacion/agregar-modulo/' },
            { label: 'Ejemplos', link: '/implementacion/ejemplos/' },
          ],
        },
        {
          label: 'Compilar',
          items: [
            { label: 'Builds y scripts', link: '/compilar/builds/' },
            { label: 'Cambios y workflow', link: '/compilar/workflow/' },
          ],
        },
      ],
    }),
  ],
});
