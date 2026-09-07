# evatov.uz

Personal site. Static HTML and CSS, no framework, no build step.

```
public/
  index.html
  style.css
  cv.pdf
wrangler.jsonc
```

Edit `public/index.html` and `public/style.css` directly. Open the HTML file in
a browser to preview — there is nothing to compile.

Outstanding `TODO`s are HTML comments in `index.html`: repo links for two
projects, the university start year, and every contact detail.

## Deploy

```bash
npx wrangler deploy
```

Cloudflare serves `public/` as static assets. In the dashboard the project's
deploy command is `npx wrangler deploy`; leave the build command empty.
