import Script from "next/script";

export function GoogleAdsense() {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8817321986799686"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

export default GoogleAdsense;