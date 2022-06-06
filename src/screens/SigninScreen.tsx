import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Text, Button} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
interface ISigninInputs {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

type SigninScreenProps = NativeStackScreenProps<RootStackParamList, 'Signin'>;

function SigninScreen(props: SigninScreenProps) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ISigninInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const [showPasswordChar, setShowPasswordChar] = useState(false);
  const onSubmit = data => console.log(data);
  return (
    <View style={style.container}>
      <View>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              label="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={style.inputStyle}
            />
          )}
          name="email"
        />
        {errors.email && <Text>{errors.email.message}</Text>}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              label="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={style.inputStyle}
              secureTextEntry={!showPasswordChar}
              right={
                <TextInput.Icon
                  name={showPasswordChar ? 'eye-off' : 'eye'}
                  onPress={() => setShowPasswordChar(!showPasswordChar)}
                />
              }
            />
          )}
          name="password"
        />
        {errors.password && <Text>{errors.password.message}</Text>}

        <Button style={style.signinButton} onPress={handleSubmit(onSubmit)}>
          Signin
        </Button>
      </View>
    </View>
  );
}

export default SigninScreen;

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 10,
    justifyContent: 'space-between',
  },
  upperContainer: {},
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputStyle: {
    marginVertical: 5,
  },
  signinButton: {
    marginTop: 5,
  },
});
