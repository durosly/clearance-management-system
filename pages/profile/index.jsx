import UserWrapper from "../../components/layout/user-wrapper";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
// import mongoose from "mongoose";
import ProfileModel from "../../models/profile";
import DepartmentModel from "../../models/department";
import CollegeModel from "../../models/college";
import SessionModel from "../../models/session";
import handleSession from "../../session/handle-session";
import { stringifyDoc } from "../../lib";
import Level100 from "../../components/registration/level-100";

function Profile({
    user,
    profile,
    department,
    userSession,
    college,
    registrationLevel,
}) {
    console.log(registrationLevel);
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
                {(userSession.level === 100 ||
                    userSession.level === "undefined") && (
                    <Level100 regLevel={registrationLevel} />
                )}
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
    // const registrationLevel = await getRegistrationLevel({ user });

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
            registrationLevel: profile?.clearanceLevel || -1,
        },
    };
}
