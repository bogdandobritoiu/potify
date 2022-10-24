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

const PlaylistPage = (props) => {
  return <DynamicPlaylistPage {...props} />;
};

const DynamicPlaylistPage = dynamic<any>(
  () =>
    import("@screens/Dashboard/Playlist").then((value) => value.PlaylistScreen),
  {
    ssr: false,
  }
);

export default withAuth(PlaylistPage);
