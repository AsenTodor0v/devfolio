import api from "@/api";

export async function getBlogs(page) {
    try {
        const response = await api.get(`blog_list?page=${page}`);
        return response.data;
    } catch (err) {
        throw new Error(err.message);
    }
}

export async function getBlog(slug) {
    try {
        const response = await api.get(`blogs/${slug}`);
        return response.data
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function registerUser(data) {
    try {
        const response = await api.post(`register_user/`, data);
        return response.data
    } catch (error) {
        if (error.response.status === 400) {
            throw new Error('User already exists');
        }
        throw new Error(error);
    }
}

export async function loginUser(data) {
    try {
        const response = await api.post(`token/`, data);
        return response.data
    } catch (error) {
        if (error.status === 401) {
            throw new Error('Invalid credentials');
        }
        throw new Error(error);
    }
}

export async function getUsername() {
    try {
        const response = await api.get(`get_username/`);
        return response.data
    } catch (error) {
        throw new Error(error.message);
    }
}