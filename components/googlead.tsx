'use client';
import { useEffect } from "react";

export function GoogleAdsense() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8817321986799686";
    script.crossOrigin = "anonymous";

    document.head.appendChild(script);
  }, []);

  return null;
}

export default GoogleAdsense;