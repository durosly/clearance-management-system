import Link from "next/link";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classNames from "classnames";

function Level100({ regLevel }) {
    return (
        <>
            <Row>
                <Col>
                    <h2>Registraion status</h2>
                </Col>
            </Row>
            <Row className="row-gap-3">
                <Col xs={12} sm={4} md={3}>
                    <Card
                        border={classNames({
                            warning: regLevel < 2,
                            success: regLevel >= 2,
                        })}
                    >
                        <Card.Body>
                            <Card.Title>Profile completion</Card.Title>

                            {regLevel < 2 ? (
                                <Link
                                    className={`btn btn-primary`}
                                    href="/profile/complete"
                                    disabled={regLevel >= 2}
                                >
                                    Complete process
                                </Link>
                            ) : (
                                <button className="btn btn-primary disabled cursor-not-allowed">
                                    Completed
                                </button>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4} md={3}>
                    <Card
                        border={classNames({
                            warning: regLevel === 2,
                            success: regLevel > 2,
                        })}
                    >
                        <Card.Body>
                            <Card.Title>Payments</Card.Title>
                            <ProgressBar animated now={45} />

                            <Link href="/payments">Complete payment</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4} md={3}>
                    <Card border="danger">
                        <Card.Body>
                            <Card.Title>Course registration</Card.Title>

                            <Link href="/course-reg">Complete process</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4} md={3}>
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
                <Col xs={12} sm={4} md={3}>
                    <Card border="danger">
                        <Card.Body>
                            <Card.Title>Registra</Card.Title>
                            <Card.Text>In progress</Card.Text>
                            <Link href="/nice">Learn more...</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4} md={3}>
                    <Card border="danger">
                        <Card.Body>
                            <Card.Title>Library</Card.Title>
                            <Card.Text>In progress</Card.Text>
                            <Link href="/nice">Learn more...</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4} md={3}>
                    <Card border="danger">
                        <Card.Body>
                            <Card.Title>College</Card.Title>
                            <Card.Text>In progress</Card.Text>
                            <Link href="/nice">Learn more...</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4} md={3}>
                    <Card border="danger">
                        <Card.Body>
                            <Card.Title>Department</Card.Title>
                            <Card.Text>In progress</Card.Text>
                            <Link href="/nice">Learn more...</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4} md={3}>
                    <Card border="danger">
                        <Card.Body>
                            <Card.Title>Dean of student affairs</Card.Title>
                            <Card.Text>In progress</Card.Text>
                            <Link href="/nice">Learn more...</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4} md={3}>
                    <Card border="danger">
                        <Card.Body>
                            <Card.Title>Medical</Card.Title>
                            <Card.Text>In progress</Card.Text>
                            <Link href="/nice">Learn more...</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Level100;
