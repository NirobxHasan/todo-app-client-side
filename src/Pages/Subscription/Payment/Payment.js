import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
const Payment = ({ subPackage }) => {
    const { user } = useAuth();
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
                        `http://localhost:5000/users_subscription/${user.email}`,
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
                                // history.push()
                            }
                        });
                    console.log(order);
                },
                onError: (err) => {
                    console.log(err);
                }
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
