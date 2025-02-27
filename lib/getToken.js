const getToken = async () => {
  console.log("Getting token...");
  const params = new URLSearchParams({
    grant_type: "password",
    site_key: process.env.AM_SITE_KEY,
    username: process.env.AM_USERNAME,
    password: process.env.AM_PASSWORD,
    client_id: "PWAApp",
  });
  const response = await fetch(
    `https://${process.env.AM_DOMAIN}/worker/token`,
    {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15",
      },
      body: params,
    },
  );
  const data = await response.json();
  const { access_token } = data;
  console.log("Token received!");
  return access_token;
};

export default getToken;
