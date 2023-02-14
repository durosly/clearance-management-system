import { useState } from "react";
import handleSession from "../../../session/handle-session";
import { ADMIN_LEVEL } from "../../../auth_constants/auth";
// import ProfileModel from "../../../models/profile";
import DepartmentModel from "../../../models/department";
import CollegeModel from "../../../models/college";
import SessionModel from "../../../models/session";
import axios from "axios";
import AdminLayout from "../../../components/admin/layout/admin-layout";
import { Button, Col, FloatingLabel, Form, Row, Table } from "react-bootstrap";
import { stringifyDoc } from "../../../lib";
import { toast } from "react-toastify";
import Link from "next/link";

function Exist({ departments, colleges, sessions }) {
	const [dept, setDept] = useState("");
	const [coll, setColl] = useState("");
	const [session, setSession] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [profiles, setProfiles] = useState([]);

	async function loadStudents(e) {
		e.preventDefault();

		if (isLoading) return;
		setIsLoading(true);
		try {
			const response = await axios(
				`/api/profile/get-all?dept=${dept}&coll=${coll}&session=${session}`
			);

			if (response.data.ok) {
				setProfiles(response.data.profiles);
				setIsLoading(false);
			} else {
				throw new Error(response.data.msg);
			}
		} catch (error) {
			setIsLoading(false);
			toast.error(error.message);
		}
	}
	return (
		<AdminLayout>
			<Row className="mt-5">
				<Col>
					<h1>All Students</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<Form onSubmit={loadStudents}>
						<FloatingLabel
							controlId="floatingSelect"
							label="Select college"
						>
							<Form.Select
								value={coll}
								onChange={(e) => setColl(e.target.value)}
								aria-label="Floating label select example"
							>
								<option value="">-- college --</option>
								{colleges.map((c) => (
									<option value={c._id}>{c.name}</option>
								))}
							</Form.Select>
							<Form.Select
								value={dept}
								onChange={(e) => setDept(e.target.value)}
								aria-label="Floating label select example"
							>
								<option value="">-- department --</option>
								{departments.map((c) => (
									<option value={c._id}>{c.name}</option>
								))}
							</Form.Select>
							<Form.Select
								value={session}
								onChange={(e) => setSession(e.target.value)}
								aria-label="Floating label select example"
							>
								<option value="">-- session --</option>
								{sessions.map((c) => (
									<option value={c._id}>{c.title}</option>
								))}
							</Form.Select>
						</FloatingLabel>
						<Button
							type="submit"
							variant="primary"
							disabled={isLoading}
						>
							{isLoading ? "Loading..." : "Search data"}
						</Button>
					</Form>
				</Col>
			</Row>

			<Row className="mt-5">
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

export default Exist;

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
	const collegeDB = await CollegeModel.find({});
	const sessionDB = await SessionModel.find({});

	// const profilesDB = await ProfileModel.find({
	// 	// $gte: { clearanceLevel: 0 },
	// 	clearanceLevel: { $gte: 0, $lte: 2 },
	// 	// $lte: { clearanceLevel: 2 },
	// }).sort("-clearanceLevel");

	return {
		props: {
			departments: stringifyDoc(departmentDB),
			colleges: stringifyDoc(collegeDB),
			sessions: stringifyDoc(sessionDB),
			// profiles: stringifyDoc(profilesDB),
		},
	};
}
