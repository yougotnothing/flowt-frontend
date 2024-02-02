import { FC } from "react";

import { Helmet } from "react-helmet-async";

export const Title: FC<{ title: string }> = ({ title }) => {
  return (
    <Helmet>
      <meta name="description" content="Description of my page" />
      <title>{title}</title>
    </Helmet>
  );
}