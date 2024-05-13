import * as Style from "./styles";
import "./styles.css"
import { Form, Row, Col } from "../../components/Form";
import { message, Card, Result, Modal} from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fieldset } from "../../components/Fieldset";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { SelectLabel } from "../../components/SelectLabel";
import * as Yup from "yup";
import { User } from "../../control/user/control-user";
import { InputMask } from "../../components/InputMask";
import { Lead } from "../../control/lead/control-lead";
import { Estado } from "../../control/estado/control-estado";
import { Cidade } from "../../control/cidade/control-cidade";
import React, { useEffect, useState } from "react";

import useAuth from "../../hooks/useAuth";
import { InputCheck } from "../../components/InputCheck";
import { Loading } from "../../components/Loading";
import { Lojista } from "../../control/lojista/control-lojista";

const { Meta } = Card;
const schema = Yup.object().shape({
  name: Yup.string().required("Campo nome é obrigatório."),
  email: Yup.string().required("Campo Email é obrigatório.")
  //     .test('email-backend-validation',
  //           'O endereço de e-mail já está em uso.',
  //           async(email)=> {
  //             const result = await User.getEmail(email);
  //             console.log(result)
  //             if (result?.status && result.status === 200 && result.data?.message == 'sucesso') {
  //               return false;
  //             }
  //             return true
  //           }),
  // emailConfirmar: Yup.string()
    .required("Campo Email Confirmação é obrigatório.")
    .oneOf([Yup.ref("email")], "Existem divergências entre os e-mails."),
  telefone: Yup.string().required("Campo telefone é obrigatório."),
  politica: Yup.boolean()
  .oneOf([true], 'Você deve concordar com a Política de Privacidade')
  .required('Você deve concordar com a Política de Privacidade'),
  idestado: Yup.string().required("Campo Estado é obrigatório."),
  idcidade: Yup.string().required("Campo Cidade é obrigatório."),
  dtnascimento: Yup.string().required("Campo Data Nascimeto é obrigatório."),
  password: Yup.string().required("Campo Senha é obrigatório."),
  senhaConfimar: Yup.string()
    .required("Senha Confirmação.")
    .oneOf([Yup.ref("password")], "Senha precisa ser igual."),
});

