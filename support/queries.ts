export const customerQueries = {
    getAdminUserByEmail: "SELECT au.* FROM public.admin_user AS au WHERE email = $1"
}