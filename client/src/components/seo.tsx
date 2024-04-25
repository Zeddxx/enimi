import { Helmet } from "react-helmet-async";

interface ISeo {
  title: string;
  description: string;
  name: string;
  type: string;
}

export default function SEO({ title, description, name, type }: ISeo) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* end facebook tags */}

      {/* twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* twitter tags end */}
    </Helmet>
  );
}
