// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const {courses} = require('./course_mock.json')

export default function handler(req, res) {
  if(req.method === 'GET' || req.method === 'POST'){
    res.status(200).json(courses)
  }else{
    res.setHeader('Allow', ['GET'])
    res.status(405).json({message: `Method ${req.method} is not allowed`})
  }
}
