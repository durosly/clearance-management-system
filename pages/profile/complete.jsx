import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserWrapper from "../../components/layout/user-wrapper";
import PersonalDetails from "../../components/registration/personal-details";
import StateOfOrigin from "../../components/proof/state-of-origin";
import BirthCertificate from "../../components/proof/birth-certificate";

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
				{/* <PersonalDetails /> */}
				{/* <StateOfOrigin /> */}
				<BirthCertificate />
			</Container>
		</UserWrapper>
	);
}

export default CompleteProfile;
