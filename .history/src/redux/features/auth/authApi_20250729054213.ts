import baseApi from "../../api/baseApi";


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    agentRequest: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (body) => ({
        url: "/auth/verify-email",
        method: "POST",
        body,
      }),
    }),
    resendCode: builder.mutation({
      query: (body) => ({
        url: "/auth/resend-verify-email-token",
        method: "POST",
        body,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ newPassword, token,email }) => ({
        url: `/auth/reset-password/${token}`,
        method: "POST",
        body: { newPassword,email },
      }),
    }),

    changePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: `/auth/change-password`,
        method: "POST",
        body: {
          oldPassword,
          newPassword,
        },
      }),
    }),



    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useAgentRequestMutation,
  useLogoutMutation,
  useVerifyEmailMutation,
  useResendCodeMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation
} = authApi;
