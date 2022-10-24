import { withAuth } from "@contexts/auth";
import dynamic from "next/dynamic";

// export async function getStaticPaths() {
//   return {
//     fallback: false,
//   };
// }

// export async function getStaticProps() {
//   return {
//     props: {
//       layout: "dashboard",
//     },
//   };
// }

const ArtistPage = (props) => {
  return <DynamicArtistPage {...props} />;
};

const DynamicArtistPage = dynamic<any>(
  () => import("@screens/Dashboard/Artist").then((value) => value.ArtistScreen),
  {
    ssr: false,
  }
);

export default withAuth(ArtistPage);
