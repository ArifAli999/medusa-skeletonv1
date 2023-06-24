export default async function addShippingAddress(updateCart, address) {

    try {

        updateCart.mutateAsync({
            shipping_address: {
                company: 'company',
                first_name: 'Ali',
                last_name: 'Arif',
                address_1: '9 Union Studios',
                address_2: '2 Union St',
                city: 'Newcastle',
                country_code: 'ar',
                postal_code: 'NE21BX',
                province: 'Newcastle',
                phone: '07774366098',
            },
        });
        console.log('shipping address added');
    }
    catch (err) {
        console.log(err);
    }
}