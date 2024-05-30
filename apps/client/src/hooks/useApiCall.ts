import { ref } from "vue";

export default function useApiCall<T extends (...args: any) => any>(
    apiFunc: T,
    ...args: Parameters<T>
) {
    const data = ref<Awaited<ReturnType<T>>>();
    const loading = ref(false);
    const error = ref(null);

    const fetchData = async () => {
        loading.value = true;

        try {
            data.value = await apiFunc(args);
        } catch (err: any) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    };

    fetchData();

    return {
        data,
        loading,
        error,
    };
}
