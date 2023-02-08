import { useState } from "react";
import { useRouter } from "next/router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

function PersonalDetails({ user }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [errorStatus, setErrorStatus] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [personalDetails, setPersonalDetails] = useState({
		fullname: `${user.firstname} ${user.lastname}`,
		email: user.email,
		jambreg: "",
		dob: "",
		soo: "",
		lgo: "",
		sor: "",
		lgr: "",
		address: "",
	});
	const { fullname, email, jambreg, dob, soo, loo, sor, lor, address } =
		personalDetails;

	async function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await axios.post("/api/profile/complete", {
				...personalDetails,
			});
			if (response.data.ok) {
				setSuccess(true);
				setErrorStatus(false);

				setTimeout(() => {
					router.reload();
				}, 5000);
			} else {
				throw new Error(response.data.msg);
			}
		} catch (error) {
			let err = "";

			if (error?.response) {
				err = error.response.msg;
			} else {
				err = error.message;
			}

			setErrorStatus(true);
			setErrorMsg(err);
			setIsLoading(false);
		}
	}
	return (
		<Row>
			<Col>
				<Form
					onSubmit={handleSubmit}
					action="/complete-profile"
				>
					<Form.Group
						className="mb-3"
						controlId="fullname"
					>
						<Form.Label>Full name</Form.Label>
						<Form.Control
							type="text"
							value={fullname}
							disabled
						/>
					</Form.Group>
					<Form.Group
						className="mb-3"
						controlId="formBasicEmail"
					>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							disabled
						/>
					</Form.Group>
					<Form.Group
						className="mb-3"
						controlId="jamb"
					>
						<Form.Label>Jamb Reg. Number</Form.Label>
						<Form.Control
							type="text"
							placeholder="e.g 123456BC"
							name="jambreg"
							value={jambreg}
							onChange={(e) =>
								setPersonalDetails({
									...personalDetails,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</Form.Group>
					<Form.Group
						className="mb-3"
						controlId="dob"
					>
						<Form.Label>Date of birth</Form.Label>
						<Form.Control
							type="date"
							min="1990-01-01"
							max="2013-12-31"
							name="dob"
							value={dob}
							onChange={(e) =>
								setPersonalDetails({
									...personalDetails,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</Form.Group>
					<Form.Group
						className="mb-3"
						controlId="state-origin"
					>
						<Form.Label>State of origin</Form.Label>
						<Form.Control
							type="text"
							placeholder="Delta..."
							name="soo"
							value={soo}
							onChange={(e) =>
								setPersonalDetails({
									...personalDetails,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</Form.Group>
					<Form.Group
						className="mb-3"
						controlId="local-origin"
					>
						<Form.Label>Local government of origin</Form.Label>
						<Form.Control
							type="text"
							placeholder="Uvwie..."
							name="loo"
							value={loo}
							onChange={(e) =>
								setPersonalDetails({
									...personalDetails,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</Form.Group>
					<hr />
					<Form.Group
						className="mb-3"
						controlId="state-residence"
					>
						<Form.Label>State of Residence</Form.Label>
						<Form.Control
							type="text"
							placeholder="Abuja..."
							name="sor"
							value={sor}
							onChange={(e) =>
								setPersonalDetails({
									...personalDetails,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</Form.Group>
					<Form.Group
						className="mb-3"
						controlId="local-residence"
					>
						<Form.Label>Local government of residence</Form.Label>
						<Form.Control
							type="text"
							placeholder="Akure..."
							name="lor"
							value={lor}
							onChange={(e) =>
								setPersonalDetails({
									...personalDetails,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</Form.Group>
					<Form.Group
						className="mb-3"
						controlId="address"
					>
						<Form.Label>Address</Form.Label>
						<Form.Control
							type="text"
							placeholder="11 nice street..."
							name="address"
							value={address}
							onChange={(e) =>
								setPersonalDetails({
									...personalDetails,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</Form.Group>
					<p>Check record before submitting</p>
					<Button
						variant="primary"
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? "Loading..." : "Submit"}
					</Button>

					{errorStatus && <Alert variant="danger">{errorMsg}</Alert>}
					{success && <Alert variant="success">Success</Alert>}
				</Form>
			</Col>
		</Row>
	);
}

export default PersonalDetails;
