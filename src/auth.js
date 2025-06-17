import CredentialsProvider from 'next-auth/providers/credentials';

let password = process.env.AUTH_PASS
let secret = process.env.AUTH_SECRET

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'password',
            credentials: {
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            async authorize(credentials, _request) {
                if (credentials?.password == password) {
                    return { id: '0' };
                } else {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/sign-in",
    },
    session: {
        strategy: 'jwt',
    },
    secret: secret,
};
