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
import { stringifyDoc } from "../../../lib";

function College({ collegesDB }) {
	const [newCollege, setNewCollege] = useState("");
	const [newCollegeAbbr, setNewCollegeAbbr] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [colleges, setColleges] = useState(collegesDB);
	const [showAlert, setShowAlert] = useState({
		show: false,
		type: "success",
		msg: "nice",
	});

	async function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);
		// setShowAlert({ show: true, type: "warning", msg: "submitting..." });

		try {
			const response = await axios.post("/api/college/create", {
				name: newCollege,
				abbr: newCollegeAbbr,
			});

			if (response.data.ok) {
				setShowAlert({
					show: true,
					type: "success",
					msg: "College created",
				});

				setColleges([...colleges, response.data.college]);

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

	return (
		<AdminLayout>
			<Row className="mt-5">
				<Col>
					<Form
						onSubmit={handleSubmit}
						className="w-75 md:w-50 mx-auto"
					>
						<h2>Add College</h2>
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
							<Form.Label>College Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter college name..."
								name="name"
								value={newCollege}
								onChange={(e) => setNewCollege(e.target.value)}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="college-abbr"
						>
							<Form.Label>College Abbreviation</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter college abbr..."
								name="abbr"
								value={newCollegeAbbr}
								onChange={(e) =>
									setNewCollegeAbbr(e.target.value)
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
								<th>Number of departments</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{colleges.map((c, i) => (
								<tr key={c._id}>
									<td>{i + 1}</td>
									<td>{c.name}</td>
									<td>{c.abbr}</td>
									<td>{10}</td>
									<td>
										<Button variant="danger">
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

export default College;

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

	return {
		props: {
			collegesDB: stringifyDoc(colleges),
		},
	};
}
