const faunadb = require("faunadb");
const q = faunadb.query;

exports.handler = async (event) => {
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
    domain: "db.us.fauna.com",
  });

  try {
    const response = JSON.parse(event.body);
    const data = await client.query(
      q.Update(q.Ref(q.Collection("posts"), response.id), {
        data: {
          title: response.title,
          description: response.description,
        },
      })
    );
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: "Post deleted" }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
