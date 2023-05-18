export default function loginUser(email, password, setUser, router) {
    console.log(email);
    console.log(password);

    try {
        const response = fetch(`http://localhost:9000/store/auth`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.customer) {
                    setUser(data.customer);
                    router.push("/products");
                }

            });
    }
    catch (err) {
        console.log(err);
    }
}