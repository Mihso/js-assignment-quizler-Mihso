import fs from 'fs'
import { addAnswer } from './answers';

let uniqueQuiz = 1;
let uniqueQuestion = 1;
let database = [];

export const chooseRandom = (array1, numItems = 0) => {

  if(array1.length <= 1 ){
    return array1;
  }

  if(numItems > array1.length || numItems < 1){
    numItems = 1 + Math.floor(Math.random() * array1.length);
  }

  let finalArray = [];

  for(let i = 0; i < numItems; i++){
    finalArray.push(array1[Math.floor(Math.random() * array1.length)]);
  }
  return finalArray;
}

export const createPrompt = (items = {numQuestions: 1, numChoices: 2}) => {
  let finalArray = [];
  if(items == null){
    return finalArray;
  }
  items.numQuestions = items.numQuestions > 1 ? items.numQuestions: 1;
  items.numChoices = items.numChoices > 2 ? items.numChoices : 2;
  for( let i = 1; i <= items.numQuestions; i++){
    finalArray.push({type: "input", name: `question-${i}`, message: `Enter question ${i}`});
    for(let j = 1; j <= items.numChoices; j++){
      finalArray.push({type: "input", name: `question-${i}-choice-${j}`, message: `Enter answer choice ${j} for question ${i}`})
    };
  }
  return finalArray;

}

export const createQuestions = (item = {}) => {
  let finalArray = [];
  let answers = [];
    for(let i in item){
      if(!i.includes('choice'))
      {
        finalArray.push({type: 'list', name: `${i}`, message: `${item[i]}`, choices: []});
      }
    }

    for(let i in item){
      for(let f in finalArray){
        let quest = finalArray[f];
        if(i.includes(quest.name) && i.includes('choice')){
           finalArray[f].choices.push(item[i]);
        }
      }
    }

    for(let f in finalArray){
      let choicer = finalArray[f].choices; 
      answers.push({question: uniqueQuestion, answer: `${choicer[Math.floor(Math.random() * choicer.length)]}`});
      database.push({id: uniqueQuestion, question: finalArray[f]});
      uniqueQuestion +=1;
    }

    addAnswer( uniqueQuiz, answers)
    uniqueQuiz += 1
  return finalArray;
}

export const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
  })

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err =>
      err ? reject(err) : resolve('File saved successfully')
    )
  })
