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
import SessionModel from "../../../models/session";
import { stringifyDoc } from "../../../lib";

function Session({ sessionsDB }) {
	// console.table(departmentDB);
	const [newSession, setNewSession] = useState({
		title: "",
		year: "",
	});

	const [sessions, setSessions] = useState(sessionsDB);
	const [isLoading, setIsLoading] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
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
				"/api/session/create",
				newSession
			);

			if (response.data.ok) {
				setShowAlert({
					show: true,
					type: "success",
					msg: "Session created",
				});

				setSessions([...sessions, response.data.session]);
				setNewSession({
					title: "",
					year: "",
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
	async function deleteDepartment(id) {
		if (isDeleting) return;
		setIsDeleting(true);
		// setShowAlert({ show: true, type: "warning", msg: "submitting..." });

		try {
			const response = await axios.delete(`/api/department/${id}/delete`);

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
						<h2>Add Session</h2>
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
							controlId="formBasicEmail"
						>
							<Form.Label>Session title</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter session title..."
								value={newSession.title}
								name="title"
								onChange={(e) =>
									setNewSession({
										...newSession,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="college-abbr"
						>
							<Form.Label>Year of admission</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter year of adminssion..."
								name="year"
								// placeholder="YYYY"
								step="1"
								min="2000"
								max={new Date().getFullYear()}
								value={newSession.year}
								onChange={(e) =>
									setNewSession({
										...newSession,
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
			<hr />
			<Row>
				<Col>
					<Table responsive>
						<thead>
							<tr>
								<th>#</th>
								<th>Title</th>
								<th>Year</th>
								<th>Level</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{sessions.map((c, i) => (
								<tr key={c._id}>
									<td>{i + 1}</td>
									<td>{c.title}</td>
									<td>{c.year}</td>
									<td>{c.level}</td>
									<td>
										<Button
											disabled={isDeleting}
											onClick={() =>
												deleteDepartment(c._id)
											}
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

export default Session;

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

	const sessions = await SessionModel.find({});

	return {
		props: {
			sessionsDB: stringifyDoc(sessions),
		},
	};
}
