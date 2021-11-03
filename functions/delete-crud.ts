const faunadb = require("faunadb");
const q = faunadb.query;

exports.handler = async (event) => {
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
    domain: "db.us.fauna.com",
  });

  try {
    const id = JSON.parse(event.body);
    await client.query(q.Delete(q.Ref(q.Collection("posts"), id)));
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: "Post deleted" }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
