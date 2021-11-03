const faunadb = require("faunadb");
const q = faunadb.query;

exports.handler = async (event) => {
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
    domain: "db.us.fauna.com",
  });

  try {
    const data = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index("posts"))),
        q.Lambda("x", q.Get(q.Var("x")))
      )
    );

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: error.message.toString() };
  }
};
