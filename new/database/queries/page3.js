

const page3 = {
    category: `SELECT DISTINCT category FROM questions1  where category!= "category" and  category!= "" `,
    questions: (id)=>{
        return `SELECT * FROM questions1 WHERE category='${id}'`
    },
    edit: (data)=>{
        console.log(data);

        return `UPDATE questions SET 
        main_question='${data.main_question}',
        sub_question='${data.sub_question}',
        question='${data.question}',
        question_num='${data.question_num}',
        category='${data.category}'
        
        WHERE questions.id=${data.id}`
    },
    question: (id,id1)=>{
        return `SELECT * FROM questions1 WHERE  category='${id}' and id=${id1}`
    },
   
    edit: (data,data1)=>{
        console.log(data.id);

        return `UPDATE questions1 SET 
        main_question='${data.main_question}',
        sub_question='${data.sub_question}',
        question='${data.question}',
        question_num='${data.question_num}',
        category='${data.category}'
        
        WHERE id=${data.id} and category='${data1}'`
    },
    delete: (id, id1)=>{
        return `DELETE FROM questions1  WHERE id=${id1} and category='${id}'`
    },
}
    module.exports = page3;
    