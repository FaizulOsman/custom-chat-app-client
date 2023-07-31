import api from '@/redux/api/apiSlice';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: (data) => ({
        url: `/chat`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['chat'],
    }),

    updateChat: builder.mutation({
      query: ({ reaction, id }) => ({
        url: `/chat/${id}`,
        method: 'PATCH',
        body: reaction,
      }),
      invalidatesTags: ['chat'],
    }),

    getChatByEmail: builder.query({
      query: (email) => ({
        url: `/chat?email=${email}`,
      }),
      providesTags: ['chat'],
    }),
  }),
});

export const {
  useCreateChatMutation,
  useUpdateChatMutation,
  useGetChatByEmailQuery,
} = userApi;
