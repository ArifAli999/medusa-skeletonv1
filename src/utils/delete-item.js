export default function deleteItem(itemId, deleteLineItem) {
    return new Promise(async (resolve, reject) => {
        try {

            await deleteLineItem.mutateAsync({
                lineId: itemId,
            });
            console.log('Item deleted from cart!');

            resolve();
        } catch (error) {
            reject(error);
        }
    });
}
