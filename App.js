import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Card, Paragraph, TextInput, Title } from 'react-native-paper';

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
        <Card style={estilos.cartaoFormulario}>
          <Card.Content>
            <Title style={estilos.titulo}>Login</Title>
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
            <Button mode="contained" onPress={() => this.ler()} style={estilos.botao}>
              Logar
            </Button>
          </Card.Content>
        </Card>
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

  async gravar() {
    try {
      await AsyncStorage.setItem(this.state.user, this.state.password);
      alert("Salvo com sucesso!!!");
    } catch (erro) {
      alert("Erro!");
    }
  }

  render() {
    return (
      <View style={estilos.container}>
        <Card style={estilos.cartaoFormulario}>
          <Card.Content>
            <Title style={estilos.titulo}>Criar Usuário</Title>
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
            <Button mode="contained" onPress={() => this.gravar()} style={estilos.botao}>
              Criar
            </Button>
          </Card.Content>
        </Card>
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
              source={require('./assets/image1.png')} 
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
              source={require('./assets/image2.png')} 
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
              source={require('./assets/image3.png')} 
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
        <Card style={estilos.cartaoFormulario}>
          <Card.Content>
            <Title style={estilos.titulo}>Informações</Title>
            
            <Paragraph style={estilos.textoJustificado}>
              {
                "Este teste foi desenvolvido para a disciplina de Computação Móvel. Não é 100% seguro e pode gerar um falso positivo. Ele pode variar com a regulagem do seu monitor que pode mostrar cores diferentes do teste original. Existem várias versões desse teste, eu peguei apenas 3 desenhos. Esse teste só funciona para pessoas que não enxergam direito vermelho ou verde. Caso você perceber que não enxerga direito alguma cor, recomendo fazer um teste profissional e consultar um Oftalmologista."
              }
            </Paragraph>
          </Card.Content>
        </Card>
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
    alignItems: 'center', // Centraliza o cartão horizontalmente na tela
    padding: 16,
    backgroundColor: '#f5f5f5', // Fundo leve para destacar os cartões
  },
  cartaoFormulario: {
    width: '100%',
    maxWidth: 450, // Um pouquinho mais largo que o login para acomodar melhor o texto longo
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  titulo: {
    textAlign: 'center', // Centraliza o título principal
    marginBottom: 16,
    fontSize: 24,
    fontWeight: 'bold',
  },
  alertaTexto: {
    textAlign: 'center', // Centraliza a palavra "Advertências!"
    fontWeight: 'bold',
    color: '#b3261e', // Um tom de vermelho discreto para indicar aviso
    marginBottom: 12,
    fontSize: 16,
  },
  textoJustificado: {
    textAlign: 'justify', // Justifica o bloco de texto longo
    lineHeight: 22, // Aumenta o espaçamento entre as linhas para melhorar a leitura
    color: '#333333',
  },
  input: {
    marginBottom: 16,
  },
  botao: {
    marginTop: 8,
    paddingVertical: 6,
  },
  imagem: {
    width: 500,
    height: 500,
    alignSelf: 'center',
    marginVertical: 16,
    resizeMode: 'contain', // <-- Adicione esta linha!
  },
});