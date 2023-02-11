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
import CollegeModel from "../../../models/college";
import DepartmentModel from "../../../models/department";
import PaymentListModel from "../../../models/payment-list";
import { stringifyDoc } from "../../../lib";
import { getFullPaymentsData } from "../../../lib";

function Payments({ sessionsDB, departmentsDB, collegesDB, paymentsDB }) {
	// console.table(departmentDB);

	const [payment, setPayment] = useState({
		title: "",
		amount: "",
		college: "all",
		department: "all",
		session: "",
	});
	const [payments, setPayments] = useState(paymentsDB);

	const [showModal, setShowModal] = useState(false);
	const [edit, setEdit] = useState({
		title: "",
		id: "",
		session: "",
		department: "",
		college: "",
		amount: "",
	});
	const [isEditing, setIsEditing] = useState(false);

	const [sessions] = useState(sessionsDB);
	const [departments, setDepartments] = useState([]);
	const [colleges] = useState(collegesDB);

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
			const response = await axios.post("/api/payments/create", payment);

			if (response.data.ok) {
				setShowAlert({
					show: true,
					type: "success",
					msg: "Payment created",
				});

				setPayments([...payments, response.data.payment]);
				setPayment({
					title: "",
					amount: "",
					college: "all",
					department: "all",
					session: "",
				});
				// setNewDepartmentAbbr("");
				setIsLoading(false);
			} else {
				throw new Error(response.error);
			}

			// console.log(response);
			// setIsLoading(false);
		} catch (error) {
			console.log(error);
			let err = "";

			if (error?.response) {
				err = error.response.data.msg;
			} else {
				err = error.message;
			}
			setIsLoading(false);
			setShowAlert({
				show: true,
				type: "danger",
				msg: err,
			});
		}
	}
	async function deleteSession(id) {
		if (isDeleting) return;
		setIsDeleting(true);

		try {
			const response = await axios.delete(`/api/payments/${id}/delete`);

			if (response.data.ok) {
				setShowAlert({
					show: true,
					type: "success",
					msg: "Payment item Removed",
				});

				const newPaymentSet = payments.filter((c) => c._id !== id);

				setPayments([...newPaymentSet]);
				setIsDeleting(false);
			} else {
				throw new Error(response.error);
			}
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
				`/api/payments/${edit.id}/edit`,
				edit
			);

			if (response.data.ok) {
				setShowAlert({
					show: true,
					type: "success",
					msg: "update successful",
				});

				const newPaymentSet = payments.map((c) => {
					if (c._id === edit.id) {
						return response.data.payment;
					}

					return c;
				});

				setPayments([...newPaymentSet]);
				setEdit({
					title: "",
					id: "",
					session: "",
					department: "",
					college: "",
					amount: "",
				});
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

	function editPayment(id, title, session, department, college, amount) {
		setEdit({ id, title, session, department, college, amount });
		setShowModal(true);
	}

	function handleCollegeChange(e) {
		const newD = departmentsDB.filter(
			(d) => d._collegeId === e.target.value
		);
		setDepartments(newD);

		setPayment({
			...payment,
			[e.target.name]: e.target.value,
		});
	}

	return (
		<AdminLayout>
			<Row className="mt-5">
				<Col>
					<Form
						onSubmit={handleSubmit}
						className="w-75 md:w-50 mx-auto"
					>
						<h2>Add payment purpose</h2>
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
							<Form.Label>Purpose of payment</Form.Label>
							<Form.Control
								type="text"
								placeholder="School fees..."
								value={payment.title}
								name="title"
								onChange={(e) =>
									setPayment({
										...payment,
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
								placeholder="amount..."
								name="amount"
								value={payment.amount}
								onChange={(e) =>
									setPayment({
										...payment,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="academic-session"
						>
							<Form.Label>Academic session</Form.Label>
							<Form.Select
								aria-label="Default select example"
								value={payment.session}
								name="session"
								onChange={(e) =>
									setPayment({
										...payment,
										[e.target.name]: e.target.value,
									})
								}
							>
								<option
									value=""
									disabled
								>
									-- select session --
								</option>
								{sessions.map((c) => (
									<option
										key={c._id}
										value={c._id}
									>
										{c.title}
									</option>
								))}
							</Form.Select>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="college"
						>
							<Form.Label>College</Form.Label>
							<Form.Select
								aria-label="Default select example"
								value={payment.college}
								name="college"
								onChange={handleCollegeChange}
							>
								<option value="all">-- all --</option>
								{colleges.map((c) => (
									<option
										key={c._id}
										value={c._id}
									>
										{c.name}
									</option>
								))}
							</Form.Select>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="department"
						>
							<Form.Label>Department</Form.Label>
							<Form.Select
								aria-label="Default select example"
								value={payment.department}
								name="department"
								onChange={(e) =>
									setPayment({
										...payment,
										[e.target.name]: e.target.value,
									})
								}
							>
								<option value="all">-- all --</option>
								{departments.map((c) => (
									<option
										key={c._id}
										value={c._id}
									>
										{c.name}
									</option>
								))}
							</Form.Select>
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
								<th>Amount</th>
								<th>Session</th>
								<th>College</th>
								<th>Department</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{payments.map((c, i) => (
								<tr key={c._id}>
									<td>{i + 1}</td>
									<td>{c.title}</td>
									<td>{c.amount}</td>
									<td>{c.session}</td>
									<td>{c.college}</td>
									<td>{c.department}</td>
									<td>
										<Button
											className="me-2"
											variant="info"
											onClick={() =>
												editPayment(
													c._id,
													c.title,
													c.session,
													c.department,
													c.college,
													c.amount
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
						Update {edit.title} for {edit.session}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form
						onSubmit={handleEdit}
						className="w-75 md:w-50 mx-auto"
					>
						<p>College: {edit.college}</p>
						<p>Department: {edit.department}</p>
						<Form.Group
							className="mb-3"
							controlId="college-abbr"
						>
							<Form.Label>Payment Fee</Form.Label>
							<Form.Control
								type="number"
								placeholder="amount..."
								name="amount"
								inputMode="numeric"
								value={edit.amount}
								onChange={(e) =>
									setEdit({
										...edit,
										amount: e.target.value,
									})
								}
							/>
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

export default Payments;

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
	const colleges = await CollegeModel.find({});
	const departments = await DepartmentModel.find({});
	const paymentsQuery = await PaymentListModel.find({});

	const payments = await getFullPaymentsData(paymentsQuery);

	return {
		props: {
			sessionsDB: stringifyDoc(sessions),
			collegesDB: stringifyDoc(colleges),
			departmentsDB: stringifyDoc(departments),
			paymentsDB: stringifyDoc(payments),
		},
	};
}
