# froystein.jp

[www.froystein.jp](https://www.froystein.jp) is the public website for Froystein Consulting.

The site is built with Astro and Bun, then served as static files from nginx.

## Development

Use the `justfile` for all project tasks:

```sh
just install
just dev
just check
just preview
```

`just check` runs Astro diagnostics, formatting checks, YAML validation, a static production build, and focused build-output tests.
