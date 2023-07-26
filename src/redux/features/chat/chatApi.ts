import api from '@/redux/api/apiSlice';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: (data) => ({
        url: `/chat`,
        method: 'POST',
        body: data,
      }),
    }),

    getChatByEmail: builder.query({
      query: (email) => ({
        url: `/chat?email=${email}`,
      }),
    }),
  }),
});

export const { useCreateChatMutation, useGetChatByEmailQuery } = userApi;
