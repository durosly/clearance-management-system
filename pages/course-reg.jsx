import { useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import UserWrapper from "../components/layout/user-wrapper";
import { Button } from "react-bootstrap";
import handleSession from "../session/handle-session";
import ProfileModel from "../models/profile";
import CourseModel from "../models/course";
import SessionModel from "../models/session";
import DepartmentModel from "../models/department";
import { STUDENT_LEVEL } from "../auth_constants/auth";
import { toast } from "react-toastify";
// import { stringifyDoc } from "../lib";

function CourseRegistration({ firstSemester, secondSemester }) {
	const [registerCourse, setRegisterCourse] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	function handleChange(e) {
		const value = e.target.value;
		if (registerCourse.includes(value)) {
			const newCourses = registerCourse.filter((c) => c !== value);

			setRegisterCourse(newCourses);
		} else {
			setRegisterCourse([...registerCourse, value]);
		}
	}

	async function register() {
		if (isLoading) return;
		setIsLoading(true);
		try {
			const response = await axios.post("/api/courses/register", {
				registerCourse,
			});

			if (response.data.ok) {
				toast.success("Courses registered successfully");
				setIsLoading(false);
			} else {
				throw new Error(response.data.msg);
			}
		} catch (error) {
			let errorMsg = "";

			if (error?.response) {
				errorMsg = error.response.data.msg;
			} else {
				errorMsg = error.message;
			}

			setIsLoading(false);
			toast.error(errorMsg);
		}
	}
	return (
		<UserWrapper>
			<Container>
				<Row>
					<Col>
						<h2>Course Registration</h2>
					</Col>
				</Row>
				<Row>
					<Col>
						<h4>First semester</h4>
					</Col>
				</Row>
				<Row>
					<Col>
						<Table
							striped
							responsive
						>
							<thead>
								<tr>
									<th>Code</th>
									<th>Title</th>
									<th>Unit</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{firstSemester.map((course) => (
									<tr key={course._id}>
										<td>
											{course.department_code}
											{course.code}
										</td>
										<td className="text-capitalize">
											{course.title}
										</td>
										<td>{course.unit}</td>
										<td>
											<Form.Check
												value={course._id}
												type="checkbox"
												checked={registerCourse.includes(
													course._id
												)}
												onChange={handleChange}
												disabled={isLoading}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Col>
				</Row>
				<Row>
					<Col>
						<h4>Second semester</h4>
					</Col>
				</Row>
				<Row>
					<Col>
						<Table
							striped
							responsive
						>
							<thead>
								<tr>
									<th>Code</th>
									<th>Title</th>
									<th>Unit</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{secondSemester.map((course) => (
									<tr key={course._id}>
										<td>
											{course.department_code}
											{course.code}
										</td>
										<td className="text-capitalize">
											{course.title}
										</td>
										<td>{course.unit}</td>
										<td>
											<Form.Check
												value={course._id}
												type="checkbox"
												checked={registerCourse.includes(
													course._id
												)}
												onChange={handleChange}
												disabled={isLoading}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Col>
				</Row>
				<Row>
					<Col>
						<Button
							onClick={register}
							variant="primary"
							disabled={isLoading}
						>
							Register
						</Button>
					</Col>
				</Row>
			</Container>
		</UserWrapper>
	);
}

export default CourseRegistration;

export async function getServerSideProps(context) {
	const user = await handleSession({
		req: context.req,
		authLevel: [STUDENT_LEVEL],
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
	const session = await SessionModel.findById(profile._sessionId);
	const firstCourses = await CourseModel.find({
		_departmentId: profile._departmentId,
		semester: "first",
		level: session.level,
	});

	const firstSemester = [];

	for (const course of firstCourses) {
		const department = await DepartmentModel.findById(course._departmentId);

		firstSemester.push({
			_id: course.id,
			unit: course.unit,
			code: course.code,
			title: course.title,
			department_code: department.abbr,
		});
	}
	const secondCourses = await CourseModel.find({
		_departmentId: profile._departmentId,
		semester: "second",
		level: session.level,
	});

	const secondSemester = [];

	for (const course of secondCourses) {
		const department = await DepartmentModel.findById(course._departmentId);

		secondSemester.push({
			_id: course.id,
			unit: course.unit,
			code: course.code,
			title: course.title,
			department_code: department.abbr,
		});
	}

	console.log({ firstSemester, secondSemester });

	return {
		props: {
			// firstSemester: stringifyDoc(firstCourses)
			firstSemester,
			secondSemester,
		},
	};
}
