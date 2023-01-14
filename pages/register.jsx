import React from "react";

function Register() {
	return (
		<form className="register-one-form">
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
					id="floatingInput"
					placeholder="John Doe"
				/>
				<label htmlFor="floatingInput">First name</label>
			</div>
			<div className="form-floating">
				<input
					type="text"
					className="form-control"
					id="floatingInput"
					placeholder="John Doe"
				/>
				<label htmlFor="floatingInput">Middle name(optional)</label>
			</div>
			<div className="form-floating">
				<input
					type="text"
					className="form-control"
					id="floatingInput"
					placeholder="John Doe"
				/>
				<label htmlFor="floatingInput">Last name</label>
			</div>
			<div className="form-floating">
				<input
					type="email"
					className="form-control"
					id="floatingInput"
					placeholder="name@example.com"
				/>
				<label htmlFor="floatingInput">Email address</label>
			</div>
			<div className="form-floating">
				<input
					type="password"
					className="form-control"
					id="floatingPassword"
					placeholder="Password"
				/>
				<label htmlFor="floatingPassword">Password</label>
			</div>

			<button
				className="w-100 btn btn-lg btn-primary"
				type="submit"
			>
				Register
			</button>
			<p className="mt-5 mb-3 text-muted">© 2017–2022</p>
		</form>
	);
}

export default Register;
