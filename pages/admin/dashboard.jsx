import handleSession from "../../session/handle-session";
import AdminLayout from "../../components/admin/layout/admin-layout";

function Dashboard() {
	return <AdminLayout>Nice</AdminLayout>;
}

export default Dashboard;

export async function getServerSideProps(context) {
	const user = await handleSession({
		req: context.req,
		authLevel: ["admin"],
	});

	if (!user) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			user: JSON.parse(JSON.stringify(user)),
		},
	};
}
