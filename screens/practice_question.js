import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native'
import { selectedQuestions, ansPush, answers, totalQuestions, totalCorrect, totalWrong, isRight, resultsArray, questionNo} from '../questions/practice_script'
import Icon from 'react-native-vector-icons/Feather'

let state = false;

const practice_question = ({navigation}) => {
    
    //Creating state for variable current 
    let [current , setCurrent] = useState(1);

    //Creating states for colour buttons
    let [colour1, setColour1] = useState("#FFFFFF");
    let [colour2, setColour2] = useState("#FFFFFF");
    let [colour3, setColour3] = useState("#FFFFFF");
    let [colour4, setColour4] = useState("#FFFFFF");
    
    //Set initial Questions and state support (hook) for current 
    const initialQuestion = {
        question: selectedQuestions[current  - 1]["questionText"],
        ans1 : selectedQuestions[current  - 1]["questionAnswers"]["ans1"],
        ans2 : selectedQuestions[current  - 1]["questionAnswers"]["ans2"],
        ans3 : selectedQuestions[current  - 1]["questionAnswers"]["ans3"],
        ans4 : selectedQuestions[current  - 1]["questionAnswers"]["ans4"]
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

    const totalLen = (Object.keys(selectedQuestions).length);
    //console.log(totalLen);

    const next = () => 
    {
        state = false;
        //console.log(current );
        if (current - 1 == totalLen - 1)
        {
            navigation.navigate("Praticar");
            //setCurrent(current  = current );
            return 0;
        }
        setCurrent(current  = current  + 1);
        if (answers[current  - 1] == false)  
        {
            resetBtns();
            return 0;
        } else if (answers[current  - 1] == "ans1") {
            press(1);
            return 0;
        } else if (answers[current  - 1] == "ans2") {
            press(2);
            return 0;
        } else if (answers[current  - 1] == "ans3") {
            press(3);
            return 0;
        } else if (answers[current  - 1] == "ans4") {
            press(4);
            return 0;
        }
        return 0;
    }

    const previous = () => 
    {
        setCurrent(current  = current  - 1);
        //console.log(current );
        if (answers[current  - 1] == false)  
        {
            //console.log("entrei");
            resetBtns();
            return 0;
        } else if (answers[current  - 1] == "ans1") {
            press(1);
            return 0;
        } else if (answers[current  - 1] == "ans2") {
            press(2);
            return 0;
        } else if (answers[current  - 1] == "ans3") {
            press(3);
            return 0;
        } else if (answers[current  - 1] == "ans4") {
            press(4);
            return 0;
        }
        return 0;
    }

    const resetBtns = () =>
    {
        setColour1("white");
        setColour2("white");
        setColour3("white");
        setColour4("white");
    }

    const press = (no) =>
    {
        if (state == false)
        {
        if ((no == 1) && (resultsArray[current - 1] == "ans1")) {
            setColour1("#51CC89");
            setColour2("white");
            setColour3("white");
            setColour4("white");
            ansPush(current  - 1, "ans1");
        } if (no == 2 && (resultsArray[current - 1] == "ans2")) {
            setColour1("white");
            setColour2("#51CC89");
            setColour3("white");
            setColour4("white");
            ansPush(current  - 1, "ans2");
        } if (no == 3 && (resultsArray[current - 1] == "ans3")) {
            setColour1("white");
            setColour2("white");
            setColour3("#51CC89");
            setColour4("white");
            ansPush(current  - 1, "ans3");
        }   if (no == 4 && (resultsArray[current - 1] == "ans4")) {
            setColour1("white");
            setColour2("white");
            setColour3("white");
            setColour4("#51CC89");
            ansPush(current  - 1, "ans4");
        } else {
            if (resultsArray[current - 1] == "ans1")
                setColour1("#51CC89");
            if (resultsArray[current - 1] == "ans2")
                setColour2("#51CC89");
            if (resultsArray[current - 1] == "ans3")
                setColour3("#51CC89");
            if (resultsArray[current - 1] == "ans4")
                setColour4("#51CC89");
            if ((no == 1) && (resultsArray[current - 1] != "ans1"))
                setColour1("#EC5C5F");
            if ((no == 2) && (resultsArray[current - 1] != "ans2"))
                setColour2("#EC5C5F");
            if ((no == 3) && (resultsArray[current - 1] != "ans3"))
                setColour3("#EC5C5F");
            if ((no == 4) && (resultsArray[current - 1] != "ans4"))
                setColour4("#EC5C5F");
        }
    }
        state = true;
        return no;
    }

    //Creating condition for button hide and show at question 1 and question 30
    let btnShow1 = 1;
    if (current  - 1 == 0)
    {
        btnShow1 = 0;
    }
    else 
        btnShow1 = 0.5;

    let btnShow2 = 0.5;
    let btnEndText = "Próxima";
    if (current  - 1 == totalLen - 1)
    {
        btnEndText = "Regressar ao Início"

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

    const [disabled,setDisabled]=useState(false)

    //Screen Render
    return (
        <View style={{flexDirection: "column", flex: 1}}>
            <View style={styles.top}>
                <Text style={styles.text_top}>Praticar</Text>
                <Icon style={styles.topexit} name='x' onPress={() => navigation.navigate("Praticar")}/>
            </View>
            <View style={styles.question}>
                <Text style={styles.textHeader}>Questão {[current ]}</Text>
                <Text style={styles.textContent}>{initialQuestion.question}</Text>
            </View>
            <ScrollView style={styles.answer_area}>
                <DefaultBtn btn={initialQuestion.ans1} onPress={() =>{ press(1)}} style={[styles.button, {backgroundColor: colour1} ]}/>
                <DefaultBtn btn={initialQuestion.ans2} onPress={() => press(2)} style={[styles.button, {backgroundColor: colour2} ]}/>
                <DefaultBtn btn={initialQuestion.ans3} onPress={() => press(3)} style={[styles.button, {backgroundColor: colour3} ]}/>
                <DefaultBtn btn={initialQuestion.ans4} onPress={() => press(4)} style={[styles.button, {backgroundColor: colour4} ]}/>
            </ScrollView>
            <View style={styles.bottomBarQuestion}>
                <BottomBtn btn={btnEndText} onPress={next} style={{flex :1}}/>
            </View>
        </View>
    )
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

export default practice_question

const styles = StyleSheet.create({
    top : {
        flex: 0.27,
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
        flex: 0.4,
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
    topexit: {
        top: 15,
        left: "85%",
        color: "white",
        fontSize: 40,
    }
})
