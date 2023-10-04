import axios from 'axios';

const validate = function () {
    const options = {
        method: 'POST',
        url: 'https://api.mercadolibre.com/items/validate',
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
        title: 'Teacup',
        category_id: 'MLA1902',
        price: 10,
        currency_id: 'ARS',
        available_quantity: 1,
        buying_mode: 'buy_it_now',
        listing_type_id: 'bronze',
        condition: 'new',
        description: 'Item:, Teacup Model: 1. Size: 5cm. Color: White. New in Box',
        video_id: 'youtube.com',
    }

    let config = {
        headers: {
            Authorization: 'Bearer APP_USR-6181695585855937-091312-04ca026daf2244a5be7b92a506502587-1479214990',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    };

    const url = 'https://api.mercadolibre.com/items/validate'
    const res = axios.getUri({ url, data, config })

    console.log(res)

    axios.post({ url, data, config })
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
        })
}

export default validate
