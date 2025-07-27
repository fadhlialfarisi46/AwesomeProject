import React from 'react';
import { SafeAreaView, View } from 'react-native';
import Home from './screens/Home.tsx';


const App = () => {
  
  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
      <Home />
    </SafeAreaView>
  );
};


export default App;
