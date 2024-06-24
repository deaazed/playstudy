import { StyleSheet, View as DefaultView, Text as DefaultText, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Coin, Guitar, Camembert, Art, Astronot } from '@/assets/images';
import Thematique from '@/components/ThematiqueView';
import { SafeAreaView } from 'react-native-safe-area-context';
import HistoriqueThematique from '@/components/HistoriqueThematique';
import DragIndicator from '@/components/DragIndicator';
import { router } from 'expo-router';
import { useUsers } from '@/components/UsersContext';
import React from 'react';
import { userLogout } from '@/models';
import { Modal } from '@/components/Modal';

export default function ExercisesSreen() {
  const { state, dispatch } = useUsers();
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleGoBack = () => {
    userLogout().then(() => {
      dispatch({ type: 'LOGOUT' });
      console.log(state);
      router.push('/');
    });
  }

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => { setModalVisible(true); return true });
    return () => backHandler.remove();
  }, []);

  return (
    <>
    <Modal text={
      {
        title: 'Déconnexion',
        content: `C'était un plaisir ${state.user.get('username')}! A une prochaine fois!`,
        validate: 'Quitter',
        cancel: 'Annuler'
      }
    } status={modalVisible} callback={[handleGoBack, () => setModalVisible(false)]} />
    <View style={styles.container}>
        <DefaultView style={styles.containerEarning}>
          
        <TouchableOpacity onPress={() => router.push('/game/store')}>
          <View lightColor='#fff' style={styles.earnings}><Coin style={{position: 'absolute', left: -10}}/><Text lightColor='#616161' style={{fontSize: 10}}>150+</Text></View>
          </TouchableOpacity>
        </DefaultView>
      
      <DefaultView style={styles.upperPart}>
        <DefaultView style={{ flex: 0.6, justifyContent: 'center', paddingLeft: 20}}>
          <DefaultText style={{flexWrap: "nowrap",color: "#fff", fontFamily: 'PopinsMedium', fontSize:24}}>Bonjour, { state.user?.get('username') }</DefaultText>
          <DefaultText style={{flexWrap: "wrap", color: "#fff", fontSize:13, fontFamily: 'PopinsRegular'}}>Quelle thématique aimerais-tu choisir ?</DefaultText>
        </DefaultView>
        <DefaultView style={{ justifyContent: 'center', flex: 0.4 }}><Astronot/></DefaultView>
      </DefaultView>
      <View lightColor='#fff' style={styles.containerBody}>
        <DragIndicator extraStyle={{ backgroundColor: 'rgba(38, 50, 56, 0.43)', alignSelf: 'center'}} />
        <Text style={{textAlign: 'center', fontSize: 20, marginTop: 15}}>Liste des thématiques</Text>
        <SafeAreaView edges={['bottom', 'left', 'right']}>
          <ScrollView style={styles.containerHistoriqueThematique} horizontal={true} showsHorizontalScrollIndicator={false}>
            <HistoriqueThematique title='Musique' level={2} lastExercise={7} style={{backgroundColor: '#FFB31F'}} />
            <HistoriqueThematique title='LifeStyle' level={1} lastExercise={6} style={{backgroundColor: '#DD246E'}} />
            <HistoriqueThematique title='Marketing' level={2} lastExercise={1} style={{backgroundColor: '#3444F1'}} />
          </ScrollView>
        </SafeAreaView>
        <View lightColor='#fff'style={{marginTop: -10, padding: 0, gap: 20}}>
          <Thematique title='Musique' icon={<Guitar/>} progress={80} />
          <Thematique title='Marketing' icon={<Camembert/>} progress={50} />
          <Thematique title='Art & Design' icon={<Art/>} progress={30} />
        </View>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  upperPart: {
    flex: 0.25,
    flexDirection: 'row',
    width: '100%'
  },
  containerBody: {
    flex: 0.7,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    padding: 20,
    gap: 20,
    height: '100%',
    width: '100%'
  },
  containerEarning : {
    flex: 0.1, 
    paddingHorizontal: 10, 
    justifyContent: 'center', 
    marginTop: 50, 
    width:"100%",
    alignItems: 'flex-end'
  },
  earnings: {
    width: 52,
    height: 19,
    borderRadius: 15,
    alignItems: 'center',
    paddingHorizontal: 5,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  containerHistoriqueThematique: {
    height: 120
  }
});