import { useState } from "react";
import Link from "next/link";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import handleSession from "../../../session/handle-session";
import { ADMIN_LEVEL } from "../../../auth_constants/auth";
import CollegeModel from "../../../models/college";
import DepartmentModel from "../../../models/department";
import { stringifyDoc } from "../../../lib";
import AdminLayout from "../../../components/admin/layout/admin-layout";

function Department({ departmentDB }) {
	return (
		<AdminLayout>
			<Row>
				<Col>
					<h1>Departments</h1>
					<ListGroup>
						{departmentDB.map((d) => (
							<ListGroup.Item key={d._id}>
								<Link
									className="btn btn-primary"
									href={`/admin/courses/${d._id}`}
								>
									{d.name}
								</Link>
							</ListGroup.Item>
						))}
					</ListGroup>
				</Col>
			</Row>
		</AdminLayout>
	);
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

	const departmentDB = await DepartmentModel.find({});

	const department = [];

	for (const dept of departmentDB) {
		const college = await CollegeModel.findById(dept._collegeId);

		department.push({
			_id: dept._id,
			name: dept.name,
			duration: dept.duration,
			abbr: dept.abbr,
			college_name: college.name,
		});
	}

	return {
		props: {
			departmentDB: stringifyDoc(department),
		},
	};
}
