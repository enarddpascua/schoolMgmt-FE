
const {courses} = require('./course_mock.json')

export default function handler(req, res) {
    const cse = courses.filter(course => course.course_code === req.query.course_code)
    
  if(req.method === 'GET'){
    res.status(200).json(cse)
  }else{
    res.setHeader('Allos', ['GET'])
    res.status(405).json({message: `Method ${req.method} is not allowed`})
  }
}
