const { Pool } = require('pg');

const pool = new Pool({
  user: 'mithraperera',
  password: '',
  host: 'localhost',
  database: 'bootcampx'
});

const query = `
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;
const vals = [process.argv[2], Number(process.argv[3])];
pool.query(query, vals)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    })
  })
  .catch((e) => {
    console.log(e);
  });