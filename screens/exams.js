import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import {runCode, reset} from "../questions/questions_script.js"


const DefaultBtn = (props) => 
{
    const btnstyle = StyleSheet.create({
        button: {
            backgroundColor: "#FFFFFF",
            borderRadius: 10,
            borderColor: "#EC5C5F",
            borderWidth: 2, 
            flex: 0.05,
            paddingTop: 10,
            paddingBottom: 5,
            flexDirection: "row",
            justifyContent: "center"
        }
    })
    return (
        <TouchableOpacity
            style={btnstyle.button}
            onPress= {props.onPress}
        >
            <Text style={btnstyle.text}>{props.btn}</Text>
        </TouchableOpacity>
    )
}



const exams = ({navigation}) => {
    return (
        <View style={{flexDirection: "column", flex: 1}}>
            <View style={styles.top}>
                <Image source={require("../assets/second.png")} resizeMode="cover" style={styles.image}></Image>
                <Text style={styles.text_top}>Exames</Text>
            </View>
            <View style={styles.categories}>
                <Text style={styles.textHeader}>Sobre a Prova Escrita</Text>
                <Text style={styles.textContent}>"O exame escrito contém cerca de 20 perguntas  de resposta de escolha múltipla, no qual podes errar no máximo 3 para passares nesta prova."</Text>
                <DefaultBtn btn="Começar" onPress={() => 
                    {
                        reset();
                        runCode();
                        navigation.navigate("Questao");
                    }
        
                    }/>
            </View>
        </View>
    )
}

export default exams

const styles = StyleSheet.create({
    top : {
        flex: 0.31,
        width: "100%",
        height: "100%",
        position: "relative",
    },
    image: {
        justifyContent: "center",
        width: "100%",
        height: "100%",
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    text_top: {
        position: "absolute",
        top: "75%",
        left: "5%",
        fontFamily: "Quicksand_700Bold",
        fontSize: 36,
        fontWeight: "600",
        color: "#FFFFFF"
    },
    content: 
    {
        flex: 0.7,
        width: "100%",
        height: "100%",
        position: "relative",
        paddingLeft: 20,
        paddingRight: 20
    },
    categories:
    {
        backgroundColor: "#FFFFFF",
        padding: 20,
        paddingTop: 15,
        paddingBottom: 15,
        margin: 20,
        borderRadius: 10,
        marginTop: 17,
        flex: 0.65,
        flexDirection: "column",
        //width
    },
    textHeader: {
        color: "#000000",
        fontFamily: "Quicksand_700Bold",
        fontSize: 24,
        flex: 0.1,
        top: 5
    },
    textContent: 
    {
        color: "#000000",
        fontFamily: "Quicksand_400Regular",
        fontSize: 15,
        textAlign: "justify",
        flex: 0.8,
        top: 5
    }
})
