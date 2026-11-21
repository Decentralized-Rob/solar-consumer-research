import { CopyShareLink } from "./article-share-copy";

const SITE_ORIGIN = "https://solarcomplaint.com";

type ShareProps = {
  href: string;
  title: string;
};

function canonicalShareUrl(href: string) {
  // Keep the share destination identical to the canonical article URL.
  // Never include tracking parameters or page fragments.
  const url = new URL(href, SITE_ORIGIN);
  if (url.origin !== SITE_ORIGIN) {
    throw new Error("Share links must point to SolarComplaint.com");
  }
  return `${SITE_ORIGIN}${url.pathname}`;
}

/** Static anchors: Meta and X receive no requests until a reader clicks. */
export function ArticleShareButtons({ href, title }: ShareProps) {
  const shareUrl = canonicalShareUrl(href);
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const xHref = `https://x.com/intent/post?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;

  return (
    <nav className="sc-share" aria-label="Share this article">
      <a className="sc-share__link" href={facebookHref} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
        <svg className="sc-share__icon" viewBox="0 0 24 24" width="20" height="20" fill="#1877F2" aria-hidden="true" focusable="false">
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
        </svg>
        <span>Share</span>
      </a>
      <a className="sc-share__link" href={xHref} target="_blank" rel="noopener noreferrer" aria-label="Post on X">
        <svg className="sc-share__icon" viewBox="0 0 24 24" width="20" height="20" fill="#000000" aria-hidden="true" focusable="false">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span>Post</span>
      </a>
      <CopyShareLink url={shareUrl} />
    </nav>
  );
}
