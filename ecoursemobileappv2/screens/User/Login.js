import { Image, Text, TouchableOpacity, View } from "react-native";
import Styles from "../../styles/Styles";
import { Button, HelperText, TextInput } from "react-native-paper";
import { useState } from "react";
import Apis, { authApis, endpoints } from "../../configs/Apis";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {

    const userInfo = [{
        field: 'username',
        title: 'Tên đăng nhập',
        icon: 'account',
    }, {
        field: 'password',
        title: 'Mật khẩu',
        icon: 'eye',
        secureTextEntry: true
    }];

    const [user, setUser] = useState({});
    const [err, setErr] = useState(null);
    const nav = useNavigation();
    const [loading, setLoading] = useState(false);



    const validate = () => {
        if (!user.username)
            setErr('Vui lòng nhập tên đăng nhập');
        else if (!user.password)
            setErr('Vui lòng nhập tên mật khẩu!');
        else
            return true;
    }

    const login = async () => {
        if (validate()) {
            

            try {
                setLoading(true);

                let res = await Apis.post(endpoints['login'], {
                    ...user, 
                    'client_id': 'pLsnEfSvl60yhsbATvvvCRaqdO7uJPY5HBO9H6S4',
                    'client_secret': 'GdNisvKpv5meLz9VCtnTLPhczHjI9mTqWdBngiZDrigOI8NkZ6HiFaSFO7GEmwwyxuEdtfoWAKNRifPZAGK8ZlQEf0XldgLCKS1wpkmuczm0Enm7gZqrFFNf09ezdjWZ',
                    'grant_type': 'password'
                })

                // AsyncS
                // console.info(res.data);
                await AsyncStorage.setItem('token', res.data.access_token);


                setTimeout(async () => {
                    let user = await authApis(res.data.access_token).get(endpoints['current-user']);
                    console.info(user.data);

                }, 500);
            } catch (ex) {
                console.error(ex);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <View style={Styles.padding}>
            <HelperText style={Styles.margin} type="error" visible={err}>
                {err}
            </HelperText>
            {userInfo.map(u => <TextInput value={user[u.field]} key={u.field}
                                        onChangeText={(t) => setUser({...user, [u.field]: t})} 
                                        style={Styles.margin} label={u.title} placeholder={u.title} 
                                        secureTextEntry={u.secureTextEntry}
                                        right={<TextInput.Icon icon={u.icon} />} />)}

            
            <Button loading={loading} disabled={loading} mode="contained" onPress={login}>Đăng nhập</Button>

        </View>
    );
}

export default Login;