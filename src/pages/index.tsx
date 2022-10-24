import { withAuth } from "@contexts/auth";
import { Dashboard } from "@screens/Dashboard";
import React from "react";

export async function getStaticProps() {
  return {
    props: {
      layout: "dashboard",
    },
  };
}

const IndexPage = (props) => <Dashboard {...props} />;

export default withAuth(IndexPage);
