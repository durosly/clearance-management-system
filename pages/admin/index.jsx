import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import handleSession from "../../session/handle-session";

function AdminLogin() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [showAlert, setShowAlert] = useState({
		show: false,
		type: "success",
		msg: "nice",
	});
	const [profile, setProfile] = useState({ email: "", password: "" });

	async function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);

		const { email, password } = profile;

		// setShowAlert({ show: true, type: "warning", msg: "submitting..." });

		try {
			// await axios.post("/api/user/signup", profile);
			const response = await signIn("credentials", {
				redirect: false,
				password,
				email,
			});

			if (response.ok) {
				setShowAlert({
					show: true,
					type: "success",
					msg: "Login successfull",
				});

				router.push("/admin/dashboard");
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
		<div className="min-vh-100 d-flex justify-content-center align-items-center">
			<Container>
				<Form
					onSubmit={handleSubmit}
					className="w-75 md:w-50 mx-auto"
				>
					<h2>Admin Login</h2>
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
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email address..."
							name="email"
							value={profile.email}
							onChange={(e) =>
								setProfile({
									...profile,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</Form.Group>

					<Form.Group
						className="mb-3"
						controlId="formBasicPassword"
					>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							name="password"
							value={profile.password}
							onChange={(e) =>
								setProfile({
									...profile,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</Form.Group>

					<Button
						variant="primary"
						type="submit"
					>
						Submit
					</Button>
				</Form>
			</Container>
		</div>
	);
}

export default AdminLogin;

export async function getServerSideProps(context) {
	const user = await handleSession({
		req: context.req,
		authLevel: ["admin"],
	});

	if (user) {
		return {
			redirect: {
				destination: "/admin/dashboard",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}
