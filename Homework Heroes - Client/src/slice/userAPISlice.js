import { apiSlice } from './apiSlice';
const USERS_URL = 'https://homeworkhero-api.onrender.com';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: ({id, data }) => {
        console.log('Data:', id); // Log the data
        return {
          url: `${USERS_URL}/student/profile/${id}`,
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data), // Convert data to JSON
        };
      },
    }),
  }),
});
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
} = userApiSlice;
