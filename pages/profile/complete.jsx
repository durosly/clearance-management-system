import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import UserWrapper from "../../components/layout/user-wrapper";
import PersonalDetails from "../../components/registration/personal-details";
import StateOfOrigin from "../../components/proof/state-of-origin";
import BirthCertificate from "../../components/proof/birth-certificate";
import handleSession from "../../session/handle-session";
import ProfileModel from "../../models/profile";

function CompleteProfile({ user, stage }) {
	// const [stage, setStage] = useState(1);

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
				{stage === 1 && <PersonalDetails user={user} />}
				{stage === 2 && <StateOfOrigin />}
				{stage === 3 && <BirthCertificate />}
				{stage === 4 && (
					<Alert variant="success">Profile completed</Alert>
				)}
			</Container>
		</UserWrapper>
	);
}

export default CompleteProfile;

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

	let stage = 1;

	const profile = await ProfileModel.findOne({ _userId: user.id });

	if (profile && !profile?.soproof) {
		stage = 2;
	} else if (profile && !profile?.birthcertificate) {
		stage = 3;
	} else if (profile && profile?.soproof && profile?.birthcertificate) {
		stage = 4;
	}

	// if (profile) {
	// 	return {
	// 		redirect: {
	// 			destination: "/profile",
	// 			permanent: false,
	// 		},
	// 	};
	// }

	return {
		props: {
			user: JSON.parse(JSON.stringify(user)),
			stage,
		},
	};
}
