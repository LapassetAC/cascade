export default async function handler(req, res) {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink&access_token=${accessToken}`
    );
    const data = await response.json();

    // Limit to the last 3 posts
    const lastThreePosts = data.data.slice(0, 3);

    res.status(200).json(lastThreePosts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Instagram posts" });
  }
}
