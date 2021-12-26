import {question_list} from "./question_list.js"
import { useState } from 'react';
import results from "../screens/results.js";

export let questionNo;

export let selectedQuestions = [];

export const totalQuestions = 20;


//Shuffle Function
const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
}

//Run on start function 
export function runCode  (categoryNo) {
    const len = (Object.keys(question_list).length)
    for (let i = 0; i < len ; i++)
    {
        if (categoryNo == question_list[i]["category"])
            selectedQuestions.push(question_list[i]);
    };
    shuffleArray(selectedQuestions);
    for (let i = 0; i < selectedQuestions.length; i++)
    {
        resultsArray.push(selectedQuestions[i]["correct"])
    }
    //console.log(selectedQuestions);
};


export function reset()
{
    selectedQuestions = [];
    resultsArray = [];
    answers = [];
    for (let i = 0; i < totalQuestions; i++)
    {
    answers.push(false);
    };
}


//Array with results for selected questions
export let resultsArray = [];


//Push user answers to array
export let answers = [];



export const ansPush = (position, arg) => {
    answers[position] = arg;
    return 0;
};



export function totalCorrect ()
{
    let totalPoints = 0;

    for(let i = 0; i < resultsArray.length; i++)
    {
        if(answers[i] == resultsArray[i])
            totalPoints++;
    }
    return totalPoints;
}

export function totalWrong ()
{
    let totalPoints = totalCorrect();
    return (totalQuestions - totalPoints);
}


export function moveQuestion (question)
{
    questionNo = question - 1;
}