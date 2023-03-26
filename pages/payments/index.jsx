import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

import UserWrapper from "../../components/layout/user-wrapper";
import ProfileModel from "../../models/profile";
import PaymentListModel from "../../models/payment-list";
import PaymentModel from "../../models/payment";
import SessionModel from "../../models/session";
import { STUDENT_LEVEL } from "../../auth_constants/auth";
import { stringifyDoc } from "../../lib";

import handleSession from "../../session/handle-session";
import Fee from "../../components/payments/fee";
import { Alert } from "react-bootstrap";
import { FiAlertTriangle } from "react-icons/fi";
import { GrCircleAlert } from "react-icons/gr";

function Payments({ payments, user, paymentsDone, isActive }) {
    console.log(paymentsDone);
    return (
        <UserWrapper>
            <Container className="mb-5">
                <Row>
                    <Col>
                        <h2>Payments</h2>
                    </Col>
                </Row>
                {isActive ? (
                    <Row>
                        <Col>
                            <ListGroup>
                                {payments.length > 0 ? (
                                    payments.map((p) => {
                                        let paymentId = null;
                                        if (paymentsDone.includes(p._id)) {
                                            const index = paymentsDone.indexOf(
                                                p._id
                                            );
                                            paymentId = paymentsDone[index];
                                        }
                                        return (
                                            <Fee
                                                key={p._id}
                                                p={p}
                                                user={user}
                                                paid={paymentsDone.includes(
                                                    p._id
                                                )}
                                                paymentId={paymentId}
                                            />
                                        );
                                    })
                                ) : (
                                    <Alert variant="warning">
                                        <GrCircleAlert className="w-5 me-1" />
                                        No payments available
                                    </Alert>
                                )}
                            </ListGroup>
                        </Col>
                    </Row>
                ) : (
                    <Row>
                        <Col>
                            <Alert variant="danger">
                                <Alert.Heading>
                                    <FiAlertTriangle /> Notice
                                </Alert.Heading>
                                <p>
                                    You have not be assigned to a session and
                                    under verification
                                </p>
                                <hr />
                                <p> Please ensure your profile is updated</p>
                            </Alert>
                        </Col>
                    </Row>
                )}
            </Container>
        </UserWrapper>
    );
}

export default Payments;

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
    const sessionDB = await SessionModel.findById(profile._sessionId);

    const paymentList = await PaymentListModel.find({
        _collegeId: { $in: ["all", profile._collegeId] },
        _departmentId: { $in: ["all", profile._departmentId] },
        _sessionId: profile._sessionId,
        sessionInfo: `${sessionDB.title} (${sessionDB.level})`,
    });

    if (!sessionDB) {
        return {
            props: {
                isActive: false,
            },
        };
    }
    const paymentsDone = await PaymentModel.find({
        sessionInfo: `${sessionDB.title} (${sessionDB.level})`,
        _userId: user.id,
    });

    const paymentsIDs = paymentsDone.map((p) => p._paymentListId);

    return {
        props: {
            user: stringifyDoc(user),
            payments: stringifyDoc(paymentList),
            // profile: stringifyDoc(profile),
            session: stringifyDoc(sessionDB),
            paymentsDone: stringifyDoc(paymentsIDs),
            isActive: true,
        },
    };
}
