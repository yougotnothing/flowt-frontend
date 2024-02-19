import { FC } from "react";

import { Search as Desktop } from "./desktop/Search";
import { Search as Mobile } from "./mobile/Search";

export const Search: FC = () => {
  return (
    <>
      <Desktop />
      <Mobile />
    </>
  )
}