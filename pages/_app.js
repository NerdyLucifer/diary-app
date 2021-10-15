import Layout from "../components/Layout";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "../context/auth";
import Navigationbar from "../components/NavigationBar";
import SSRProvider from "react-bootstrap/SSRProvider";

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <AuthProvider>
        <Layout>
          <Navigationbar />
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </SSRProvider>
  );
}

export default MyApp;
