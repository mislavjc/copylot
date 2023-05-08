import middleware from 'next-auth/middleware';

export default middleware({
  pages: {
    signIn: '/login',
  },
});
