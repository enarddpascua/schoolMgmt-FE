// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const {courses} = require('./course_mock.json')

export default function handler(req, res) {
  if(req.method === 'GET'){
    res.status(200).json(courses)
  }else{
    res.setHeader('Allos', ['GET'])
    res.status(405).json({message: `Method ${req.method} is not allowed`})
  }
}
