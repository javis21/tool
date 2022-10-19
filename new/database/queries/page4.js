const question = {
    list: `SELECT * FROM questions  `,
    list1: `  SELECT * FROM questions q , answer a WHERE q.question_num=a.q1 AND a.num = (SELECT num from answer ORDER BY ID DESC LIMIT 1) AND a.q3= ? `,
    // list2: `  SELECT * FROM questions q , answer a WHERE q.question_num=a.q1 AND a.num = (SELECT num from answer ORDER BY ID DESC LIMIT 1) AND a.q3="user2" `,
    // list3: `  SELECT * FROM questions q , answer a WHERE q.question_num=a.q1 AND a.num = (SELECT num from answer ORDER BY ID DESC LIMIT 1) AND a.q3="user3" `,
    user:`SELECT fullname FROM pros where admin=0 `,
    listNist: `SELECT * FROM questions2 `  ,
    nist4: `SELECT * FROM questions1 where category ="NIST4" `,
    nist5: `SELECT * FROM questions1 where category ="NIST4" `,
    
    lists: (id)=>{
        return `SELECT * FROM questions1 WHERE questions1.category="${id}"`
    }

}
    module.exports = question;
    