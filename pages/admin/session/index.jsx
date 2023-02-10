import { useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
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

	const [showModal, setShowModal] = useState(false);
	const [edit, setEdit] = useState({ title: "", id: "", level: "" });
	const [isEditing, setIsEditing] = useState(false);

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
	async function deleteSession(id) {
		if (isDeleting) return;
		setIsDeleting(true);
		// setShowAlert({ show: true, type: "warning", msg: "submitting..." });

		try {
			const response = await axios.delete(`/api/session/${id}/delete`);

			if (response.data.ok) {
				setShowAlert({
					show: true,
					type: "success",
					msg: "Department Removed",
				});

				const newSessionSet = sessions.filter((c) => c._id !== id);

				setSessions([...newSessionSet]);
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
	async function handleEdit(e) {
		e.preventDefault();
		if (isEditing) return;
		setIsEditing(true);

		// console.log({ edit });

		// setShowAlert({ show: true, type: "warning", msg: "submitting..." });

		try {
			const response = await axios.put(
				`/api/session/${edit.id}/edit`,
				edit
			);

			if (response.data.ok) {
				setShowAlert({
					show: true,
					type: "success",
					msg: "update successful",
				});

				const newSessionSet = sessions.map((c) => {
					if (c._id === edit.id) {
						c.level = edit.level;
					}

					return c;
				});

				setSessions([...newSessionSet]);
				setEdit({ title: "", id: "", level: "" });
				setShowModal(false);

				setIsEditing(false);
			} else {
				throw new Error(response.error);
			}

			// console.log(response);
			// setIsLoading(false);
		} catch (error) {
			setIsEditing(false);
			setShowAlert({
				show: true,
				type: "danger",
				msg: error.message,
			});
		}
	}

	function editSession(id, title, level) {
		setEdit({ id, title, level });
		setShowModal(true);
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
											className="me-2"
											variant="info"
											onClick={() =>
												editSession(
													c._id,
													c.title,
													c.level
												)
											}
										>
											<GrEdit />
										</Button>
										<Button
											disabled={isDeleting}
											onClick={() => deleteSession(c._id)}
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

			<Modal
				show={showModal}
				onHide={() => setShowModal(false)}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Update {edit.title} session Level
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form
						onSubmit={handleEdit}
						className="w-75 md:w-50 mx-auto"
					>
						<Form.Group>
							<Form.Select
								aria-label="Default select example"
								value={edit.level}
								onChange={(e) =>
									setEdit({
										...edit,
										level: e.target.value,
									})
								}
							>
								<option disabled>-- select level --</option>
								<option value="100">100</option>
								<option value="200">200</option>
								<option value="300">300</option>
								<option value="400">400</option>
								<option value="500">500</option>
							</Form.Select>
						</Form.Group>
						<Button
							disabled={isEditing}
							type="submit"
							variant="primary"
						>
							Save
						</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => setShowModal(false)}>Close</Button>
				</Modal.Footer>
			</Modal>
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
