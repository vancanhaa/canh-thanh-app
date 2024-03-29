import { createAsyncThunk } from "@reduxjs/toolkit";
import { usersAdminApi } from "../../api";

export const fetchUsersListAdmin = createAsyncThunk(
    "usersAdmin/fetchUsersListAdmin",
    async (payload, thunkApi) => {
        const { page, limit } = payload
        const response = await usersAdminApi.getUsersList(page, limit)
        return {
            listUsers: response.data,
            pagination: {
                page,
                limit,
                total: response.headers["x-total-count"]
            }
        }
    }
)

export const fetchDeleteUserAdmin = createAsyncThunk(
    "usersAdmin/fetchDeleteUserAdmin",
    async (payload, thunkApi) => {
        const response = await usersAdminApi.deleteUser(payload)
        return response.data
    }
)

export const fetchAllUsersAdmin = createAsyncThunk(
    "usersAdmin/fetchAllUsersAdmin",
    async (payload, thunkApi) => {
        const response = await usersAdminApi.getAllUsers()
        return response.data
    }
)

export const fetchChangeUserAdmin = createAsyncThunk(
    "usersAdmin/fetchChangeUserAdmin",
    async (payload, thunkApi) => {
        const { id, data } = payload
        const response = await usersAdminApi.changeInfoUser(id, data)
        return response.data
    }
)