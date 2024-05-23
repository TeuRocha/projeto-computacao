import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Paragraph, TextInput, Title } from 'react-native-paper';
import { Audio } from 'expo-av';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class Principal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: '',
      senha: '',
    };
  }

  async ler() {
    try {
      let senha = await AsyncStorage.getItem(this.state.usuario);
      if (senha != null) {
        if (senha === this.state.senha) {
          this.props.navigation.navigate('Teste1');
        } else {
          alert("Senha Incorreta!");
        }
      } else {
        alert("Usuário não foi encontrado!");
      }
    } catch (erro) {
      console.log(erro);
    }
  }

  render() {
    return (
      <View style={estilos.container}>
        <Title>Login</Title>
        <TextInput
          label="Usuário"
          mode="outlined"
          style={estilos.input}
          value={this.state.usuario}
          onChangeText={(texto) => this.setState({ usuario: texto })}
        />
        <TextInput
          label="Senha"
          mode="outlined"
          style={estilos.input}
          secureTextEntry
          value={this.state.senha}
          onChangeText={(texto) => this.setState({ senha: texto })}
        />
        <Button mode="contained" onPress={() => this.ler()}>
          Logar
        </Button>
      </View>
    );
  }
}

class Criar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
    };
  }

  async playSound() {
    const { sound } = await Audio.Sound.createAsync(
       require('/assets/som.mp3')
    );
    this.sound = sound;
    await this.sound.playAsync();
  }

  async gravar() {
    try {
      await AsyncStorage.setItem(this.state.user, this.state.password);
      this.playSound();
      alert("Salvo com sucesso!!!");
    } catch (erro) {
      alert("Erro!");
    }
  }

  componentWillUnmount() {
    if (this.sound) {
      this.sound.unloadAsync();
    }
  }

  render() {
    return (
      <View style={estilos.container}>
        <Title>Criar Usuário</Title>
        <TextInput
          label="Usuário"
          mode="outlined"
          style={estilos.input}
          value={this.state.user}
          onChangeText={(texto) => this.setState({ user: texto })}
        />
        <TextInput
          label="Senha"
          mode="outlined"
          style={estilos.input}
          secureTextEntry
          value={this.state.password}
          onChangeText={(texto) => this.setState({ password: texto })}
        />
        <Button mode="contained" onPress={() => this.gravar()}>
          Criar
        </Button>
      </View>
    );
  }
}

class Nav2 extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Principal} />
        <Stack.Screen name="Teste1" component={Teste1} options={{ headerShown: false }} />
        <Stack.Screen name="Teste2" component={Teste2} options={{ headerShown: false }} />
        <Stack.Screen name="Teste3" component={Teste3} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }
}

class Teste1 extends React.Component {
  render() {
    return (
      <View style={estilos.container}>
        <Card>
          <Card.Content>            
            <Image 
              source={require('/assets/image1.png')} 
              style={estilos.imagem} 
            />
            <Button mode="contained" onPress={() => this.props.navigation.navigate('Teste2')}>
              Próximo
            </Button>
            <Button mode="outlined" onPress={() => this.props.navigation.goBack()}>
              Voltar
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

class Teste2 extends React.Component {
  render() {
    return (
      <View style={estilos.container}>
        <Card>
          <Card.Content>
            <Image 
              source={require('/assets/image2.png')} 
              style={estilos.imagem} 
            />
            <Button mode="contained" onPress={() => this.props.navigation.navigate('Teste3')}>
              Próximo
            </Button>
            <Button mode="outlined" onPress={() => this.props.navigation.goBack()}>
              Voltar
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

class Teste3 extends React.Component {
  render() {
    return (
      <View style={estilos.container}>
        <Card>
          <Card.Content>
            <Image 
              source={require('/assets/image3.png')} 
              style={estilos.imagem} 
            />         
            <Button mode="contained" onPress={() => this.props.navigation.navigate('Informações')}>
              Próximo
            </Button>
            <Button mode="outlined" onPress={() => this.props.navigation.goBack()}>
              Voltar
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

class Informacoes extends React.Component {
  render() {
    return (
      <View style={estilos.container}>
        <Title>Informações</Title>
        <Paragraph>
          {"Mateus advertências!"}
        </Paragraph>
        <Paragraph>
          {
            "Este teste não é 100% seguro e pode dar um falso positivo. Ele pode variar com a regulagem do seu monitor que pode mostrar cores diferentes do teste original. Existem várias versões desse teste, eu peguei apenas 3 desenhos. Esse teste só funciona para pessoas que não enxergam direito vermelho ou verde. Caso você perceber que não enxerga direito alguma cor, recomendo fazer um teste profissional em um Oftalmologista."
          }
        </Paragraph>
      </View>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Login"
            component={Nav2}
            options={{
              tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="home-account" color={color} size={size} />),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Criar Usuário"
            component={Criar}
            options={{
              tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account-details" color={color} size={size} />)
            }}
          />
          <Tab.Screen
            name="Informações"
            component={Informacoes} 
            options={{
              tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="information" color={color} size={size} />)
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  imagem: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginVertical: 16,
  },
});
