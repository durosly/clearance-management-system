import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import Alert from "react-bootstrap/Alert";

function BirthCertificate() {
	const router = useRouter();
	const [uploadedImg, setUploadedImg] = useState(null);
	const [uploadingImg, setUploadingImg] = useState(false);
	const [imgUploadingProgress, setImgUploadingProgress] = useState(0);
	const [alertStatus, setAlertStatus] = useState({
		is: false,
		msg: "",
		type: "",
	});

	async function handlerFileUpload(e) {
		e.preventDefault();

		if (uploadingImg) return;

		setUploadingImg(true);
		setAlertStatus({ is: false });

		try {
			if (!uploadedImg) throw new Error("Select a file to upload");

			const formData = new FormData();

			formData.append(`img`, uploadedImg[0]);

			const response = await axios.post(
				`/api/profile/upload-doc-of-birth-certificate`,
				formData,
				{
					onUploadProgress: (progressEvent) => {
						const progress = parseInt(
							Math.round(
								(progressEvent.loaded * 100) /
									progressEvent.total
							)
						);
						// Update state here
						setImgUploadingProgress(progress);
					},
				}
			);

			// console.log(response);
			if (response.data.ok) {
				setUploadingImg(false);
				setUploadedImg(null);

				setAlertStatus({
					is: true,
					type: "success",
					msg: "Upload successful",
				});

				setTimeout(() => {
					router.reload();
				}, 5000);
			} else {
				throw new Error(response.data.msg);
			}
		} catch (error) {
			let errorMsg = "";

			if (error?.response) {
				errorMsg = error.response.data.msg;
			} else {
				errorMsg = error.message;
			}
			console.log(error);
			setUploadingImg(false);
			setAlertStatus({ is: true, type: "danger", msg: errorMsg });
		}
	}
	return (
		<Row>
			<Col>
				<Form onSubmit={handlerFileUpload}>
					<Form.Group
						className="mb-3"
						controlId="file"
					>
						{alertStatus.is && (
							<Alert
								variant={alertStatus.type}
								onClose={() => setAlertStatus({ is: false })}
								dismissible
							>
								{alertStatus.msg}
							</Alert>
						)}
						<Form.Label>
							Birth certificate or age declaration
						</Form.Label>
						<Form.Control
							type="file"
							accept="image/gif, image/png, image/jpeg"
							onChange={(e) => setUploadedImg(e.target.files)}
						/>
					</Form.Group>
					{uploadingImg && <ProgressBar now={imgUploadingProgress} />}
					<Button
						variant="primary"
						type="submit"
					>
						Next
					</Button>
				</Form>
			</Col>
		</Row>
	);
}

export default BirthCertificate;
