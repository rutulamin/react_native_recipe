import React, {
    Component
} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
    NativeModules,
    Image
} from 'react-native'

export default class LoginComponent extends Component {

    constructor() {
        super()
        // email: "jm1@example.com",
        // password: 'jay@123'
        this.state = {
            email: '',
            password: ''
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <Image source={require('../assets/bg.jpeg')} style={styles.backgroundImage} />
                <View style={styles.topView}> 
                    <Text style={styles.loginTitle}>Login</Text>
                </View>
                <View style={styles.middleView}>
                        <TextInput
                        placeholder="Email"
                        keyboardType="email-address"
                        style={[styles.emailInput, styles.commonInput]}
                        value={this.state.email}
                        onChangeText={(email) => this.setState({email})}>
                       </TextInput>   
                    
                    <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    style={[styles.commonInput, styles.passwordInput]}
                    value={this.state.password}
                    onChangeText={(password) => this.setState({password})}>
                    </TextInput>

                    <TouchableOpacity style={styles.loginButtonContainer} onPress={this.onLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.bottomView}>
                </View>
            </View>
        )
    }

    onLogin = () => {
            fetch('http://35.160.197.175:3006/api/v1/user/login', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                }) 
            }).then((res) => {
                if(res.status == 200){
                    return res.json();
                }
            }).then((responseJSON) => {
                Alert.alert('Success', `Welcome to Recipe App ${responseJSON.firstName} ${responseJSON.lastName}.`, [
                    {
                        text: 'Yes',
                        style: 'cancel',
                        onPress: () => {
                            this.props.token(responseJSON.token)
                            this.props.navigation.navigate('List')
                        }
                    },
                     {
                        text: 'cancel',
                        style: "destructive"
                    }
                ])
            // end api call
            })
        // end fn
    }


}



const styles = StyleSheet.create({

    loginButtonContainer: {
        top: 20,
        backgroundColor: '#007bff',
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    loginButtonText: {
        fontSize: 17,
        color: 'white',
        fontWeight: 'bold'
    },
    commonInput: {
        width: '80%',
        // backgroundColor: 'red',
        borderWidth: 1,
        height: 50,
        borderRadius: 10,
        padding: 10
    },
    emailInput: {
        bottom: 10
    },
    passwordInput: {

    },
    loginTitle: {
        fontSize: 30,
        fontWeight: '500'
    },
    container: {
        flex: 1
    },
    topView: {
        flex: 0.2,
        // backgroundColor: 'cyan',
        alignItems: 'center',
        justifyContent: 'center',
    },
    middleView: {
        flex: 0.4,
        // backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomView: {
        flex: 0.4,
        // backgroundColor: 'yellow'
    },
    backgroundImage: {
        position: "absolute",
        resizeMode: 'cover', // or 'stretch'
      },

})