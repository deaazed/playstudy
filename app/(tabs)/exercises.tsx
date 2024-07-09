import { StyleSheet, View as DefaultView, Text as DefaultText, ScrollView, TouchableOpacity, BackHandler, PanResponder, Animated, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Astronot } from '@/assets/images';
import Thematique from '@/components/ThematiqueView';
import { SafeAreaView } from 'react-native-safe-area-context';
import HistoriqueThematique from '@/components/HistoriqueThematique';
import DragIndicator from '@/components/DragIndicator';
import { router } from 'expo-router';
import { useUsers } from '@/components/UsersContext';
import React, { Key } from 'react';
import { userLogout } from '@/models';
import { Modal } from '@/components/Modal';
import { getThemes } from '@/models/themes';
import Awards from '@/components/Awards';
import { getAwardsByTheme, getPlayerAwards, getPlayerAwardsByGame } from '@/models/awards';

export default function ExercisesSreen() {
  const { state, dispatch } = useUsers();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [themes, setThemes] = React.useState<Array<JSX.Element>>([]);
  const [lastExercises, setLastExercises] = React.useState<Parse.Object[]>([]);
  const pan = React.useRef(new Animated.ValueXY()).current;
  const [themeFullScreen, setThemeFullScreen] = React.useState<boolean>(false);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy < -20 ) {
          setThemeFullScreen(true);
        } else if(gestureState.dy > 100){
          setThemeFullScreen(false);
        }
        // Reset the position
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      },
    })
  ).current;

  // React.useEffect(() => {
  //   if(state.user) {
  //     state.user.relation('exercises').query().find().then((exercises: Parse.Object[]) => {
  //       setLastExercises(exercises);
  //     });
  //   }
  // }, [state.user]);

  const handleGoBack = () => {
    userLogout().then(() => {
      dispatch({ type: 'LOGOUT' });
      console.log(state);
      router.push('/');
    });
  }

  React.useEffect(() => {
    getThemes().then((themes: Parse.Object[]) => {
      dispatch({ type: 'THEMES_FETCH', payload: themes });
      setThemes(themes.map((theme: Parse.Object, index: Key | null | undefined) => {
        return <Pressable key={index} onPress={() => router.push({pathname:'/game/list', params:{theme: theme.id}})}><Thematique title={theme.get('name')} icon={theme.get('icon').url()} /></Pressable>
      }));
    });

    getPlayerAwards().then((awards: Parse.Object[]) => {
      dispatch({ type: 'AWARDS_FETCH', payload: awards });
    });
  }, []);

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
        <Awards/>
      { !themeFullScreen &&
      <DefaultView style={styles.upperPart}>
        <DefaultView style={{ flex: 0.6, justifyContent: 'center', paddingLeft: 20}}>
          <DefaultText style={{flexWrap: "nowrap",color: "#fff", fontFamily: 'PopinsMedium', fontSize:24}}>Bonjour, { state.user?.get('username') }</DefaultText>
          <DefaultText style={{flexWrap: "wrap", color: "#fff", fontSize:13, fontFamily: 'PopinsRegular'}}>Quelle thématique aimerais-tu choisir ?</DefaultText>
        </DefaultView>
        <DefaultView style={{ justifyContent: 'center', flex: 0.4 }}><Astronot/></DefaultView>
      </DefaultView>
      }
      <Animated.View
        style={[styles.containerBody, { transform: [{ translateY: !themeFullScreen ? pan.y : 0 }] , flex: themeFullScreen ? 1 : 0.7, marginTop: themeFullScreen ? 0 : 20 }]}
        {...panResponder.panHandlers}
      >
        <DragIndicator extraStyle={{ backgroundColor: 'rgba(38, 50, 56, 0.43)', alignSelf: 'center'}} />
        <Text style={{textAlign: 'center', fontSize: 20, marginTop: 15}}>Liste des thématiques</Text>
        { lastExercises.length > 0 && !themeFullScreen &&
        <SafeAreaView edges={['bottom', 'left', 'right']} style={{ paddingHorizontal: 20 }}>
          <ScrollView style={styles.containerHistoriqueThematique} horizontal={true} showsHorizontalScrollIndicator={false}>
            <HistoriqueThematique title='Musique' level={2} lastExercise={7} style={{backgroundColor: '#FFB31F'}} />
            <HistoriqueThematique title='LifeStyle' level={1} lastExercise={6} style={{backgroundColor: '#DD246E'}} />
            <HistoriqueThematique title='Marketing' level={2} lastExercise={1} style={{backgroundColor: '#3444F1'}} />
          </ScrollView>
        </SafeAreaView>
        }
        <SafeAreaView edges={['bottom', 'left', 'right']} style={{marginTop: -10}}>
          <ScrollView showsHorizontalScrollIndicator={false} scrollEnabled={themeFullScreen} >
            <View lightColor='#fff' style={{ paddingHorizontal: 20, gap: 20, marginBottom: 100}}>
            {themes}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Animated.View>
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
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    paddingVertical: 20,
    gap: 20,
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
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