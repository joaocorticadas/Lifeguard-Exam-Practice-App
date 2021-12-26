import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native'
import { selectedQuestions, ansPush, answers, totalQuestions, totalCorrect, totalWrong, isRight, resultsArray, questionNo} from '../questions/questions_script'
import Icon from 'react-native-vector-icons/Feather'

const exam_question = ({navigation}) => {
    
    //Creating state for variable current
    let [current, setCurrent] = useState(1);

    //Creating states for colour buttons
    let [colour1, setColour1] = useState("#FFFFFF");
    let [colour2, setColour2] = useState("#FFFFFF");
    let [colour3, setColour3] = useState("#FFFFFF");
    let [colour4, setColour4] = useState("#FFFFFF");
    
    //Set initial Questions and state support (hook) for current
    const initialQuestion = {
        question: selectedQuestions[current - 1]["questionText"],
        ans1 : selectedQuestions[current - 1]["questionAnswers"]["ans1"],
        ans2 : selectedQuestions[current - 1]["questionAnswers"]["ans2"],
        ans3 : selectedQuestions[current - 1]["questionAnswers"]["ans3"],
        ans4 : selectedQuestions[current - 1]["questionAnswers"]["ans4"]
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

    const previous = () => 
    {
        setCurrent(current = current - 1);
        //console.log(current);
        if (answers[current - 1] == false)  
        {
            //console.log("entrei");
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
        setColour1("white");
        setColour2("white");
        setColour3("white");
        setColour4("white");
    }

    const press = (no) =>
    {
        if (no == 1)
        {
            setColour1("#AABEE2");
            setColour2("white");
            setColour3("white");
            setColour4("white");
            ansPush(current - 1, "ans1");
        } else if (no == 2) {
            setColour1("white");
            setColour2("#AABEE2");
            setColour3("white");
            setColour4("white");
            ansPush(current - 1, "ans2");
        } else if (no == 3) {
            setColour1("white");
            setColour2("white");
            setColour3("#AABEE2");
            setColour4("white");
            ansPush(current - 1, "ans3");
        }   else if (no == 4) {
            setColour1("white");
            setColour2("white");
            setColour3("white");
            setColour4("#AABEE2");
            ansPush(current - 1, "ans4");
        }
        return no;
    }

    //Creating condition for button hide and show at question 1 and question 30
    let btnShow1 = 1;
    if (current - 1 == 0)
    {
        btnShow1 = 0;
    }
    else 
        btnShow1 = 0.5;

    let btnShow2 = 0.5;
    let btnEndText = "Próxima";
    if (current - 1 == 19)
    {
        btnEndText = "Ver Resultados"

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


    //Screen Render
    return (
        <View style={{flexDirection: "column", flex: 1}}>
            <View style={styles.top}>
                <Text style={styles.text_top}>Exame</Text>
                <Icon style={styles.topexit} name='x' onPress={() => navigation.navigate("Exames")}/>
            </View>
            <View style={styles.question}>
                <Text style={styles.textHeader}>Questão {[current]}</Text>
                <Text style={styles.textContent}>{initialQuestion.question}</Text>
            </View>
            <ScrollView style={styles.answer_area}>
                <DefaultBtn btn={initialQuestion.ans1} onPress={() =>{ press(1)}} style={[styles.button, {backgroundColor: colour1} ]}/>
                <DefaultBtn btn={initialQuestion.ans2} onPress={() => press(2)} style={[styles.button, {backgroundColor: colour2} ]}/>
                <DefaultBtn btn={initialQuestion.ans3} onPress={() => press(3)} style={[styles.button, {backgroundColor: colour3} ]}/>
                <DefaultBtn btn={initialQuestion.ans4} onPress={() => press(4)} style={[styles.button, {backgroundColor: colour4} ]}/>
            </ScrollView>
            <View style={styles.bottomBarQuestion}>
                <BottomBtn btn="Anterior" onPress={previous} style={{flex: btnShow2}}/>
                <BottomBtn btn={btnEndText} onPress={next} style={{flex : btnShow1}}/>
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

export default exam_question

const styles = StyleSheet.create({
    top : {
        flex: 0.27,
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#EC5C5F",
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
