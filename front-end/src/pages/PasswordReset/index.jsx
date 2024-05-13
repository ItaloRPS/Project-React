import * as Style from "./styles";
import { Form, Row, Col } from "../../components/Form";
import { message, Card, Result, Modal} from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fieldset } from "../../components/Fieldset";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import * as Yup from "yup";
import { User } from "../../control/user/control-user";
import { Auth } from "../../control/auth/control-auth";
import React, { useEffect, useState } from "react";

import useAuth from "../../hooks/useAuth";
import { Loading } from "../../components/Loading";

const { Meta } = Card;
const schema = Yup.object().shape({
  password: Yup.string().required("Campo Senha é obrigatório."),
  passwordConfim: Yup.string()
    .required("Senha Confirmação.")
    .oneOf([Yup.ref("password")], "A confirmação de senha não confere."),
});

export const PasswordReset = () => {
  const {hash} = useParams()
  const { sideIn,sideOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const { register, handleSubmit, formState, control, reset } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
    },
  });
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    getUser().then((data) => {
      setUser(data);
      reset({email:data?.email})
    });
  }, []);

  const getUser = async () => {
    sideIn(process.env.REACT_APP_EMAIL_GLOBAL, process.env.REACT_APP_PASSWORD_GLOBAL);
    const user = await User.findUniqueToken(hash);
    if (user?.status && user.status === 200 && user.data && user.data.message == "sucesso") {
      setLoading(false)
      return user.data.result;
    }else{
      setLoading(false)
      return {}
    }
  };

  const handleSubmitData = (data, event) => {
    console.log("data", data);
    const {password} = data
    saveUser({password});
  };

  const saveUser = async (data) => {
    setLoading(true)
    const result = await Auth.updatePassword(hash, data);
    if (result.status && (result?.status === 200 || result?.status === 201) && result.data.message != 'erro') {
      setLoading(false)
      message.success("Usuário atualizado com sucesso.", 2, navigate('/'));
    } else {
      setLoading(false)
      message.error(`"Não foi possivel atualizar cadastro." ${result.response.data.message.message[0]}`, 2);
    }
  };

  function dataRange(dataHoraString) {
    let dataHoraFornecida = new Date(dataHoraString);
    let dataHoraAtual = new Date();
        dataHoraAtual.setHours(dataHoraAtual.getHours() - 3);
    let diferencaEmMilissegundos =  dataHoraAtual - dataHoraFornecida;
    let diferencaEmHoras = diferencaEmMilissegundos / (1000 * 60 * 60);
    return (diferencaEmHoras*60);
  }

  if (!Object.keys(user).length && loading) {
    return <Loading loading={loading}/>
  }

  if(!Object.keys(user).length && !loading || (dataRange(user.passwordResetExpires) > 90)){
    return (
      <Result
        status="404"
        title="404"
        subTitle="Desculpe, a página que você visitou não existe."
      />
    );
  }

  return (
    <Style.Container>
      <Style.Content>
        <Loading loading={loading}/>
        {contextHolder}
        <Form onSubmit={handleSubmit(handleSubmitData)}>
          <Fieldset title={"Alterar Senha"}>
          <Style.Title>Olá, {user.name}</Style.Title>
            <Row>
              <Col column="col-md-8">
                <Input
                  register={register("email")}
                  text="E-mail"
                  type="text"
                  error={errors?.email?.message}
                  disabled={true}
                />
              </Col>
            </Row>
            <Row>
              <Col column="col-md-4">
                <Input
                  register={register("password")}
                  text="Senha"
                  type="password"
                  error={errors?.password?.message}
                />
              </Col>
            </Row>
            <Row>
              <Col column="col-md-4">
                <Input
                  register={register("passwordConfim")}
                  text="Confirmar Senha"
                  type="password"
                  error={errors?.passwordConfim?.message}
                />
              </Col>
            </Row>
          </Fieldset>
          <Style.Actions>
            <Button type="submit" disabled={isSubmitting}>
              Salvar
            </Button>
          </Style.Actions>
        </Form>
      </Style.Content>
    </Style.Container>
  );
};
