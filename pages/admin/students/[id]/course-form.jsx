import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Col, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { ADMIN_LEVEL } from "../../../../auth_constants/auth";
import AdminLayout from "../../../../components/admin/layout/admin-layout";
import CourseModel from "../../../../models/course";
import CourseRegModel from "../../../../models/course-reg";
import DepartmentModel from "../../../../models/department";
import ProfileModel from "../../../../models/profile";
import SessionModel from "../../../../models/session";
import handleSession from "../../../../session/handle-session";

function CourseForm({ firstSemester, secondSemester, status, registerId }) {
    const router = useRouter();
    const [isUpdating, setIsUpdating] = useState(false);
    async function approveForm() {
        if (isUpdating) return;
        setIsUpdating(true);
        try {
            const response = await axios.put(
                `/api/courses/registration/${registerId}/approve-form`
            );

            if (response.data.ok) {
                toast.success("Course form approved");
                router.reload();
            } else {
                throw new Error(response.data.msg);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsUpdating(false);
        }
    }

    return (
        <AdminLayout>
            <Row>
                <Col>
                    <h1>Student Course form</h1>
                </Col>
            </Row>
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
            <Row>
                <Col>
                    {status === false ? (
                        <Button
                            variant="success"
                            onClick={approveForm}
                            disabled={isUpdating}
                        >
                            Approve Form
                        </Button>
                    ) : (
                        <Button variant="primary" disabled>
                            Approved
                        </Button>
                    )}
                </Col>
            </Row>
        </AdminLayout>
    );
}

export default CourseForm;

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
    const student = await ProfileModel.findById(id);
    const session = await SessionModel.findById(student._sessionId);
    const level = session.level;

    // console.log(student);

    const registeredCourses = await CourseRegModel.findOne({
        _userId: student._userId,
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
            registerId: registeredCourses.id,
        },
    };
}
