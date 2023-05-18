import loginUser from "./loginUser";

export default function registerUser(createCustomer, formm, setUser, router) {

    try {
        const user = createCustomer.mutate({
            first_name: formm.firstName,
            last_name: formm.lastName,
            email: formm.email,
            password: formm.password,
        });
        console.log('registereds');
        loginUser(formm.email, formm.password, setUser, router);

    }
    catch (err) {
        console.log(err);
    }

}