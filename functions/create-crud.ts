const faunadb = require("faunadb");
const q = faunadb.query;

exports.handler = async (event) => {
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
    domain: "db.us.fauna.com",
  });

  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const reqObj = JSON.parse(event.body);

    const result = await client.query(
      q.Create(q.Collection("posts"), {
        data: {
          title: reqObj.title,
          description: reqObj.description,
          id: reqObj.id,
        },
      })
    );

    console.log("Data Inserted Successfully!", result.ref.id);
    return {
      statusCode: 201,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
