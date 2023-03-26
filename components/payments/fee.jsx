import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Badge, Button, ListGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { usePaystackPayment } from "react-paystack";
import axios from "axios";

function Fee({ p, user, paid, paymentId }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const config = {
        reference: new Date().getTime().toString(),
        email: user.email,
        amount: p.amount * 100,
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
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
                router.reload();
                // setIsLoading(false);
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
            <Badge bg="primary" pill>
                {p.amount.toLocaleString()}
            </Badge>
        </ListGroup.Item>
    );
}

export default Fee;
