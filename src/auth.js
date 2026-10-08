import CredentialsProvider from 'next-auth/providers/credentials';

let password = process.env.SITE_LOCK_AUTH_PASS
let secret = process.env.SITE_LOCK_AUTH_SECRET

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
