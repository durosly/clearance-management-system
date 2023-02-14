import React from "react";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import handleSession from "../../../session/handle-session";
import { ADMIN_LEVEL } from "../../../auth_constants/auth";
// import { stringifyDoc } from "../../../lib";
import AdminLayout from "../../../components/admin/layout/admin-layout";

function Student() {
	return (
		<AdminLayout>
			<Row className="mt-5">
				<Col>
					<Link
						className="btn btn-primary"
						href="/admin/students/exist"
					>
						View active students
					</Link>
				</Col>
			</Row>
			<Row>
				<Col>
					<h1>New Students</h1>
				</Col>
			</Row>
		</AdminLayout>
	);
}

export default Student;

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

	// const departmentDB = await DepartmentModel.find({});

	// const department = [];

	// for (const dept of departmentDB) {
	// 	const college = await CollegeModel.findById(dept._collegeId);

	// 	department.push({
	// 		_id: dept._id,
	// 		name: dept.name,
	// 		duration: dept.duration,
	// 		abbr: dept.abbr,
	// 		college_name: college.name,
	// 	});
	// }

	return {
		props: {
			// departmentDB: stringifyDoc(department),
		},
	};
}
