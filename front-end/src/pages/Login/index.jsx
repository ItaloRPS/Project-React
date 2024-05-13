import React, { useState, useRef} from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";
import * as Style from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Loading } from "../../components/Loading";

export const Login = () => {
  const {sideIn} = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef(null);

  const handleLogin = async() => {
    if (!email | !password) {
      setError("Preencha todos os campos");
      return;
    }
    setLoading(true)
    var result = await sideIn(email, password)
    if (result) {
      setError(result);
      setLoading(false)
      return;
    }
    navigate("/home/dashboard");
  };

  const handleKeyPress = async  (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      await handleLogin();
    }
  };
  return (
    <Style.Container>
      <Loading loading={loading}/>
      <Style.BackImg>
          <Style.Img src="/assets/images/img/MULTLEADS_original.jpg"/>
      </Style.BackImg>
      <Style.Content>
      <Style.ImgLogo src="/assets/images/img/logo.png"/>
        <Input
          text="E-mail"
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
          onKeyPress={handleKeyPress}
        />
        <Input
          text="Senha"
          type="password"
          placeholder="Digite sua Senha"
          value={password}
          onChange={(e) => [setPassword(e.target.value), setError("")]}
          onKeyPress={handleKeyPress}
        />
        <Style.labelError>{error}</Style.labelError>
        <Button onClick={handleLogin}>Entrar</Button>
          <Style.Strong>
            <Link to="/register">&nbsp;Recuperar senha</Link>
          </Style.Strong>
      </Style.Content>
    </Style.Container>
  );
};

 