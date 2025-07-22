export const generateSEO = ({
  title,
  description,
  canonical,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags = [],
}: {
  title: string;
  description: string;
  canonical: string;
  image: string;
  type?: 'website' | 'profile' | 'film';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}) => {
  return {
    title,
    description,
    canonical,
    openGraph: {
      type,
      url: canonical,
      title,
      description,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
      ...(type === 'film' && {
        film: {
          publishedTime,
          modifiedTime,
          tags,
        },
      }),
    },
    twitter: {
      cardType: 'summary_large_image',
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: tags.join(', '),
      },
    ],
  };
};
