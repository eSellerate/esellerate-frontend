import axios from 'axios';

const validate = function () {

    let requestConfig = {
        url: 'https://api.mercadolibre.com/items',
        method: 'POST',
        headers: {
            Authorization: 'Bearer APP_USR-7741438893697913-100415-7ed277435391055f7e6a70db3bec7126-1489297309'
        },
        data: {
            title: "Muñeco MALO - No Ofertar",
            category_id: "MLM455858",
            price: 230,
            currency_id: "MXN",
            available_quantity: 10,
            buying_mode: "buy_it_now",
            condition: "new",
            listing_type_id: "gold_special",
            sale_terms: [
                {
                    id: "WARRANTY_TYPE",
                    value_name: "Garantía del vendedor"
                },
                {
                    id: "WARRANTY_TIME",
                    value_name: "90 días"
                }
            ],
            pictures: [
                {
                    source: "https://m.media-amazon.com/images/I/31H9Cgi4tDL._QL70_ML2_.jpg"
                }
            ],
            attributes: [
                {
                    id: "BRAND",
                    value_name: "Generic"
                },
                {
                    id: "EAN",
                    value_name: "7898095297749"
                }
            ],
            shipping: {
                mode: "not_specified",
                local_pick_up: false,
                free_shipping: false,
                methods: [],
                dimensions: null,
                tags: [],
                logistic_type: "not_specified",
                store_pick_up: false
            }
        },
    }

    const options = {
        method: 'POST',
        url: 'https://api.mercadolibre.com/items',
        crossDomain: true,
        headers: {
            Authorization: 'Bearer APP_USR-6181695585855937-091312-04ca026daf2244a5be7b92a506502587-1479214990',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        data: {
            title: 'Teacup',
            category_id: 'MLA1902',
            price: 10,
            currency_id: 'ARS',
            available_quantity: 1,
            buying_mode: 'buy_it_now',
            listing_type_id: 'bronze',
            condition: 'new',
            description: 'Item:, Teacup Model: 1. Size: 5cm. Color: White. New in Box',
            video_id: 'YOUTUBE_ID_HERE'
        }
    }

    var data = {
        title: "Item de test - No Ofertar",
        category_id: "MLA3530",
        price: 350,
        currency_id: "ARS",
        available_quantity: 10,
        buying_mode: "buy_it_now",
        condition: "new",
        listing_type_id: "gold_special",
        sale_terms: [
            {
                id: "WARRANTY_TYPE",
                value_name: "Garantía del vendedor"
            },
            {
                id: "WARRANTY_TIME",
                value_name: "90 días"
            }
        ],
        pictures: [
            {
                source: "http://mla-s2-p.mlstatic.com/968521-MLA20805195516_072016-O.jpg"
            }
        ],
        attributes: [
            {
                id: "BRAND",
                value_name: "Marca del producto"
            },
            {
                id: "EAN",
                value_name: "7898095297749"
            }
        ]
    }

    let config = {
        headers: {
            Authorization: 'Bearer APP_USR-7741438893697913-100415-7ed277435391055f7e6a70db3bec7126-1489297309',
        }
    };

    const url = 'https://api.mercadolibre.com/items/validate'
    const res = axios.getUri(requestConfig)

    console.log(res)

    axios(requestConfig)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
        })
}

export default validate
