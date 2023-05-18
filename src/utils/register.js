import loginUser from "./loginUser";

export default async function registerUser(createCustomer, formm, setUser, router, setIsOpen) {

    try {
        const user = await createCustomer.mutate({
            first_name: formm.firstName,
            last_name: formm.lastName,
            email: formm.email,
            password: formm.password,
        });

        console.log('registereds');

        // setIsOpen(false);
        return true;

    }
    catch (err) {
        console.log(err);
    }

}