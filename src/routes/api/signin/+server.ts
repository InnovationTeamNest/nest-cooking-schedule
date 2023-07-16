import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { UserInfo } from '../../../stores/app';
import * as luxon from 'luxon';
import Student from '$lib/server/models/Student';
import config from '../config';

export const POST = (async ({ request, cookies }) => {
  let req = await request.json();

  let signIn = await Student.signIn(req as UserInfo);

  if (signIn) {
    req.validated = true;
    cookies.set('sessionid', signIn.newSession.id, {
      path: config.cookies.path,
      maxAge: 60 * 60 * config.cookies.hours,
      expires: luxon.DateTime.now().plus({ hours: config.cookies.hours }).toJSDate(),
      httpOnly: config.cookies.httpOnly,
      secure: config.cookies.secure
    });

    let res = new Response(JSON.stringify(signIn.targetUser));
    res.headers.set('Content-Type', 'application/json');

    return res;
  } else req.validated = false;

  let res = new Response(null, {
    status: 401
  });
  return res;
}) satisfies RequestHandler;
