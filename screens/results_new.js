import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native'
import { selectedQuestions, ansPush, answers, totalQuestions, totalCorrect, totalWrong, isRight, resultsArray, moveQuestion} from '../questions/questions_script'
import Icon from 'react-native-vector-icons/Feather'

let answerColour;

const Categories = (props) => {
    const catst = StyleSheet.create({
        text: {
            color: "#000000",
            fontFamily: "Quicksand_500Medium",
            fontSize: 16,
            flex: 0.7,
            top: 5
        },
        shape: {
            backgroundColor: "#FFFFFF",
            padding: 20,
            paddingTop: 15,
            paddingBottom: 15,
            borderRadius: 10,
            marginTop: 17,
            flex: 1,
            flexDirection: "row"
        },
        textBellow :
        {
            fontFamily: "Quicksand_400Regular",
            fontSize: 14,
            top: 5,
        }
    })
    return (
    <View style={catst.shape}>
        <View style={{flexDirection: "column", flex: 0.7}}>
            <Text style={catst.text}>{props.content}</Text>
            <Text style={[catst.textBellow]}>{props.answerIsCorrect}</Text>
        </View>
        <DefaultBtn btn={props.bnt} onPress={props.onPress}/>
      </View>
    );
}

const DefaultBtn = (props) => 
{
    const btnstyle = StyleSheet.create({
        text: {
            color: "#000000",
            fontFamily: "Quicksand_500Medium",
            fontSize: 14,
            textAlign: "center",
        },
        button: {
            backgroundColor: "#FFFFFF",
            borderRadius: 10,
            borderColor: "#EC5C5F",
            borderWidth: 2, 
            flex: 0.3,
            paddingTop: 5,
            paddingBottom: 5
        }
    })
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={btnstyle.button}
        >
            <Text style={btnstyle.text}>{props.btn}</Text>
        </TouchableOpacity>
    )
}

