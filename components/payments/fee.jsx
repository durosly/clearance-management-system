import { useState } from "react";
import Link from "next/link";
import { Badge, Button, ListGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { usePaystackPayment } from "react-paystack";
import axios from "axios";

function Fee({ p, user, paid, paymentId }) {
	const [isLoading, setIsLoading] = useState(false);

	const config = {
		reference: new Date().getTime().toString(),
		email: user.email,
		amount: p.amount * 100,
		publicKey: "pk_test_1595d971481e77bb7ac48baa7b9b6d8c8730c70f",
		metadata: {
			custom_fields: [
				{
					payment_purpose: p.title,
				},
			],
		},
	};

	const initializePayment = usePaystackPayment(config);

	function onSuccess(data) {
		// console.log(data.reference);
		makePaymentRequest(data.reference);
	}

	async function makePaymentRequest(reference) {
		if (isLoading) return;

		setIsLoading(true);
		try {
			const response = await axios.post("/api/payments/pay-fee", {
				reference,
				title: p.title,
				amount: p.amount,
				id: p._id,
			});

			if (response.data.ok) {
				toast.success("Payment successful");
				setIsLoading(false);
			} else {
				throw new Error(response.data.msg);
			}
		} catch (error) {
			toast.error(error.message);
			setIsLoading(false);
		}
	}

	function handlePayment() {
		initializePayment(onSuccess);
	}
	return (
		<ListGroup.Item
			key={p._id}
			className="d-flex justify-content-between align-items-center"
		>
			<div className="ms-2">
				<div className="fw-bold">{p.title}</div>
			</div>
			{paid ? (
				<Link href={`/payments/reciept/${paymentId}`}>
					View receipt
				</Link>
			) : (
				<Button
					variant="primary"
					onClick={handlePayment}
					disabled={isLoading}
				>
					{isLoading ? "Loading..." : "Pay now"}
				</Button>
			)}
			<Badge
				bg="primary"
				pill
			>
				{p.amount.toLocaleString()}
			</Badge>
		</ListGroup.Item>
	);
}

export default Fee;
