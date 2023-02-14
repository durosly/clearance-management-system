import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
			<ToastContainer />
		</SessionProvider>
	);
}
