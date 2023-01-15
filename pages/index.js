import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { signIn } from "next-auth/react";

function Home() {
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

				router.push("/profile");
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
		<>
			<div className="container col-xl-10 col-xxl-8 px-4 py-5">
				<div className="row">
					<Alert
						className="mt-5"
						show={showAlert.show}
						onClose={() =>
							setShowAlert({ ...showAlert, show: false })
						}
						variant={showAlert.type}
						dismissible
					>
						{showAlert.msg}
					</Alert>
				</div>
				<div className="row align-items-center g-lg-5 py-5">
					<div className="col-lg-7 text-center text-lg-start">
						<h1 className="display-4 fw-bold lh-1 mb-3">
							Vertically centered hero sign-up form
						</h1>
						<p className="col-lg-10 fs-4">
							Below is an example form built entirely with
							Bootstrap’s form controls. Each required form group
							has a validation state that can be triggered by
							attempting to submit the form without completing it.
						</p>
					</div>
					<div className="col-md-10 mx-auto col-lg-5">
						<form
							onSubmit={handleSubmit}
							className="p-4 p-md-5 border rounded-3 bg-light"
						>
							<div className="form-floating mb-3">
								<input
									type="email"
									className="form-control"
									id="floatingInput"
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
								<label htmlFor="floatingInput">
									Email address
								</label>
							</div>
							<div className="form-floating mb-3">
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
								<label htmlFor="floatingPassword">
									Password
								</label>
							</div>
							<div className="mb-3">
								Not a user? <Link href="/register">Signup</Link>
							</div>
							<button
								className="w-100 btn btn-lg btn-primary"
								type="submit"
							>
								Login
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
