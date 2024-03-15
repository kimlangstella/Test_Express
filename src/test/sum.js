// function sum(a, b) {
//     return a + b;
//   }
// module.exports = sum;
const express=require('express');
const sum=express();
sum.get('/',(req,res)=>{
  res.status(200).send("hello world!")
})
module.exports=sum;
  