import React from "react";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import { STUDENT_LEVEL } from "../../../auth_constants/auth";
import UserWrapper from "../../../components/layout/user-wrapper";
import CourseModel from "../../../models/course";
import CourseRegModel from "../../../models/course-reg";
import DepartmentModel from "../../../models/department";
import ProfileModel from "../../../models/profile";
import SessionModel from "../../../models/session";
import handleSession from "../../../session/handle-session";

function CourseFormLevel({ firstSemester, secondSemester, status }) {
	return (
		<UserWrapper>
			<Container>
				{status ? (
					<>
						<Alert variant="success">
							Course form has been approved
						</Alert>
						<Button variant="primary">Print Form</Button>
					</>
				) : (
					<Alert variant="danger">
						Course form has not been approved
					</Alert>
				)}
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
									</tr>
								))}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		</UserWrapper>
	);
}

export default CourseFormLevel;

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

	const level = context.params.level;

	// console.log(level);

	const registeredCourses = await CourseRegModel.findOne({
		_userId: user.id,
		level,
	});
	const courseIds = registeredCourses._courseIds;

	// console.log(courseIds);

	// const profile = await ProfileModel.findOne({ _userId: user.id });
	// const session = await SessionModel.findById(profile._sessionId);
	const firstCourses = await CourseModel.find({
		_id: { $in: courseIds },
		semester: "first",
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
		_id: { $in: courseIds },
		semester: "second",
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

	// console.table(firstSemester);

	return {
		props: {
			// firstSemester: stringifyDoc(firstCourses)
			firstSemester,
			secondSemester,
			status: registeredCourses.status,
		},
	};
}
