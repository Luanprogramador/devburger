import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";

import {toast} from 'react-toastify';
import {  useNavigate } from "react-router-dom";




import logo from '../../assets/logo.svg';
import  {Button } from '../../components/Button'
import { useUser } from "../../hooks/UserContext";
import { api } from "../../services/api";

import {
  
  Container,
  Form,
  InputContainer,
  LeftContainer,
 RightContainer,
  Title,
  Link,
  
} from './styles';


export function Login() {
  const  navigate = useNavigate();
  const {putUserData} = useUser();
  const schema = yup
  .object({
    email: yup.string().email('digite um e-mail válido').required('o e-mail é obrigatório'),
    password: yup.string().min(6,'a senha deve ter 6 caracteres').required('digite uma senha'),/*obrigatorio 6 caracteries*/
  })
  .required()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  const onSubmit = async (data) => {
    const{data: userData} = await toast.promise(
         api.post('/session',{
      email:data.email,
      password:data.password,
  }),

{
  pending: 'verificando seus dados',
  success:{
    render(){
      setTimeout(() =>{
        navigate('/');

      },200);
      return   'seja bem vindo(a)'

    },
  },
  error:'Email senha incorretos 😬',
}

);
    
    putUserData(userData);
 
  };

  return (
    <Container>
      <LeftContainer>
      <img src={logo} alt="logo-devburger"/>
      </LeftContainer>

      <RightContainer>
        <Title>
          olá, seja bem vindo ao <span>DevBurger ! </span>
          <br/>
          acesse com seu <span>Login e senha.</span>
        </Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Email</label>
            <input type="email"{...register("email")} />
            <p>{errors?.email?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>senha</label>
            <input type="password"{...register("password")}/>
            <p>{errors?.password?.message}</p>
          
          </InputContainer>
          
          <Button type="submit">Entrar</Button>

        </Form>
        <p>não possui conta?<Link to="/cadastro"> Clique aqui.</Link>
        </p>
      </RightContainer>
    </Container>
  );
}
