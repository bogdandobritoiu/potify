import { withAuth } from "@contexts/auth";
import { SearchScreen } from "@screens/Dashboard/Search";
import React from "react";

export async function getStaticProps() {
  return {
    props: {
      layout: "dashboard",
    },
  };
}

const SearchPage = (props) => <SearchScreen {...props} />;

export default withAuth(SearchPage);
