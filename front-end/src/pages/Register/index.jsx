import React, { useState } from "react";
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";
import * as Style from "./styles";
import { Link, useNavigate } from "react-router-dom";
import {Auth} from "../../control/auth/control-auth";
import {message} from 'antd';

export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [messageApi,contextHolder] = message.useMessage()

  const handleSignup = async () => {
    if (!email) {
      setError("Necessario informar o e-mail");
      return;
    }
    const resultEmail = await Auth.sendEmail({email})
    if (resultEmail?.response?.data?.statusCode == 404) {
      message.warning(resultEmail.response.data.message.error,3);
      return;
    }
    message.success("Solicitação realizada com sucesso.", 3)
  };

  return (
    <Style.Container>
      {contextHolder}
      <Style.Content>
      <Style.Label>Esqueci minha senha</Style.Label>
      <Style.P>Vamos te enviar um e-mail para poder alterar a sua senha.</Style.P>
        <Input
          text="E-mail"
          type="email"
          placeholder="Digite o E-mail cadastrado"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Style.labelError>{error}</Style.labelError>
        <Button onClick={handleSignup}>Enviar</Button>
        <Style.LabelSignin>
          <Style.Strong>
            <Link to="/login">&nbsp;Voltar</Link>
          </Style.Strong>
        </Style.LabelSignin>
      </Style.Content>
    </Style.Container>
  );
};

