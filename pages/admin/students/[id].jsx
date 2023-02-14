import ProfileModel from "../../../models/profile";
import { stringifyDoc } from "../../../lib";
import { ADMIN_LEVEL } from "../../../auth_constants/auth";
import handleSession from "../../../session/handle-session";
import AdminLayout from "../../../components/admin/layout/admin-layout";
import UserModel from "../../../models/user";
import SessionModel from "../../../models/session";
import DepartmentModel from "../../../models/department";
import CollegeModel from "../../../models/college";
import {
	BIRTH_CERTIFICATE_FOLDER,
	STATE_OF_ORIGIN_FOLDER,
} from "../../../constants";
import { Badge, Button, Col, FloatingLabel, Image, Row } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import Form from "react-bootstrap/Form";

function StudentProfile({
	user,
	profile,
	department,
	userSession,
	college,
	departments,
	colleges,
}) {
	return (
		<AdminLayout>
			<Row>
				<Col>Student profile</Col>
			</Row>
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
						<b className="me-2">Session:</b>
						{userSession?.title || "undefined"}
					</p>
					<p>
						<b className="me-2">Level:</b>
						{user?.level || "undefined"}
					</p>
					<p>
						<b className="me-2">Jamb Reg Number:</b>
						{(profile && profile?.jambreg) || "undefined"}
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
					<Form>
						<Form.Select>
							<option value="pending">Pending</option>
							<option value="in-school">In-school</option>
							<option value="out-of-school">Out-of-school</option>
							<option value="graduated">Graduated</option>
						</Form.Select>
						<Button
							type="submit"
							variant="info"
						>
							Update
						</Button>
					</Form>
					<p>
						<b className="me-2">Date of birth:</b>
						{(profile && profile?.dob) || "undefined"}
						{profile && profile?.birthcertificate && (
							<Link
								className="ms-2"
								href={`/${BIRTH_CERTIFICATE_FOLDER}/${profile.birthcertificate}`}
							>
								<FaEye
									width={16}
									height={16}
									fill="currentColor"
								/>
							</Link>
						)}
					</p>
					<p>
						<b className="me-2">State of origin:</b>
						{(profile && profile?.stateoforigin) || "undefined"}
						{profile && profile?.soproof && (
							<Link
								className="ms-2"
								href={`/${STATE_OF_ORIGIN_FOLDER}/${profile.soproof}`}
							>
								<FaEye
									width={16}
									height={16}
									fill="currentColor"
								/>
							</Link>
						)}
					</p>
					<p>
						<b className="me-2">Local government of origin:</b>
						{(profile && profile?.localoforigin) || "undefined"}
					</p>
					<p>
						<b className="me-2">State of residence:</b>
						{(profile && profile?.stateofresidence) || "undefined"}
					</p>
					<p>
						<b className="me-2">Local government of residence:</b>
						{(profile && profile?.localofresidence) || "undefined"}
					</p>
					<p>
						<b className="me-2">Address:</b>
						{(profile && profile?.address) || "undefined"}
					</p>
					<p>
						<b className="me-2">College:</b>
						{(college && college?.name) || "undefined"}
					</p>
					<p>
						<b className="me-2">Clearance Level:</b>
						{(college && college?.localofresidence) || "undefined"}
					</p>
				</Col>
			</Row>

			<hr />
			<Row>
				<Col className="my-4">
					<Form>
						<FloatingLabel
							controlId="floatingSelect"
							label="Select college"
						>
							<Form.Select aria-label="Floating label select example">
								<option>-- college --</option>
								{colleges.map((c) => (
									<option value={c._id}>{c.name}</option>
								))}
							</Form.Select>
							<Form.Select aria-label="Floating label select example">
								<option>-- department --</option>
								{departments.map((c) => (
									<option value={c._id}>{c.name}</option>
								))}
							</Form.Select>
						</FloatingLabel>
						<Button
							type="submit"
							variant="primary"
						>
							Update profile
						</Button>
					</Form>
				</Col>
			</Row>
		</AdminLayout>
	);
}

export default StudentProfile;

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

	const id = context.params.id;

	// console.log({ id });
	const profile = await ProfileModel.findById(id);
	const userDB = await UserModel.findById(profile._userId);
	const userSession = await SessionModel.findById(profile?._sessionId);
	const userDepartment = await DepartmentModel.findById(
		profile?._departmentId
	);
	const userCollege = await CollegeModel.findById(profile?._collegeId);
	// const registrationLevel = await getRegistrationLevel({ user });
	const colleges = await CollegeModel.find({});
	const departmentDB = await DepartmentModel.find({});

	return {
		props: {
			user: {
				fullname: `${userDB.firstname} ${userDB.middlename} ${userDB.lastname}`,
				passport: userDB?.passport || "default.jpg",
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
				title: userSession?.title || null,
			},
			colleges: stringifyDoc(colleges),
			departments: stringifyDoc(departmentDB),
		},
	};
}
