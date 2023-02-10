import handleSession from "../../../session/handle-session";
import { ADMIN_LEVEL } from "../../../auth_constants/auth";
import AdminLayout from "../../../components/admin/layout/admin-layout";

function Department() {
	return <AdminLayout>Deparment</AdminLayout>;
}

export default Department;

export async function getServerSideProps(context) {
	const user = await handleSession({
		req: context.req,
		authLevel: [ADMIN_LEVEL],
	});

	if (!user) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	// const colleges = await CollegeModel.find({});

	return {
		props: {
			// collegesDB: stringifyDoc(colleges),
		},
	};
}
