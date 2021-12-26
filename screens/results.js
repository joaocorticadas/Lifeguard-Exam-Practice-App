import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native'
import { selectedQuestions, ansPush, answers, resultsArray, totalCorrect, totalWrong, reset} from '../questions/questions_script'

const results = ({navigation}) => {
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

    //console.log(answers);

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
        setCurrent(current = current + 1);
        //console.log(current);
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

    //Result function
    const totalPoints = totalCorrect();
    const totalPointsWrong = totalWrong()
    let textDisplay;
    let backColor;
    let imageSrc = "../assets/correct";

    function resultDisplay ()
    {
        if (totalPointsWrong > 3)
        {
            textDisplay = "Não Passaste";
            backColor = "#EC5C5F";
            imageSrc = require("../assets/wrong.png");
        }
        else if (totalPointsWrong <= 3)
        {
            textDisplay = "Passaste";
            backColor = "#51CC89";
            imageSrc = require("../assets/correct.png");
        }
    }

    resultDisplay ();

    //Screen Render
    return (
        <View style={{flexDirection: "column", flex: 1, backgroundColor:backColor}}>
            <View style={styles.top}>
                <Text style={styles.text_top}>Resultados</Text>
            </View>
            <View style={styles.question}>
                    <View style={styles.imagebox}>
                        <Image source={imageSrc} style={styles.image} resizeMode="contain"></Image>
                    </View>
                    <View style={styles.resultbox}>
                        <Text style={styles.textHeader}>{textDisplay}</Text>
                        <Text style={styles.textContent}>{totalPointsWrong} Erradas</Text>
                    </View>
            </View>
            <View style={styles.answer_area}>
                <DefaultBtn btn={"Ver Respostas Erradas"} style={[styles.button, {backgroundColor: colour1} ]}/>
                <DefaultBtn btn={"Voltar ao Ínicio"} style={[styles.button, {backgroundColor: colour2}]} onPress={()=>{
                    navigation.navigate("Praticar");
                    reset;
                    }}/>
            </View>
        </View>
    )
}


export default results

const styles = StyleSheet.create({
    top : {
        flex: 0.18,
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "white",
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
        color: "black"
    },
    question:
    {
        //backgroundColor: "#FFFFFF",
        padding: 20,
        paddingTop: 15,
        paddingBottom: 15,
        margin: 20,
        borderRadius: 10,
        marginTop: 17,
        flex: 0.60,
        flexDirection: "column",
    },
    answer_area:
    {
        paddingHorizontal:0,
        margin: 20,
        borderRadius: 10,
        marginTop: 17,
        flex: 0.45,
        flexDirection: "column",
        //borderWidth: 1,
    },
    textHeader: {
        color: "white",
        fontFamily: "Quicksand_700Bold",
        fontSize: 48,
        textAlign: "center",
    },
    textContent: 
    {
        color: "white",
        fontFamily: "Quicksand_500Medium",
        fontSize: 24,
        textAlign: "center",
        top: 0
    },
    imagebox:
    {
        flex: 0.7
    },
    resultbox:
    {
        flex: 0.3
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
    image:
    {
        width: "100%",
        height: "100%",
        transform:[{scale: 0.7}]
    }
})
