export const handleApiError = (err: any): string => {
    const backendErrors = err?.response?.data?.errors;

    if (Array.isArray(backendErrors) && backendErrors.length > 0) {
        return backendErrors.join(" | "); // ou .map(...) pra formatar como quiser
    }

    if (typeof err === "string") {
        return err;
    }

    if (err instanceof Error) {
        return err.message;
    }

    return "Ocorreu um erro inesperado.";
};
