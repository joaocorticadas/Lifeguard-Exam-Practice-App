import {question_list} from "./question_list.js"
import { useState } from 'react';
import results from "../screens/results.js";

export let questionNo;

export let selectedQuestions = [];

export const totalQuestions = 20;

export function runCode  () {
    let k = 0
    while (k < totalQuestions)
    {
        let index = Math.floor(Math.random() * 43);
        if (selectedQuestions.indexOf(question_list[index]) == -1)
        {
            selectedQuestions.push(question_list[index]);
            k++;
        }
    };
    for (let i = 0; i < selectedQuestions.length; i++)
    {
        resultsArray.push(selectedQuestions[i]["correct"])
    }
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