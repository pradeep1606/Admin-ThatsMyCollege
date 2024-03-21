// middleware/auth.js

import { getSession } from 'next-auth/client';
import { NextApiResponse, NextApiRequest } from 'next';

export const isAuthenticated = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    res.writeHead(302, { Location: '/login' });
    res.end();
    return false;
  }

  return true;
};
