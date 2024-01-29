type User = {
    id: number;
    username: string;
    email: string;
}

type ICredentials = {
    email: string;
    password: string;
}

const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);

    const isLoggedIn = computed(() => !!user.value);

    async function fetchAndSetUser() {
        const {data, error} = await useApiFetch<User>("/api/user");

        console.log(error.value);
        user.value = data.value;
    }

    async function login(credentials: ICredentials) {
        await useApiFetch("/sanctum/csrf-cookie");

        const loginFetch = await useApiFetch("/login", {
            method: "POST",
            body: credentials,
        });

        await fetchAndSetUser();

        return loginFetch;
    }

    return {
        user,
        login,
        fetchAndSetUser,
        isLoggedIn,
    }
});

export default useAuthStore;