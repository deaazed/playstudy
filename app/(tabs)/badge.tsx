import { StyleSheet, View as DefaultView, Text as DefaultText, ScrollView, StatusBarStyle } from 'react-native';
import { View } from '../../components/Themed';
import BagdeView from '../../components/BagdeView';
import Progressbar from '../../components/Progressbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';


export default function BadgesSreen(props : { segment : string }) {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <SafeAreaView style={[styles.container, { padding: 0 }]} edges={['bottom', 'left', 'right']}>
      <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
        <View lightColor='#fff' style={styles.container}> 
          <DefaultView style={styles.progressContainer}>
            <DefaultView style={styles.progressLogo}>
              <Progressbar type="circular" sqSize={90} value={80} barColor='#69B85E' trackColor='#fff' valueColor='#000'/>
            </DefaultView>
            <DefaultView style={{ flex: 0.8}} >
                <DefaultText style={[styles.item, {fontSize:18, fontWeight: 'bold'}]}>Total de badges : 20</DefaultText>
                <DefaultText style={[styles.item, {fontSize:14}]}>Bravo Asthino! Il vous reste pas mal de badge à obtenir.</DefaultText>
            </DefaultView>
          </DefaultView>
          <BagdeView  title='Université' subTitle="L'ensemble de vos études et cours" style={{ backgroundColor: '#3444F1'}} />
          <BagdeView  title='Université' subTitle="L'ensemble de vos études et cours" style={{ backgroundColor: '#FF8504'}} />
          <BagdeView  title='Université' subTitle="L'ensemble de vos études et cours" style={{ backgroundColor: '#DD246E'}} />
          <BagdeView  title='Université' subTitle="L'ensemble de vos études et cours" style={{ backgroundColor: '#3444F1'}} />
          <BagdeView  title='Université' subTitle="L'ensemble de vos études et cours" style={{ backgroundColor: '#FF8504'}} />
        </View>
      </ScrollView>
    </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    gap: 20
  },
  item: {
    fontFamily: 'PopinsRegular'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 120,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D4D1D1',
    gap: 20
  },
  progressLogo: {
    flex: 0.2,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: "center",
    height:'100%'
  }
});
