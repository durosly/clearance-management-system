import { useRef } from "react";
import Image from "next/image";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import { STUDENT_LEVEL } from "../../../auth_constants/auth";
import UserWrapper from "../../../components/layout/user-wrapper";
import CourseModel from "../../../models/course";
import CourseRegModel from "../../../models/course-reg";
import DepartmentModel from "../../../models/department";
import ProfileModel from "../../../models/profile";
import SessionModel from "../../../models/session";
import handleSession from "../../../session/handle-session";

function CourseFormLevel({
    firstSemester,
    secondSemester,
    status,
    fullname,
    matnum,
    level,
}) {
    const componentRef = useRef();
    return (
        <UserWrapper>
            <Container>
                {status ? (
                    <>
                        <Alert variant="success">
                            Course form has been approved
                        </Alert>
                        <ReactToPrint
                            trigger={() => (
                                <Button variant="primary">Print Form</Button>
                            )}
                            content={() => componentRef.current}
                        />
                    </>
                ) : (
                    <Alert variant="danger">
                        Course form has not been approved
                    </Alert>
                )}
            </Container>
            <hr />
            <Container className="py-2 mt-20" ref={componentRef}>
                <Row>
                    <div className="text-center mb-3">
                        <Image
                            height={100}
                            width={100}
                            src="/images/logo-fupre.png"
                            class="img-thumbnail"
                            alt="logo"
                        />
                    </div>
                </Row>
                <Row>
                    <p>
                        Name: <span className="fw-bold">{fullname}</span>
                    </p>
                    <p>
                        Matric Number: <span className="fw-bold">{matnum}</span>
                    </p>
                    <p>
                        Level: <span className="fw-bold">{level}</span>
                    </p>
                </Row>
                <h3 className="mt-4 text-center">Registration</h3>
                <Row>
                    <Col>
                        <h4>First semester</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped responsive>
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
                        <Table striped responsive>
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

    // console.log(user);

    const profile = await ProfileModel.findOne({ _userId: user.id });
    const session = await SessionModel.findById(profile._sessionId);
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
            fullname: `${user.firstname}${
                user?.middlename && ` ${user?.middlename}`
            } ${user.lastname}`,
            matnum: profile.matricnumber,
            level: session.level,
        },
    };
}