const results_new = ({navigation}) => {
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
            navigation.navigate("Resultados");
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

    //Is right 
    function isRight (questionNumber)
    {
        let index = questionNumber - 1;
        if (resultsArray[index] == answers[index])
        {
            answerColour = "green";
            return "Correta"
        }
        else 
        {
            answerColour = "red";
            return "Errada"
        }
    }   

    //Screen Render
    return (
        <View style={{flexDirection: "column", flex: 1}}>
            <View style={styles.top}>
                <Text style={styles.text_top}>Resultados</Text>
                <Icon style={styles.topexit} name='x' onPress={() => navigation.navigate("Praticar")}/>
            </View>
            <View style={styles.question}>
                <View style={styles.square}>
                    <View style={[styles.square_final, {backgroundColor: backColor}]}>
                        <Image source={imageSrc} style={styles.image} resizeMode="contain"></Image>
                    </View>
                </View>
                <View style={styles.result}>
                    <Text style={styles.textHeader}>{textDisplay}</Text>
                    <Text style={styles.textContent}>{totalPointsWrong} Erradas</Text>
                </View>
            </View>
            <ScrollView style={styles.answer_area}>
                <Text style={styles.textPerguntas}>Perguntas</Text>
                <Categories content="Questão 1" bnt="Ver Resposta" answerIsCorrect={isRight(1)} onPress={() => {navigation.navigate("rightOrWrong"); moveQuestion(1)}}/>
                <Categories content="Questão 2" bnt="Ver Resposta" answerIsCorrect={isRight(2)} onPress={() => {navigation.navigate("rightOrWrong"); moveQuestion(2)}}/>
                <Categories content="Questão 3" bnt="Ver Resposta" answerIsCorrect={isRight(3)} onPress={() => {navigation.navigate("rightOrWrong"); moveQuestion(3)}}/>
                <Categories content="Questão 4" bnt="Ver Resposta" answerIsCorrect={isRight(4)} onPress={() => {navigation.navigate("rightOrWrong"); moveQuestion(4)}}/>
                <Categories content="Questão 5" bnt="Ver Resposta" answerIsCorrect={isRight(5)} onPress={() => {navigation.navigate("rightOrWrong"); moveQuestion(5)}}/>
                <Categories content="Questão 6" bnt="Ver Resposta" answerIsCorrect={isRight(6)} onPress={() => {navigation.navigate("rightOrWrong"); moveQuestion(6)}}/>
                <Categories content="Questão 7" bnt="Ver Resoosta" answerIsCorrect={isRight(7)} onPress={() => {navigation.navigate("rightOrWrong"); moveQuestion(7)}}/>
                <Categories content="Questão 8" bnt="Ver Resposta" answerIsCorrect={isRight(8)} onPress={() => {navigation.navigate("rightOrWrong"); moveQuestion(8)}}/>
                <Categories content="Questão 9" bnt="Ver Resoosta" answerIsCorrect={isRight(9)} onPress={() => {navigation.navigate("rightOrWrong"); moveQuestion(9)}}/>
                <Categories content="Questão 10" bnt="Ver Resposta" answerIsCorrect={isRight(10)} onPress={() => {navigation.navigate("rightOrWrong"); moveQuestion(10)}}/>
                <Categories content="Questão 11" bnt="Ver Resposta" answerIsCorrect={isRight(11)} onPress={() => {navigation.navigate("rightOrWrong"); moveQuestion(11)}}/>
                <Categories content="Questão 12" bnt="Ver Resposta" answerIsCorrect={isRight(12)} onPress={() => {navigation.navigate("rightOrWrong"); moveQuestion(12)}}/>
                <Categories content="Questão 13" bnt="Ver Resposta" answerIsCorrect={isRight(13)} onPress={() => {navigation.navigate("rightOrWrong"); moveQuestion(13)}}/>
                <Categories content="Questão 14" bnt="Ver Resposta" answerIsCorrect={isRight(14)} onPress={() => {navigation.navigate("rightOrWrong"); moveQuestion(14)}}/>
                <Categories content="Questão 15" bnt="Ver Resposta" answerIsCorrect={isRight(15)} onPress={() => {navigation.navigate("rightOrWrong"); moveQuestion(15)}}/>
                <Categories content="Questão 16" bnt="Ver Resposta" answerIsCorrect={isRight(16)} onPress={() => {navigation.navigate("rightOrWrong"); moveQuestion(16)}}/>
                <Categories content="Questão 17" bnt="Ver Resoosta" answerIsCorrect={isRight(17)} onPress={() => {navigation.navigate("rightOrWrong"); moveQuestion(17)}}/>
                <Categories content="Questão 18" bnt="Ver Resposta" answerIsCorrect={isRight(18)} onPress={() => {navigation.navigate("rightOrWrong"); moveQuestion(18)}}/>
                <Categories content="Questão 19" bnt="Ver Resoosta" answerIsCorrect={isRight(19)} onPress={() => {navigation.navigate("rightOrWrong"); moveQuestion(19)}}/>
                <Categories content="Questão 20" bnt="Ver Resposta" answerIsCorrect={isRight(20)} onPress={() => {navigation.navigate("rightOrWrong"); moveQuestion(20)}}/>
            </ScrollView>
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

export default results_new

const styles = StyleSheet.create({
    top : {
        flex: 0.19,
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
        flex: 0.1,
        flexDirection: "row",
    },
    answer_area:
    {
        paddingHorizontal:0,
        margin: 20,
        borderRadius: 10,
        marginTop: 17,
        flex: 0.60,
        flexDirection: "column",
        //backgroundColor: "white"
    },
    textHeader: {
        color: "#000000",
        fontFamily: "Quicksand_700Bold",
        fontSize: 24,
        right: -35
    },
    textContent: 
    {
        color: "#000000",
        fontFamily: "Quicksand_400Regular",
        fontSize: 15,
        right: -35
    },
    bottomBarQuestion:
    {
        flex: 0.18,
        backgroundColor: "white",
        flexDirection: "row",
        borderTopWidth: 1,
    },
    button: {
        borderBottomWidth: 1,
        width: "100%",
        flex:1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: "center",
    },
    square:{
        flex: 0.2,
        width: "100%",
        height: "100%",
    },
    results: {
        flex: 0.6,
        width: "100%",
        height: "100%",
    },
    square_final : {
        width: "100%",
        height: "100%",
        aspectRatio : 1
    },
    image:
    {
        width: "100%",
        height: "100%",
        transform:[{scale: 0.7}]
    },
    textPerguntas: 
    {
        color: "#000000",
        fontFamily: "Quicksand_700Bold",
        fontSize: 15,
    },
    topexit: {
        top: 15,
        left: "85%",
        color: "white",
        fontSize: 40,
    }
})
