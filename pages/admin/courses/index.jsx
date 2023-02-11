import { useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AdminLayout from "../../../components/admin/layout/admin-layout";
import handleSession from "../../../session/handle-session";
import { ADMIN_LEVEL } from "../../../auth_constants/auth";
import CollegeModel from "../../../models/college";
import DepartmentModel from "../../../models/department";
import { stringifyDoc } from "../../../lib";

function Courses({ departmentDB }) {
	// console.table(departmentDB);
	const [newCourse, setNewCourse] = useState({
		title: "",
		code: "",
		unit: "",
		semester: "",
		department: "",
		level: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [showAlert, setShowAlert] = useState({
		show: false,
		type: "",
		msg: "",
	});

	async function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await axios.post("/api/courses/create", newCourse);

			if (response.data.ok) {
				setShowAlert({
					show: true,
					type: "success",
					msg: "Course created",
				});

				setNewCourse({
					title: "",
					code: "",
					unit: "",
					semester: "",
					department: "",
					level: "",
				});
				setIsLoading(false);
			} else {
				throw new Error(response.error);
			}
		} catch (error) {
			setIsLoading(false);
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
							controlId="course-title"
						>
							<Form.Label>Course title</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter course title..."
								name="title"
								value={newCourse.title}
								onChange={(e) =>
									setNewCourse({
										...newCourse,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="course-code"
						>
							<Form.Label>Course code</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter course code..."
								name="code"
								inputMode="numeric"
								value={newCourse.code}
								onChange={(e) =>
									setNewCourse({
										...newCourse,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="course-unit"
						>
							<Form.Label>Course unit</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter course unit..."
								name="unit"
								inputMode="numeric"
								value={newCourse.unit}
								onChange={(e) =>
									setNewCourse({
										...newCourse,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="course-semester"
						>
							<Form.Label>Course Semester</Form.Label>
							<Form.Select
								aria-label="Default select example"
								value={newCourse.semester}
								name="semester"
								onChange={(e) =>
									setNewCourse({
										...newCourse,
										[e.target.name]: e.target.value,
									})
								}
							>
								<option
									value=""
									disabled
								>
									-- select semester --
								</option>
								<option value="first">First semester</option>
								<option value="second">Second semester</option>
							</Form.Select>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="course-department"
						>
							<Form.Label>Department</Form.Label>
							<Form.Select
								aria-label="Default select example"
								value={newCourse.department}
								name="department"
								onChange={(e) =>
									setNewCourse({
										...newCourse,
										[e.target.name]: e.target.value,
									})
								}
							>
								<option
									value=""
									disabled
								>
									-- select department --
								</option>
								{departmentDB.map((d) => (
									<option value={d._id}>{d.name}</option>
								))}
							</Form.Select>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="college-level"
						>
							<Form.Label>Level</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter course level..."
								name="level"
								value={newCourse.level}
								onChange={(e) =>
									setNewCourse({
										...newCourse,
										[e.target.name]: e.target.value,
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
		</AdminLayout>
	);
}

export default Courses;

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
