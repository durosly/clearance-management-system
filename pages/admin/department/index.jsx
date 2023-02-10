import { useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { FaRegTrashAlt } from "react-icons/fa";
import AdminLayout from "../../../components/admin/layout/admin-layout";
import handleSession from "../../../session/handle-session";
import { ADMIN_LEVEL } from "../../../auth_constants/auth";
import CollegeModel from "../../../models/college";
import DepartmentModel from "../../../models/department";
import { stringifyDoc } from "../../../lib";

function Department({ departmentDB, collegesDB }) {
	// console.table(departmentDB);
	const [newDepartment, setNewDepartment] = useState({
		name: "",
		college: "",
		abbr: "",
		duration: undefined,
	});
	const [isLoading, setIsLoading] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [colleges] = useState(collegesDB);
	const [departments, setDepartments] = useState(departmentDB);
	const [showAlert, setShowAlert] = useState({
		show: false,
		type: "",
		msg: "",
	});

	async function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);
		// setShowAlert({ show: true, type: "warning", msg: "submitting..." });

		try {
			const response = await axios.post(
				"/api/department/create",
				newDepartment
			);

			if (response.data.ok) {
				setShowAlert({
					show: true,
					type: "success",
					msg: "Department created",
				});

				setDepartments([...departments, response.data.department]);
				setNewDepartment({
					name: "",
					college: "",
					abbr: "",
					duration: "",
				});
				// setNewDepartmentAbbr("");
				setIsLoading(false);
			} else {
				throw new Error(response.error);
			}

			// console.log(response);
			// setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			setShowAlert({
				show: true,
				type: "danger",
				msg: error.message,
			});
		}
	}
	async function deleteCollege(id) {
		if (isDeleting) return;
		setIsDeleting(true);
		// setShowAlert({ show: true, type: "warning", msg: "submitting..." });

		try {
			const response = await axios.delete(`/api/college/${id}/delete`);

			if (response.data.ok) {
				setShowAlert({
					show: true,
					type: "success",
					msg: "Department Removed",
				});

				const newDepartmentSet = departments.filter(
					(c) => c._id !== id
				);

				setDepartments([...newDepartmentSet]);
				// setNewDepartment("");
				// setNewDepartmentAbbr("");
				setIsDeleting(false);
			} else {
				throw new Error(response.error);
			}

			// console.log(response);
			// setIsLoading(false);
		} catch (error) {
			setIsDeleting(false);
			setShowAlert({
				show: true,
				type: "danger",
				msg: error.message,
			});
		}
	}

	return (
		<AdminLayout>
			<Row className="mt-5">
				<Col>
					<Form
						onSubmit={handleSubmit}
						className="w-75 md:w-50 mx-auto"
					>
						<h2>Add Department</h2>
						<Alert
							// className="mt-5"
							show={showAlert.show}
							onClose={() =>
								setShowAlert({ ...showAlert, show: false })
							}
							variant={showAlert.type}
							dismissible
						>
							{showAlert.msg}
						</Alert>
						<Form.Group
							className="mb-3"
							controlId="department-college"
						>
							<Form.Label>Department College</Form.Label>
							<Form.Select
								aria-label="Default select example"
								value={newDepartment.college}
								name="college"
								onChange={(e) =>
									setNewDepartment({
										...newDepartment,
										[e.target.name]: e.target.value,
									})
								}
							>
								<option
									value=""
									disabled
								>
									-- select college --
								</option>
								{colleges.map((c) => (
									<option
										value={c._id}
										key={c._id}
									>
										{c.name}
									</option>
								))}
							</Form.Select>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="formBasicEmail"
						>
							<Form.Label>Department Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter department name..."
								name="name"
								value={newDepartment.name}
								onChange={(e) =>
									setNewDepartment({
										...newDepartment,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="college-abbr"
						>
							<Form.Label>Department Abbreviation</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter college abbr..."
								name="abbr"
								value={newDepartment.abbr}
								onChange={(e) =>
									setNewDepartment({
										...newDepartment,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="department-duration"
						>
							<Form.Label>Department duration (years)</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter department duration..."
								name="duration"
								value={newDepartment.duration}
								onChange={(e) =>
									setNewDepartment({
										...newDepartment,
										[e.target.name]: e.target.valueAsNumber,
									})
								}
							/>
						</Form.Group>

						<Button
							variant="primary"
							type="submit"
							disabled={isLoading}
						>
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
			<hr />
			<Row>
				<Col>
					<Table responsive>
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Abbr</th>
								<th>College</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{departments.map((c, i) => (
								<tr key={c._id}>
									<td>{i + 1}</td>
									<td>{c.name}</td>
									<td>{c.abbr}</td>
									<td>{c.college_name}</td>
									<td>
										<Button
											disabled={isDeleting}
											onClick={() => deleteCollege(c._id)}
											variant="danger"
										>
											<FaRegTrashAlt />
										</Button>
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

	const colleges = await CollegeModel.find({});
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
			collegesDB: stringifyDoc(colleges),
			departmentDB: stringifyDoc(department),
		},
	};
}
