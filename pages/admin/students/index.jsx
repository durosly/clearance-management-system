import React from "react";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import handleSession from "../../../session/handle-session";
import { ADMIN_LEVEL } from "../../../auth_constants/auth";
// import { stringifyDoc } from "../../../lib";
import ProfileModel from "../../../models/profile";
import AdminLayout from "../../../components/admin/layout/admin-layout";
import Table from "react-bootstrap/Table";
import { stringifyDoc } from "../../../lib";

function Student({ profiles }) {
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
			<Row>
				<Col>
					<Table
						striped
						bordered
						hover
						responsive
					>
						<thead>
							<tr>
								<th>#</th>
								<th>Jamb Reg Number</th>
								<th>Clearance Level</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{profiles.map((p, i) => (
								<tr key={p._id}>
									<td>{i + 1}</td>
									<td>{p.jambreg}</td>
									<td>
										{p.clearanceLevel === 0
											? "Just signed up"
											: p.clearanceLevel === 1
											? "updated profile"
											: "completed profile"}
									</td>
									<td>
										<Link href={`/admin/students/${p._id}`}>
											View Profile
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
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

	const profilesDB = await ProfileModel.find({
		$gte: { clearanceLevel: 0 },
		$lte: { clearanceLevel: 2 },
	}).sort("-clearanceLevel");
	// console.log(profilesDB);
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
			profiles: stringifyDoc(profilesDB),
		},
	};
}
