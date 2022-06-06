import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Text, Button, useTheme} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
interface ISignupInputs {
  name: string;
  email: string;
  password: string;
}

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

type SignupScreenProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;

function SignupScreen(props: SignupScreenProps) {
  const {colors} = useTheme();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ISignupInputs>({
    defaultValues: {
      name: '',
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
              label="Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={style.inputStyle}
            />
          )}
          name="name"
        />
        {errors.name && <Text>{errors.name.message}</Text>}

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

        <Button style={style.signupButton} onPress={handleSubmit(onSubmit)}>
          Signup
        </Button>
      </View>
      <View style={style.bottomContainer}>
        <Text>
          Already have an account?{' '}
          <Text
            style={{color: colors.primary}}
            onPress={() => props.navigation.navigate('Signin')}>
            Signin
          </Text>
        </Text>
      </View>
    </View>
  );
}

export default SignupScreen;

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
  signupButton: {
    marginTop: 5,
  },
});
