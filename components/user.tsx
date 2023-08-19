import { getCurrentUser } from 'lib/auth';

import { LoginButton, LogoutButton } from './auth-buttons';

export const User = async () => {
  const user = await getCurrentUser();

  if (user) {
    return (
      <>
        Signed in as {user.email} <br />
        <LogoutButton />
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <LoginButton />
    </>
  );
};
