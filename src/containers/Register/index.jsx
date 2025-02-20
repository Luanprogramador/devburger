
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import {toast} from 'react-toastify';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";




import logo from '../../assets/logo.svg';
import  {Button } from '../../components/Button'
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



export function Register () {
  
const navigate = useNavigate();
  const schema = yup
  .object({
    name:yup.string().required('o nome é obrigatório'),    
    email: yup.string().email('digite um e-mail válido').required('o e-mail é obrigatório'),
    password: yup.string().min(6,'a senha deve ter 6 caracteres').required('digite uma senha'),/*obrigatorio 6 caracteries*/
    confirmPassword:yup
    .string()
    .oneOf([yup.ref('password')], 'as senhas devem ser iguais')
    .required('confirme sua senha'),
  })
  .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log('errors');

  const onSubmit = async (data) => {
    try{
       const {status} = await api.post('/users',
        {
      name:data.name,
  email:data.email,
  password:data.password,
},
{
validateStatus: () => true,
},
);

if(status === 200 || status === 201 ){
  setTimeout(()=>{
navigate('/login');
  },2000);
  toast.success('conta criada com sucesso! ');
}else if (status === 409){
  toast .error('email ja cadastrado ! faça login  para continuar');
  }else{
throw new Error();
  }


}catch (error){
  toast.error('falha no sistema! tente noamente');
}
  };


    

  return (
    <Container>
      <LeftContainer>
      <img src={logo} alt="logo-devburger"/>
      </LeftContainer>

      <RightContainer>
        <Title>criar conta</Title>

        <Form onSubmit={handleSubmit(onSubmit)}>

        <InputContainer>
            <label>Nome</label>
            <input type="text"{...register("name")} />
            <p>{errors?.name?.message}</p>
          </InputContainer>
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
          <InputContainer>
            <label>confirmar senha</label>
            <input type="password"{...register("confirmPassword")} />
            <p>{errors?.confirmPassword?.message}</p>
          </InputContainer>
          
          <Button type="submit">criar conta</Button>

        </Form>
        <p>já possui conta?<Link to="/login" > Clique aqui.</Link>
        </p>
      </RightContainer>
    </Container>
  );
}
