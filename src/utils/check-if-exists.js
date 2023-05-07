export default function checkIfProductExists(selectedItem, cart) {
    const product = cart?.items.find((item) => item.variant_id === selectedItem.id);
    return product;

}