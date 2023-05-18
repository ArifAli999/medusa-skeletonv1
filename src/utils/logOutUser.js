export default function logOut(router, setUser) {
    try {
        fetch(`<BACKEND_URL>/store/auth`, {
            method: "DELETE",
            credentials: "include",
        })
            .then(() => {
                router.push('/products');
                setUser(null);
                console.log('logged out');
            });

    }

    catch (error) {
        console.log(error);
    }

}