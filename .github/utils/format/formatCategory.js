export default function formatCategory(str) {
  if (str === 'seo') return 'SEO';
  else if (str === 'pwa') return 'PWA';
  return str.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}
