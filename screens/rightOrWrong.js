import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native'
import { selectedQuestions, ansPush, answers, totalQuestions, questionNo, resultsArray} from '../questions/questions_script'


const rightOrWrong = ({navigation}) => {
    //Creating state for variable current
    let [current, setCurrent] = useState(1);

    //Creating states for colour buttons
    let [colour1, setColour1] = useState("#FFFFFF");
    let [colour2, setColour2] = useState("#FFFFFF");
    let [colour3, setColour3] = useState("#FFFFFF");
    let [colour4, setColour4] = useState("#FFFFFF");
    
    //console.log(selectedQuestions);
    //Set initial Questions and state support (hook) for current
    const initialQuestion = {
        question: selectedQuestions[questionNo]["questionText"],
        ans1 : selectedQuestions[questionNo]["questionAnswers"]["ans1"],
        ans2 : selectedQuestions[questionNo]["questionAnswers"]["ans2"],
        ans3 : selectedQuestions[questionNo]["questionAnswers"]["ans3"],
        ans4 : selectedQuestions[questionNo]["questionAnswers"]["ans4"]
    };


    const DefaultBtn = (props) => 
    { 
    return (
        <TouchableOpacity
            style ={props.style}
            onPress = {props.onPress}
        >
            <Text>{props.btn}</Text>
        </TouchableOpacity>
        )
    };



    const next = () => 
    {
        //console.log(current);
        if (current - 1 == 19)
        {
            navigation.navigate("Resultados New");
            setCurrent(current = current);
            return 0;
        }
        setCurrent(current = current + 1);
        if (answers[current - 1] == false)  
        {
            resetBtns();
            return 0;
        } else if (answers[current - 1] == "ans1") {
            press(1);
            return 0;
        } else if (answers[current - 1] == "ans2") {
            press(2);
            return 0;
        } else if (answers[current - 1] == "ans3") {
            press(3);
            return 0;
        } else if (answers[current - 1] == "ans4") {
            press(4);
            return 0;
        }
        return 0;
    }

    const resetBtns = () =>
    {
        colour1 = "white";
        colour2 = "white";
        colour3 = "white";
        colour4 = "white";
    }



    function currentNumAns ()
    {
        let total = 0;

        for (let i = 0; i < totalQuestions; i++)
        {
            if(answers[i] != false)
            {
            total++;
            }
        }
        return total();
    }

    function setPut ()
    {
            if (resultsArray[questionNo] == "ans1")
                colour1 = ("#51CC89");
            else if (resultsArray[questionNo] == "ans2")
                colour2 = ("#51CC89");
            else if (resultsArray[questionNo] == "ans3")
                colour3 = ("#51CC89");
            else if (resultsArray[questionNo] == "ans4")
                colour4 = ("#51CC89");
        if (answers[questionNo] != resultsArray[questionNo] && answers[questionNo] != "false") 
        {
            if (answers[questionNo] == "ans1")
                colour1 = ("#EC5C5F");
            if (answers[questionNo] == "ans2")
                colour1 = ("#EC5C5F");
            if (answers[questionNo] == "ans3")
                colour1 = ("#EC5C5F");
            if (answers[questionNo] == "ans4")
                colour1 = ("#EC5C5F");
        }
        if (answers[questionNo] != resultsArray[questionNo]) 
        {
            if (answers[questionNo] == "ans1")
            {
                colour1 = ("#EC5C5F");
                return 0;
            }
            if (answers[questionNo] == "ans2")
            {
                colour1 = ("#EC5C5F");
                return 0;
            }
            if (answers[questionNo] == "ans3")
            {
                colour1 = ("#EC5C5F");
                return 0;
            }
            if (answers[questionNo] == "ans4")
            {
                colour1 = ("#EC5C5F");
                return 0;
            }
        }
    }
    setPut()


    //console.log(answers);
    //Screen Render
    return (
        <View style={{flexDirection: "column", flex: 1}}>
            <View style={styles.top}>
                <Text style={styles.text_top}>Resultado</Text>
            </View>
            <View style={styles.question}>
                <Text style={styles.textHeader}>Questão {[questionNo + 1]}</Text>
                <Text style={styles.textContent}>{initialQuestion.question}</Text>
            </View>
            <ScrollView style={styles.answer_area}>
                <DefaultBtn btn={initialQuestion.ans1}  style={[styles.button, {backgroundColor: colour1} ]}/>
                <DefaultBtn btn={initialQuestion.ans2} style={[styles.button, {backgroundColor: colour2} ]}/>
                <DefaultBtn btn={initialQuestion.ans3} style={[styles.button, {backgroundColor: colour3} ]}/>
                <DefaultBtn btn={initialQuestion.ans4} style={[styles.button, {backgroundColor: colour4} ]}/>
            </ScrollView>
            <View style={styles.bottomBarQuestion}>
                <BottomBtn btn={"Regressar"} onPress={()=> navigation.navigate("Resultados New")} style={{flex : 1}}/>
            </View>
        </View>
    )
    resetBtns();
}



const BottomBtn = (props) => 
{
    const btnstyle = StyleSheet.create({
        button: {
            width: "100%",
            borderRightWidth: 1,
            borderColor: "grey",
        },
        text:
        {
            paddingTop: 20,
            textAlign: 'center',
            color: "grey"
        }
    })
    return (
        <TouchableOpacity
            style={[btnstyle.button, props.style]}
            onPress= {props.onPress}
        >
            <Text style={btnstyle.text}>{props.btn}</Text>
        </TouchableOpacity>
    )
};

export default rightOrWrong;

const styles = StyleSheet.create({
    top : {
        flex: 0.25,
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#AABEE2",
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    text_top: {
        position: "absolute",
        top: "50%",
        left: "5%",
        fontFamily: "Quicksand_700Bold",
        fontSize: 36,
        fontWeight: "600",
        color: "#FFFFFF"
    },
    question:
    {
        backgroundColor: "#FFFFFF",
        padding: 20,
        paddingTop: 15,
        paddingBottom: 15,
        margin: 20,
        borderRadius: 10,
        marginTop: 17,
        flex: 0.3,
        flexDirection: "column",
    },
    answer_area:
    {
        paddingHorizontal:0,
        margin: 20,
        borderRadius: 10,
        marginTop: 17,
        flex: 0.60,
        flexDirection: "column",
        //borderWidth: 1,
    },
    textHeader: {
        color: "#000000",
        fontFamily: "Quicksand_700Bold",
        fontSize: 24,
        flex: 0.3,
    },
    textContent: 
    {
        color: "#000000",
        fontFamily: "Quicksand_400Regular",
        fontSize: 15,
        textAlign: "justify",
        flex: 0.7,
        top: 5
    },
    bottomBarQuestion:
    {
        flex: 0.18,
        backgroundColor: "white",
        flexDirection: "row",
        borderTopWidth: 1,
    },
    button: {
        borderRadius: 10,
        borderWidth: 1, 
        width: "100%",
        flex:1,
        marginBottom: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: "center",
    },
})
