# Live-coding challenge

### API

- `https`: <https://nvy34v633k.execute-api.ap-southeast-1.amazonaws.com/prod>

### Figma for UI Design

- Prototype: [Figma](https://www.figma.com/proto/G6C6mbcEd7y1v35H87h6ex/Code-challenge-UI?node-id=15%3A2&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=15%3A2)
- File: [Figma](https://www.figma.com/file/G6C6mbcEd7y1v35H87h6ex/Code-challenge-UI?node-id=0%3A1)

## Requirements

- Add card validation on Checkout form:
  - Must be a valid card number
  - Must be Visa / Master card type
  - Must be valid expiration date
  - Must be valid CVV
- Complete the API integration:
  - Call the web service for payment submission
- Add new UI on Checkout form:
  - Display the icon (Visa/Master) based on card number input
  - Style “Pay” button of the checkout form according to Figma UI

## Getting started

### Installation

Change the `example.env` to `.env`

```bash
yarn install
```

### Running the app

```bash
# development
$ yarn dev

# build production
$ yarn build
```

### Services

- Get Product: <https://nvy34v633k.execute-api.ap-southeast-1.amazonaws.com/prod/products>
- Submit Payment: <https://nvy34v633k.execute-api.ap-southeast-1.amazonaws.com/prod/pay>

#### Example of request

```json
{
    "requestId": "12344556",
    "paymentInfo": {
        "email": "aaa@codigo.co",
        "cardInfo": {
            "cardNo": "123456778888",
            "cardExpiryDate": "33/21",
            "cardCVV": "124"
        }
    },
    "products": [
        {
            "id": "1",
            "quantity": 1
        },
        {
            "id": "2",
            "quantity": 5
        }
    ]
}
```

#### Example of response ( Success )

```json
{
    "data": {
        "requestId": "12344556",
        "paymentInfo": {
            "email": "aaa@codigo.co",
            "cardInfo": {
                "cardNo": "123456778888",
                "cardExpiryDate": null,
                "cardCVV": null
            }
        }
    },
    "message": "Payment success!",
    "status": "success"
}
```

#### Example of response ( Validation Error )

```json
{
    "data": {
        "validation": {
            "cardCVV": [
                "Card cvv can't be blank"
            ]
        }
    },
    "message": "required fields are missing",
    "status": "bad request"
}
```

Desire to win the war? Well, to make it a little more fun, please remember that

**You cannot**:

- Change existing behaviors.
- Change the API server.
- Change from JavaScript/TypeScript to other languages.

Have fun! 🤘
