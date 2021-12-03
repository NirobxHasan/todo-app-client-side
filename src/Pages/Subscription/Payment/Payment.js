import React, { useEffect, useRef } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useHistory } from 'react-router';
const Payment = ({ subPackage }) => {
    const { user } = useAuth();
    const history = useHistory();
    const paypal = useRef();
    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units: [
                            {
                                description: subPackage.package_name,
                                amount: {
                                    currency_code: 'USD',
                                    value: subPackage.price
                                }
                            }
                        ]
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    alert('Successfully paid');
                    fetch(
                        `https://quiet-crag-38399.herokuapp.com/users_subscription/${user.email}`,
                        {
                            method: 'PUT',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(subPackage)
                        }
                    )
                        .then((res) => res.json())
                        .then((result) => {
                            if (result.matchedCount) {
                                history.push('/createnote');
                            }
                        });
                },
                onError: (err) => {}
            })
            .render(paypal.current);
    }, []);
    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
};

export default Payment;
