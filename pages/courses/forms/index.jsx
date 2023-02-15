import React from "react";
import { Badge, Col, Container, ListGroup, Row } from "react-bootstrap";
import { STUDENT_LEVEL } from "../../../auth_constants/auth";
import UserWrapper from "../../../components/layout/user-wrapper";
import handleSession from "../../../session/handle-session";
import CourseRegModel from "../../../models/course-reg";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";

function CoursesForms({ list }) {
	return (
		<UserWrapper>
			<Container>
				<Row>
					<Col>
						<h1>Course Forms</h1>
					</Col>
				</Row>
				<Row>
					<ListGroup>
						{list.map((c) => (
							<ListGroup.Item>
								<Link
									className="btn btn-primary"
									href={`/courses/forms/${c.level}`}
								>
									{c.level}{" "}
									<Badge
										bg={c.status ? "success" : "danger"}
										pill
									>
										{c.status ? (
											<TiTick style={{ width: "20px" }} />
										) : (
											<RxCross2
												tyle={{ width: "20px" }}
											/>
										)}
									</Badge>
								</Link>
							</ListGroup.Item>
						))}
					</ListGroup>
				</Row>
			</Container>
		</UserWrapper>
	);
}

export default CoursesForms;

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

	const registeredCourses = await CourseRegModel.find({ _userId: user.id });

	const list = registeredCourses.map((r) => ({
		_id: r.id,
		level: r.level,
		status: r.status,
	}));

	return {
		props: {
			// firstSemester: stringifyDoc(firstCourses)
			// firstSemester,
			// secondSemester,
			list,
		},
	};
}
