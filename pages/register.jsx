import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

function Register() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [showAlert, setShowAlert] = useState({
		show: false,
		type: "success",
		msg: "nice",
	});
	const [profile, setProfile] = useState({
		firstname: "",
		middlename: "",
		lastname: "",
		email: "",
		password: "",
	});

	async function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);

		// setShowAlert({ show: true, type: "warning", msg: "submitting..." });

		try {
			await axios.post("/api/user/signup", profile);
			setShowAlert({
				show: true,
				type: "success",
				msg: "signup successfull. Login to complete registration",
			});

			setTimeout(() => router.push("/"), 10000);

			// console.log(response);
			// setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			setShowAlert({
				show: true,
				type: "danger",
				msg: error.response.data.msg,
			});
		}
	}

	return (
		<Container>
			<Alert
				className="mt-5"
				show={showAlert.show}
				onClose={() => setShowAlert({ ...showAlert, show: false })}
				variant={showAlert.type}
				dismissible
			>
				{showAlert.msg}
			</Alert>
			<form
				onSubmit={handleSubmit}
				className="register-one-form"
			>
				<img
					className="mb-4"
					src="/images/logo-fupre.png"
					alt=""
					width={72}
					height={57}
				/>
				<h1 className="h3 mb-3 fw-normal">Please sign up</h1>
				<div className="form-floating">
					<input
						type="text"
						className="form-control"
						id="firstname"
						placeholder="John Doe"
						name="firstname"
						value={profile.firstname}
						onChange={(e) =>
							setProfile({
								...profile,
								[e.target.name]: e.target.value,
							})
						}
					/>
					<label htmlFor="firstname">First name</label>
				</div>
				<div className="form-floating">
					<input
						type="text"
						className="form-control"
						id="middlename"
						placeholder="John Doe"
						name="middlename"
						value={profile.middlename}
						onChange={(e) =>
							setProfile({
								...profile,
								[e.target.name]: e.target.value,
							})
						}
					/>
					<label htmlFor="middlename">Middle name(optional)</label>
				</div>
				<div className="form-floating">
					<input
						type="text"
						className="form-control"
						id="lastname"
						placeholder="John Doe"
						name="lastname"
						value={profile.lastname}
						onChange={(e) =>
							setProfile({
								...profile,
								[e.target.name]: e.target.value,
							})
						}
					/>
					<label htmlFor="lastname">Last name</label>
				</div>
				<div className="form-floating">
					<input
						type="email"
						className="form-control"
						id="email"
						placeholder="name@example.com"
						name="email"
						value={profile.email}
						onChange={(e) =>
							setProfile({
								...profile,
								[e.target.name]: e.target.value,
							})
						}
					/>
					<label htmlFor="email">Email address</label>
				</div>
				<div className="form-floating">
					<input
						type="password"
						className="form-control"
						id="floatingPassword"
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
					<label htmlFor="floatingPassword">Password</label>
				</div>

				<button
					className="w-100 btn btn-lg btn-primary"
					type="submit"
					disabled={isLoading}
				>
					{isLoading ? (
						<Spinner
							animation="border"
							role="status"
						>
							<span className="visually-hidden">Loading...</span>
						</Spinner>
					) : (
						"Register"
					)}
				</button>
				<p className="mt-5 mb-3 text-muted">© 2017–2022</p>
			</form>
		</Container>
	);
}

export default Register;
