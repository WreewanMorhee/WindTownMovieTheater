import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  const robotsText = `
    User-agent: *
    Allow: /
    Disallow: /member/to-see-list
    Sitemap: https://yourdomain.com/sitemap.xml
  `;

  return new Response(robotsText, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};