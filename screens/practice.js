import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native'
import { reset, runCode } from '../questions/practice_script';


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
        }
    })
    return (
    <View style={catst.shape}>
      <Text style={catst.text}>{props.content}</Text>
      <DefaultBtn btn={props.bnt} onPress={props.onPress}/>
      </View>
    );
}
const DefaultBtn = (props) => 
{
    const btnstyle = StyleSheet.create({
        text: {
            color: "#000000",
            fontFamily: "Quicksand_700Bold",
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



const practice = ({navigation}) => {
    //On start function 
    function start(categoryNo)
    {
        reset();
        runCode(categoryNo)
        navigation.navigate("Praticar Questao");
    }

    return (
        <View style={{flexDirection: "column", flex: 1}}>
            <View style={styles.top}>
                <Image source={require("../assets/first.png")} resizeMode="cover" style={styles.image}></Image>
                <Text style={styles.text_top}>Praticar</Text>
            </View>
            <ScrollView style={styles.content}>
                <Categories content="1. O ISN" bnt="Praticar" onPress={() => start(1)}/>
                <Categories content="2. Ser Nadador Salvador" bnt="Praticar" onPress={() => start(2)}/>
                <Categories content="3. O Afogamento" bnt="Praticar" onPress={() => start(3)}/>
                <Categories content="4. Praias" bnt="Praticar" onPress={() => start(4)}/>
                <Categories content="5. Piscinas" bnt="Praticar" onPress={() => start(5)}/>
                <Categories content="6. O Salvamento" bnt="Praticar" onPress={() => start(6)}/>
                <Categories content="7. Socorro ao Náufrago" bnt="Praticar" onPress={() => start(7)}/>
                <Categories content="8. Acidentes" bnt="Praticar" onPress={() => start(8)}/>
            </ScrollView>
        </View>
    )
}

export default practice

const styles = StyleSheet.create({
    top : {
        flex: 0.4,
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
        flex: 0.6,
        width: "100%",
        height: "100%",
        position: "relative",
        paddingLeft: 20,
        paddingRight: 20
    }
})
