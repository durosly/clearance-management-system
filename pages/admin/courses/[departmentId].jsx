import handleSession from "../../../session/handle-session";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import DepartmentModel from "../../../models/department";
// import CollegeModel from "../../../models/college";
import CourseModel from "../../../models/course";
import { stringifyDoc } from "../../../lib";
import { ADMIN_LEVEL } from "../../../auth_constants/auth";
import AdminLayout from "../../../components/admin/layout/admin-layout";

function DepartmentCourses({ courseDB, departmentDB }) {
	return (
		<AdminLayout>
			<Row>
				<Col>
					<h1>Courses for {departmentDB.name}</h1>
					<Table
						striped
						bordered
						hover
						responsive
					>
						<thead>
							<tr>
								<th>#</th>
								<th>Title</th>
								<th>Code</th>
								<th>Unit</th>
								<th>Level</th>
							</tr>
						</thead>
						<tbody>
							{courseDB.map((c, i) => (
								<tr key={c._id}>
									<td>{i + 1}</td>
									<td>{c.title}</td>
									<td>{`${departmentDB.abbr}${c.code}`}</td>
									<td>{c.unit}</td>
									<td>{c.level}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Col>
			</Row>
		</AdminLayout>
	);
}

export default DepartmentCourses;

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

	const course = await CourseModel.find({
		_departmentId: context.params.departmentId,
	}).sort("-level");
	const department = await DepartmentModel.findById(
		context.params.departmentId
	);

	return {
		props: {
			courseDB: stringifyDoc(course),
			departmentDB: stringifyDoc(department),
		},
	};
}
