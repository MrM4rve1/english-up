/** GitHub Pages exports a fully static website; no runtime server or API secrets. */
const [owner='', repo='']=(process.env.GITHUB_REPOSITORY||'').split('/');
const isPagesRoot = repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;
const basePath = process.env.GITHUB_ACTIONS === 'true' && repo && !isPagesRoot ? `/${repo}` : '';
/** @type {import('next').NextConfig} */
const config = {
  output:'export',
  trailingSlash:true,
  basePath,
  images:{unoptimized:true},
  env:{NEXT_PUBLIC_BASE_PATH:basePath},
};
export default config;