export const CadastroLead = ({ layout }) => {
  const { sideIn,sideOut } = useAuth();
  const navigate = useNavigate();
  const { produto = null, idlote  } = layout?.lote || {};
  const {hash=null,} = layout|| {};
  const [estado, setEstado] = useState();
  const [cidade, setCidade] = useState();
  const [lojista, setLojista] = useState([]);
  const [estadoLojista, setEstadoLojista] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState();
  const [registeredSenha, setRegisteredSenha] = useState();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { register, handleSubmit, formState, control, reset } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      idpais: 1,
      email: "",
      password: "",
      name: "",
      idperfil: 3,
      status: "A",
      idacesso: layout?.idacesso,
    },
  });
  useEffect(() => {

    getEstado().then((data) => {
      setEstado(data);
    });

    sideIn(process.env.REACT_APP_EMAIL_GLOBAL, process.env.REACT_APP_PASSWORD_GLOBAL);

  }, []);

  const getEstado = async () => {
    const EstadoData = await Estado.listCombo();
    if (EstadoData?.status && EstadoData.status === 200 && EstadoData.data) {
      return EstadoData.arrayEstado;
    }
  };

  const getCity = async (state) => {
    const CityData = await Cidade.getAllCity(state);
    if (CityData?.status && CityData.status === 200 && CityData.data) {
      setCidade(()=>CityData.arrayCity)
    }
    setEstadoLojista(state)
  };

  const getLojista = async (cidade) => {
    const LojistaData = await Lojista.listCombo(estadoLojista, cidade, layout.lote.produto.idempresa);
    if (LojistaData?.status && LojistaData.status === 200 && LojistaData.data) {
      setLojista(()=>LojistaData.arrayLojista)
      console.log(lojista)
    }
  };

  const showModal = () => {
    setIsModalOpen((open)=>!open);
  };

  const userRegisteredEmail = async() => {
    if(!registeredEmail){
      return
    }
    setLoading(true)
    const login = await sideIn(registeredEmail, registeredSenha);
    if (login) {
      setLoading(false)
      message.error(`Usuário não encontrado.`, 2);
      return
    }
    const data = {
      email: registeredEmail,
      hash
    }
    const result = await Lead.addBondLead(data);
    if (result.status && (result?.status === 200 || result?.status === 201) && result.data.message != 'erro') {
      if (produto.editatemplate === 1 && produto.idconfigproduto == 1) {
        message.success("Cadastrado com sucesso.", 2, navigate(`/home/template/${idlote}/${hash}`));
      }else{
        message.success("Cadastrado com sucesso.", 2, navigate(0));
      }
    } else {
      message.error(`"Não foi possivel efetuar cadastro." ${result.data.error}`, 2);
      setLoading(false)
    }
  };
  
  const { errors, isSubmitting } = formState;

  // const handleSubmitData = (data, event) => {
  //   console.log("data", data);
  //   const dataSend = {
  //     hash,
  //     email: data.email,
  //     name: data.name,
  //     password: data.password,
  //     idperfil: 3,
  //     status: "A",
  //     lead: {
  //       idpais: 1,
  //       idestado: parseInt(data.idestado),
  //       idcidade: parseInt(data.idcidade),
  //       idacesso: parseInt(data.idacesso),
  //       idlojista: (data.idlojista?parseInt(data.idlojista):undefined),
  //       nome: data.name,
  //       telefone: data.telefone,
  //       dtnascimento: new Date(data.dtnascimento.split("/").reverse().join("-")),
  //       email: data.email,
  //     }
  //   };
  //   saveUser(dataSend);
  // };

  // const saveUser = async (data) => {
  //   setLoading(true)
  //   sideIn(process.env.REACT_APP_EMAIL_GLOBAL, process.env.REACT_APP_PASSWORD_GLOBAL);
  //   const result = await User.addUserLead(data);
  //   if (result.status && (result?.status === 200 || result?.status === 201) && result.data.message != 'erro') {
  //     setLoading(false)
  //     message.success("Usuário cadastrado com sucesso.", 2, redirectPage(data));
  //   } else {
  //     setLoading(false)
  //     message.error(`"Não foi possivel efetuar cadastro." ${result.data.error}`, 2);
  //   }
  // };

  const handleSubmitData = async (data, event) => {
    event.preventDefault(); // Previne o comportamento padrão de submissão do formulário
    
    console.log("data", data);
  
    try {
      setLoading(true);
  
      // Realiza o login antes de enviar os dados do usuário, se necessário
      await sideIn(process.env.REACT_APP_EMAIL_GLOBAL, process.env.REACT_APP_PASSWORD_GLOBAL);
  
      const dataSend = {
        hash,
        email: data.email,
        name: data.name,
        password: data.password,
        idperfil: 3,
        status: "A",
        lead: {
          idpais: 1,
          idestado: parseInt(data.idestado),
          idcidade: parseInt(data.idcidade),
          idacesso: parseInt(data.idacesso),
          idlojista: (data.idlojista ? parseInt(data.idlojista) : undefined),
          nome: data.name,
          telefone: data.telefone,
          dtnascimento: new Date(data.dtnascimento.split("/").reverse().join("-")),
          email: data.email,
        }
      };
  
      // Salva o usuário
      const result = await User.addUserLead(dataSend);
  
      if (result.status && (result?.status === 200 || result?.status === 201) && result.data.message !== 'erro') {
        // Exibe mensagem de sucesso e redireciona o usuário
        message.success("Usuário cadastrado com sucesso.", 2, redirectPage(data));
      } else {
        // Exibe mensagem de erro
        message.error(`Não foi possível efetuar cadastro. ${result.data.error}`, 2);
      }
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      // Exibe mensagem de erro genérica
      message.error("Ocorreu um erro ao salvar usuário. Por favor, tente novamente.", 2);
    } finally {
      setLoading(false);
    }
  };

  const redirectPage = (user) => {
    if(produto.editatemplate === 1 && produto.idconfigproduto == 1){
      sideOut()
      setTimeout(()=>{
        var side = sideIn(user.email, user.password);
        side.then((data) => {
          if(!data){
            navigate(`/home/template/${idlote}/${hash}`)
          }
        });
      }, 700)
    }else{
      navigate(0)
    }
  };

  if (!layout) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Desculpe, a página que você visitou não existe."
      />
    );
  }
  
  return (
    <Style.Content>
      <Loading loading={loading}/>
      {contextHolder}
      <Style.Header>
        {produto.imagem &&<Style.Logo src={produto.imagem} alt="logo" />}
        {(produto.configimagembaner&&produto.configimagembaner!='null') &&<Style.ImgBanner src={produto.configimagembaner} alt="banner" />}
      </Style.Header>
      <Form onSubmit={handleSubmit(handleSubmitData)}>
        <Fieldset title={"Cadastro"} overflow="hidden">
          <Style.linkCadastro onClick={()=>showModal()}>Já tenho Cadastro</Style.linkCadastro>
            <Modal style={{padding:1}} title="Sou cadastrado" open={isModalOpen}  onCancel={()=>showModal()} footer={<Button  onClick={()=>userRegisteredEmail()}>Usar Cadastro</Button>}  >
            <Row>
            <Col column="col-md-6">
                <Input
                  onChange={(value)=>setRegisteredEmail(value.target.value)}
                  text="E-mail cadastrado"
                  placeholder="E-mail"
                  type="text"
                />
              </Col>
            <Col column="col-md-6">
                <Input
                  onChange={(value)=>setRegisteredSenha(value.target.value)}
                  text="Senha"
                  placeholder="Senha"
                  type="password"
                />
              </Col>
            </Row>
          </Modal>
          <Row>
            <Col column="col-md-4">
              <Input
                register={register("name")}
                text="Nome"
                type="text"
                error={errors?.name?.message}
              />
            </Col>
            <Col column="col-md-2">
              <InputMask
                mask={"99/99/9999"}
                placeholder={"Data de nascimanto"}
                register={register("dtnascimento")}
                text="Data de nascimanto"
                type="text"
                error={errors?.dtnascimento?.message}
              />
            </Col>
            <Col column="col-md-2">
              <InputMask
                mask={"(99)99999-9999"}
                register={register("telefone")}
                text="Telefone"
                type="text"
                error={errors?.telefone?.message}
              />
            </Col>
          </Row>
          <Row>
            <Col column="col-md-2">
              <Controller
                control={control}
                name="idestado"
                render={({ field }) => (
                  <SelectLabel
                    field={field}
                    text="Estado"
                    error={errors?.idestado?.message}
                    options={estado}
                    onChange={(value, date) => {
                      field.onChange(value);
                      getCity(value)
                    }}
                  />
                )}
              />
            </Col>
            <Col column="col-md-2">
              <Controller
                control={control}
                name="idcidade"
                render={({ field }) => (
                  <SelectLabel
                    field={field}
                    text="Cidade"
                    error={errors?.idcidade?.message}
                    register={register("idcidade")}
                    options={cidade}
                    onChange={(value, date) => {
                      field.onChange(value);
                      getLojista(value)
                    }}
                  />
                )}
              />
            </Col>
            {lojista.length>0&&(<Col column="col-md-4">
              <Controller
                control={control}
                name="idlojista"
                render={({ field }) => (
                  <SelectLabel
                    field={field}
                    text="Loja"
                    // error={errors?.idcidade?.message}
                    register={register("idlojista")}
                    options={lojista}
                    onChange={(value, date) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />
            </Col>)}
          </Row>
          <Row>
            <Col column="col-md-4">
              <Input
                register={register("email")}
                text="E-mail"
                type="text"
                error={errors?.email?.message}
              />
            </Col>
            <Col column="col-md-4">
              <Input
                register={register("emailConfirmar")}
                text="Confirmar E-mail"
                type="text"
                error={errors?.emailConfirmar?.message}
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
            <Col column="col-md-4">
              <Input
                register={register("senhaConfimar")}
                text="Confirmar Senha"
                type="password"
                error={errors?.senhaConfimar?.message}
              />
            </Col>
          </Row>
          <Row>
          <Col column="col-md-4">
            <InputCheck  register={register("politica")} error={errors?.politica?.message}>
              Li e concordo com a <Style.linkPoliticy  href="https://4bi-diogo.s3.us-east-2.amazonaws.com/Politica+de+Privacidade/POLÍTICA+DE+PRIVACIDADE.pdf" target="_blank">Política de privacidade</Style.linkPoliticy>
            </InputCheck>
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

    /*<Form onSubmit={handleSubmit(handleSubmitData)}
        {...layout}
        ref={formRef}
        name="control-ref"
        // onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        //onFinishFailed={onFinishFailed}
        // autoComplete="off"
      >
        <Card
            style={{
              width: 330,
            }}
            cover={<iframe alt="example" src="https://www.youtube.com/embed/EEmEwdpbVGc?autoplay=1"/>}
          >
            <Meta title="Olá, identificamos que este é seu primeiro acesso!" description="
              Para garantir uma melhor experiência, preencha as informações abaixo:" />
            <Button type="link">Já tem um cadastro ? Clique aqui para entrar.</Button>
        </Card>
        <br></br>
        <Form.Item>
            <Input size="large" 
            register={register("name")}
            placeholder="Nome" prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item >
            <Input size="large" placeholder="Aniversário" prefix={<CalendarOutlined />} />
        </Form.Item>
        <Form.Item>
            <Input size="large" placeholder="Telefone" prefix={<PhoneOutlined />} />
        </Form.Item>
        <Form.Item>
            <Select
            control={control}
            name="idestado"
            mode="single"
            size="large"
            placeholder="Estado"
            style={{
                width: '100%',
            }}
            options={estado}
            />
        </Form.Item>
        <Form.Item>
            <Select
            control={control}
            name="idcidade"
            mode="single"
            size="large"
            placeholder="Estado"
            style={{
                width: '100%',
            }}
            options={cidade}
            />
        </Form.Item>
        <Form.Item>
        <Input size="large" placeholder="Email" prefix={<MailOutlined />} />
        </Form.Item>
        <Form.Item>
        <Input size="large" placeholder="Confirmar Email" prefix={<MailOutlined />} />
        </Form.Item>
        <Form.Item>
           <Input.Password  size="large" placeholder="Senha" />
        </Form.Item>
        <Form.Item>
           <Input.Password  size="large" placeholder="Confirmar Senha" />
        </Form.Item>
        <Button type="primary"  htmlType="submit"
        style={{
          width: 330,
        }}>Salvar</Button>
        </Form>*/
  );
};
