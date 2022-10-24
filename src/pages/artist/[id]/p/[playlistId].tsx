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

const ArtistPlaylistPage = (props: any) => {
  return <DynamicArtistPlaylistPage {...props} />;
};

const DynamicArtistPlaylistPage = dynamic<any>(
  () =>
    import("@screens/Dashboard/Artist/Playlist").then(
      (value) => value.ArtistPlaylistScreen
    ),
  {
    ssr: false,
  }
);

export default withAuth(ArtistPlaylistPage);
