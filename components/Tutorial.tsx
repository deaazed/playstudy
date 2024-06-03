import { Pressable, StyleSheet, Text, View} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { useState} from 'react';
import AnimatedDot from './AnimatedDot';
import DragIndicator from './DragIndicator';
import React from 'react';

export default function Tutorial(props : any) {
    const [index, setIndex] = useState<number>(0);
    const tutorial = [
        "Apprenez l'anglais de manière interactive et pratique en utilisant directement vos mains.",
        "Apprenez l'anglais via des visioconférences avec des locuteurs natifs de la langue.",
        "Découvrez des niveaux et gagnez des badges grâce à une expérience interactive et pratique."
    ]

    const handleClickNextBtn = () : void => {
        var nextIndex = index < tutorial.length - 1 ? index + 1 : index;
        if(nextIndex == index) props.onEnd();
        else setIndex(nextIndex);
    }

    const handleClickPrevBtn = () : void => {
        var nextIndex = index > 0 ? index - 1 : index;
        setIndex(nextIndex);
    }

    return (
    <View style={[styles.container, props.style]}>
        <DragIndicator />
        <Text style={styles.title}>Apprenez l’anglais tout en s’amusant !</Text>
        <Text style={styles.subTitle}>{tutorial[index]}</Text>
        <AnimatedDot number={tutorial.length} active={index} style={{ bottom: 150 }} />
        <View style={styles.containerBtns}>
            { index > 0 && 
                <Pressable style={styles.buttonPrev} onPress={() => handleClickPrevBtn()}>
                    <FontAwesome style={{ color: '#fff', marginHorizontal: 10}} name="chevron-left" />
                    <Text style={{ color: '#fff'}}>Précedent</Text>
                </Pressable>
            }
            <Pressable style={styles.buttonNext} onPress={() => handleClickNextBtn()}>
                <Text style={{color: '#3444F1'}} >Suivant</Text>
                <FontAwesome style={{ color: '#3444F1', marginHorizontal: 10 }} name="chevron-right" />
            </Pressable>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      borderTopLeftRadius: 45,
      borderTopRightRadius: 45,
      paddingTop: 50,
      width: '100%',
      backgroundColor: '#3444F1'
    },
    title: {
        color: '#fff',
        padding: 20,
        fontSize: 30,
        textAlign:'center',
        fontWeight:'bold'
    },
    subTitle: {
        color: '#fff',
        width:266,fontSize: 18,
        textAlign:'center'
    },
    buttonNext: {
        borderRadius: 26.5, 
        backgroundColor: '#fff',
        width: 134, 
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 'auto',
        display: 'flex',
        flexDirection: 'row'
    },
    buttonPrev: {
        borderRadius: 26.5,
        borderWidth: 2,
        borderColor: '#fff',
        width: 134, 
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 'auto',
        paddingRight: 20,
        display: 'flex',
        flexDirection: 'row'
    },
    containerBtns: {
        justifyContent: 'space-between',
        position: 'absolute',
        gap: 33,
        bottom: 50,
        display: 'flex',
        flexDirection: 'row'
    }
});