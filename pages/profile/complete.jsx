import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserWrapper from "../../components/layout/user-wrapper";
import PersonalDetails from "../../components/registration/personal-details";

function CompleteProfile() {
	return (
		<UserWrapper>
			<Container className="mb-5">
				<Row>
					<Col>
						<h2>Complete Registration</h2>
						<p>
							Ensure that your information are correct before
							submitting
						</p>
					</Col>
				</Row>
				<PersonalDetails />
			</Container>
		</UserWrapper>
	);
}

export default CompleteProfile;
