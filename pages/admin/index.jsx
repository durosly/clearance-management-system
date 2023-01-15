import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AdminLogin() {
	return (
		<div className="min-vh-100 d-flex justify-content-center align-items-center">
			<Container>
				<Form className="w-75 md:w-50 mx-auto">
					<h2>Admin Login</h2>
					<Form.Group
						className="mb-3"
						controlId="formBasicEmail"
					>
						<Form.Label>Username</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter username..."
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
