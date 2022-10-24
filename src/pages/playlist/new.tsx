import { withAuth } from "@contexts/auth";
import { NewPlaylistScreen } from "@screens/Dashboard/Playlist/new";

export async function getStaticProps() {
  return {
    props: {
      layout: "dashboard",
    },
  };
}

const NewPlaylistPage = () => {
  return <NewPlaylistScreen />;
};

export default withAuth(NewPlaylistPage);
