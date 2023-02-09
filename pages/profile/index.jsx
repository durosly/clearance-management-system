import UserWrapper from "../../components/layout/user-wrapper";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
// import mongoose from "mongoose";
import ProfileModel from "../../models/profile";
import DepartmentModel from "../../models/department";
import CollegeModel from "../../models/college";
import SessionModel from "../../models/session";
import handleSession from "../../session/handle-session";
import { stringifyDoc } from "../../lib";

import getRegistrationLevel from "../../lib/get-registration-level";

function Profile({
	user,
	profile,
	department,
	userSession,
	college,
	registrationLevel,
}) {
	return (
		<UserWrapper>
			<Container className="mb-5">
				<Row>
					<Col>
						<Image
							src={`/images/profile/${user.passport}`}
							roundedCircle
							width={100}
							height={100}
						/>
					</Col>
					<Col sm={9}>
						<p>
							<b className="me-2">Full name:</b>
							{user.fullname}
						</p>
						<p>
							<b className="me-2">Level:</b>
							{userSession.level}
						</p>
						<p>
							<b className="me-2">Matric Number:</b>
							{(profile && profile?.matricnumber) || "undefined"}
						</p>
						<p>
							<b className="me-2">College:</b>
							{college.name}
						</p>
						<p>
							<b className="me-2">Department:</b>
							{department.name}
						</p>
						<p>
							<b className="me-2">Status:</b>
							<Badge bg="secondary">
								{(profile && profile?.status) || "Pending..."}
							</Badge>
						</p>
					</Col>
				</Row>
				<hr />
				<Row>
					<Col>
						<h2>Registraion status</h2>
					</Col>
				</Row>
				<Row className="row-gap-3">
					<Col
						xs={12}
						sm={4}
						md={3}
					>
						<Card border="warning">
							<Card.Body>
								<Card.Title>Profile completion</Card.Title>

								<Link
									className="btn btn-primary"
									href="/profile/complete"
								>
									Complete process
								</Link>
							</Card.Body>
						</Card>
					</Col>
					<Col
						xs={12}
						sm={4}
						md={3}
					>
						<Card
							border={`${
								registrationLevel.v === "payment" && "danger"
							}`}
						>
							<Card.Body>
								<Card.Title>Payments</Card.Title>
								<ProgressBar
									animated
									now={45}
								/>

								<Link href="/nice">Complete payment</Link>
							</Card.Body>
						</Card>
					</Col>
					<Col
						xs={12}
						sm={4}
						md={3}
					>
						<Card border="danger">
							<Card.Body>
								<Card.Title>Course registration</Card.Title>

								<Link href="/nice">Complete process</Link>
							</Card.Body>
						</Card>
					</Col>
					<Col
						xs={12}
						sm={4}
						md={3}
					>
						<Card border="danger">
							<Card.Body>
								<Card.Title>Security Form</Card.Title>

								<Link href="/nice">Fill out info</Link>
							</Card.Body>
						</Card>
					</Col>
				</Row>
				<hr />
				<Row>
					<Col>
						<h2>Clearance status</h2>
					</Col>
				</Row>
				<Row className="row-gap-3">
					<Col
						xs={12}
						sm={4}
						md={3}
					>
						<Card border="danger">
							<Card.Body>
								<Card.Title>Registra</Card.Title>
								<Card.Text>In progress</Card.Text>
								<Link href="/nice">Learn more...</Link>
							</Card.Body>
						</Card>
					</Col>
					<Col
						xs={12}
						sm={4}
						md={3}
					>
						<Card border="danger">
							<Card.Body>
								<Card.Title>Library</Card.Title>
								<Card.Text>In progress</Card.Text>
								<Link href="/nice">Learn more...</Link>
							</Card.Body>
						</Card>
					</Col>
					<Col
						xs={12}
						sm={4}
						md={3}
					>
						<Card border="danger">
							<Card.Body>
								<Card.Title>College</Card.Title>
								<Card.Text>In progress</Card.Text>
								<Link href="/nice">Learn more...</Link>
							</Card.Body>
						</Card>
					</Col>
					<Col
						xs={12}
						sm={4}
						md={3}
					>
						<Card border="danger">
							<Card.Body>
								<Card.Title>Department</Card.Title>
								<Card.Text>In progress</Card.Text>
								<Link href="/nice">Learn more...</Link>
							</Card.Body>
						</Card>
					</Col>
					<Col
						xs={12}
						sm={4}
						md={3}
					>
						<Card border="danger">
							<Card.Body>
								<Card.Title>Dean of student affairs</Card.Title>
								<Card.Text>In progress</Card.Text>
								<Link href="/nice">Learn more...</Link>
							</Card.Body>
						</Card>
					</Col>
					<Col
						xs={12}
						sm={4}
						md={3}
					>
						<Card border="danger">
							<Card.Body>
								<Card.Title>Medical</Card.Title>
								<Card.Text>In progress</Card.Text>
								<Link href="/nice">Learn more...</Link>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</UserWrapper>
	);
}

export default Profile;

export async function getServerSideProps(context) {
	const user = await handleSession({
		req: context.req,
		authLevel: ["student"],
	});

	if (!user) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	const profile = await ProfileModel.findOne({ _userId: user.id });
	const userSession = await SessionModel.findById(profile?._sessionId);
	const userDepartment = await DepartmentModel.findById(
		profile?._departmentId
	);
	const userCollege = await CollegeModel.findById(profile?._collegeId);
	const registrationLevel = await getRegistrationLevel({ user });

	return {
		props: {
			user: {
				fullname: `${user.firstname} ${user.lastname}`,
				passport: user?.passport || "default.jpg",
			},
			profile: stringifyDoc(profile) || null,
			college: {
				name: userCollege?.name || "undefined",
				abbr: userCollege?.abbr || "undefined",
			},
			department: {
				name: userDepartment?.name || "undefined",
				abbr: userDepartment?.abbr || "undefined",
			},
			userSession: {
				level: userSession?.level || "undefined",
			},
			registrationLevel,
		},
	};
}
