import * as React from 'react';
import { TextInput, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Paragraph, Title } from 'react-native-paper';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

class Principal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      usuario: undefined,
      senha: undefined
    }
  }

  render(){
    return(
    <View>
      <Text>{"Usuário:"}</Text>
      <TextInput onChangeText={(texto)=>this.setState({usuario: texto})}></TextInput>
      <Text>{"Senha:"}</Text>
      <TextInput onChangeText={(texto)=>this.setState({senha: texto})}></TextInput>
      <Button title="Logar" onPress={()=>this.ler()}></Button>
    </View>
    )
  }

  async ler(){
    try{
      let senha = await AsyncStorage.getItem(this.state.usuario);
      if(senha != null){
        if(senha == this.state.senha){
          //alert("Logado!!!");
          this.props.navigation.navigate('Tela3')
        }else{
          alert("Senha Incorreta!");
        }
      }else{
        alert("Usuário não foi encontrado!");
      }
    }catch(erro){
      console.log(erro);
    }
  }
}

class Cadastro extends React.Component{
  constructor(props){
    super(props);
    this.state={
      user: undefined,
      password: undefined,

    }

  }

  async gravar(){
    try{
      await AsyncStorage.setItem(this.state.user, this.state.password);
      alert("Salvo com sucesso!!!")
    }catch(erro){
      alert("Erro!")
    }
  }

  render(){
    return(
    <View>
      <Text>{"Cadastrar Usuário:"}</Text>
      <TextInput onChangeText={(texto)=>this.setState({user: texto})}></TextInput>
      <Text>{"Cadastrar Senha:"}</Text>
      <TextInput onChangeText={(texto)=>this.setState({password: texto})}></TextInput>
      <Button title="Cadastrar" onPress={()=>this.gravar()}/>
    </View>
    )
  }
}

class Nav2 extends React.Component {
  render() {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Principal} />
          <Stack.Screen name="Tela3" component={Tela3}/>
       </Stack.Navigator>
    );
  }
}

class Tela3 extends React.Component {
    render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
         <Card>
          <Card.Title title="Bem vindo"  />
          <Card.Content>
            <Paragraph>{'Tela 3'}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

class Informacoes extends React.Component{
  render(){
    return(
    <View>
      <Text>{"Mateus advertências!"}</Text>
      <Text>{" "}</Text>
      <Text>{
        " Este teste não é 100% seguro e pode dar um falso positivo. Ele pode variar com a regulagem do seu monitor que pode mostrar cores diferentes do teste original. Existem várias versões desse teste, eu peguei apenas 6 desenhos. Esse teste só funciona para pessoas que não enxergam direito vermelho ou verde. Caso você perceber que não enxerga direito alguma cor, recomendo fazer um teste profissional em um Oftalmologista."
      }</Text>
      <Button title="Voltar" onPress={()=>this.props.navigation.goBack()}></Button>
    </View>
    )
  }
}

class App extends React.Component {

  render() {
    return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Login" component={Nav2} 
          options={{
            tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="home-account" color={color} size={size}/>)
            , headerShown: false
          }}
        />
        <Tab.Screen name="Criar Usuário" component={Cadastro}
          options={{
            tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="account-details" color={color} size={size}/>)
          }}
        />
        <Tab.Screen name="Informacoes" component={Informacoes} />
      </Tab.Navigator>
    </NavigationContainer>
    )
  }
}

export default App;