import { LoginScreen } from "@screens/Login";

export async function getStaticProps() {
  return {
    props: {
      layout: "login",
    },
  };
}

const LoginPage = () => {
  return <LoginScreen />;
};

export default LoginPage;
