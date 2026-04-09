// src/components/JsonLd.jsx
import { env } from '@/util/constants/common';

export default function JsonLd({
    type,
    title,
    description,
    image,
    url,
    publishedDate,
    author = "BEAS Consultancy And Services Private Limited",
  }) {
    const schema = {
      "@context": "https://schema.org",
      "@type": type,
      headline: title,
      description: description,
      image: image,
      datePublished: publishedDate,
      dateModified: publishedDate,
      author: {
        "@type": "Organization",
        name: author,
      },
      publisher: {
        "@type": "Organization",
        name: author,
        logo: {
          "@type": "ImageObject",
          url: `${env.FRONTEND_BASE_URL}/assets/images/favicon.ico`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
    };
  
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  }