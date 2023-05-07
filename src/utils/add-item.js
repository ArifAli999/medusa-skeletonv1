import checkIfProductExists from "./check-if-exists";

export default function addItem(createLineItem, cartId, variant, quantity, cart) {
    return new Promise(async (resolve, reject) => {
        try {
            const existingLineItem = cart?.items.find(li => li.variant_id === variant.id);

            if (existingLineItem) {
                console.log('Item already in cart');
            } else {
                await createLineItem.mutateAsync({
                    variant_id: variant.id,
                    quantity,
                });
                console.log('Item added to cart!');
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

