import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import queryString from 'query-string';

const authorize = async () => {
  const headersList = await headers();
  const host = headersList.get('host');
  const locale = (await cookies()).get('NEXT_LOCALE').value || 'uz';
  const protocol = host === 'localhost:3000' ? 'http' : 'https';
  const redirectUrl = `${protocol}://${host}/${locale}/one-id-auth`;

  const query = queryString.stringify({
    client_id: 'pm_gov_uz_test',
    response_type: 'one_code',
    redirect_uri: redirectUrl,
    xoauth_displayname: 'pm_situation_panel',
    state: 'situation_panel_state',
    scope: 'pm_situation_panel',
  });

  return `https://sso.egov.uz/sso/oauth/Authorization.do?${query}`;
};

export default async function LoginViaOneId() {
  const oneIdAuthUrl = await authorize();

  redirect(oneIdAuthUrl);
}
