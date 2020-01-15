// Imports the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');

async function createDataset() {
  // Creates a client
  const bigQueryClient = new BigQuery();


  const que = `SELECT EXTRACT(YEAR FROM creation_date) AS Year,
    COUNT(*) AS Number_of_Questions,
      ROUND(100 * SUM(IF(answer_count > 0, 1, 0)) / COUNT(*), 1) AS Percent_Questions_with_Answers
      FROM
        \`bigquery-public-data.stackoverflow.posts_questions\`
          GROUP BY
            Year
          ORDER BY
            Year`;
  const data = await bigQueryClient.query(que);
  console.log(data.keys());
  return data
  // console.log(`Dataset ${dataset.id} created.`);
}

createDataset().then(ret => console.log(ret));
