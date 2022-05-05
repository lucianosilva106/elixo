import React, { useState, useEffect, useRef} from 'react';

function Paypal(total) {

    const [paid, setPaid] = useState(false);
    const [loaded, setLoaded] = useState(false);
  
    let paypalRef = useRef();

    useEffect(() => {

        const script = document.createElement('script');
        const id = "AbHgMYLt2of9u77PGOJ-vZZ8bC4YKnkpGo3OSespXt0T0DFpG1ctecdCZYQFhGkvZdCqX-Y2xE8wAtxF"
        script.src = `https://www.paypal.com/sdk/js?currency=BRL&client-id=${id}`

        script.addEventListener("load", () => setLoaded(true));

        document.body.appendChild(script);

        if (loaded){
            function loadButtonsAndLogicAboutPayment() {
            setTimeout(() => {
//                alert('vai abrir a window')
                window.paypal
                .Buttons({
                    createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                           description: 'venda', 
                            amount: {
                                currency_code: "BRL",
                                value: 5
                            }
                        }
                        ]     
                    });
                    },
                    onApprove: async(_, actions) => {
                        const order = await actions.order.capture();

                        setPaid(true);

                        console.log(order);
                    }
                })
                .render(paypalRef);
            })
        }
        loadButtonsAndLogicAboutPayment();
        }
    })

    return(
        <div>
            {paid ? (
                <div>
                    <h1>Obrigado pelo pagamento</h1>
                </div>
            ) : (
                <>
                <h1>
                    
                </h1>
                <div ref={v => (paypalRef = v)}/>
                </>
            )}
        </div>
    );
}

export default Paypal;
