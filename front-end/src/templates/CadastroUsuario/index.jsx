import * as Style from "./styles";
import { Form, Row, Col } from "../../components/Form";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { SelectLabel } from "../../components/SelectLabel";
import { Fieldset } from "../../components/Fieldset";
import { Article } from "../../components/Article";
import { message, Table, Tag, Button as ButtonAnt } from "antd";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LinkButton } from "../../components/LinkButton";

import { User } from "../../control/user/control-user";
import { Perfil } from "../../control/perfil/control-perfil";
import { Company } from "../../control/company/control-company";
import { Loading } from "../../components/Loading";
import { SwitchLabel } from "../../components/SwitchLabel";
const schema = Yup.object().shape({
  name: Yup.string().required("Necessário informar um nome."),
  email: Yup.string().required("Necessário informar um email."),
});

const v = (value) => {
  console.log(`selected ${value}`);
};
export const CadastroUsuario = () => {
  const navigate = useNavigate();
  const [arrayEmpresa, setArrayEmpresa] = useState();
  const [newUser, setNewUser] = useState();
  const [user, setUser] = useState({});
  const [empresaGlobal, setEmpresaGlobal] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();
  const { uuid } = useParams();

  const { register, handleSubmit, formState, control, reset } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      id: 0,
      email: "",
      password: "",
      name: "",
      idperfil: "",
    },
  });

  const { errors, isSubmitting } = formState;
  const [perfil, setPerfil] = useState();
  const [options, setEmpresa] = useState([]);
  useEffect(() => {
    getUser().then((data) => {
      const userData = {...data,idperfil:data.perfil?.idperfil}
      userData.status = (userData.status=='A'?true:false)
      setId(userData.id)
      setUser(userData)
      reset(userData);
      setEmpresa(data.UserEmpresa);
    });

    getEmpresa().then((data) => {
      setArrayEmpresa(data);
    });

    getPerfil().then((data) => {
      setPerfil(data);
    });
  }, [newUser]);



  const handleSubmitData = (data, event) => {
    if (id) {
      udpateUser(data);
    } else {
      saveUser(data);
    }
  };

  const getPerfil = async () => {
    const PerfilData = await Perfil.listCombo();
    if (PerfilData?.status && PerfilData.status === 200 && PerfilData.data) {
      return PerfilData.arrayperfil;
    }
  };

  const getEmpresa = async () => {
    const EmpresaData = await Company.listCombo();
    if (EmpresaData?.status && EmpresaData.status === 200 && EmpresaData.data) {
      return EmpresaData.arrayCompany;
    }
  };

  const getUser = async () => {
    if (!uuid) {
      return "";
    }
    const UserData = await User.get(uuid);
    const user = UserData.data.result;
    if (UserData?.status && UserData.status === 200 && user) {
      return UserData.data.result;
    }
  };

  const saveUser = async (data) => {
    // const ids = JSON.parse(sessionStorage.empresasIds);
    // if (ids.length > 0) {
    // data.status = data.status === true ? "A" : "I";
    setLoading(true)
    data.status = "A" ;
    delete data.id;
    const result = await User.add(data);
    if (result.status && result.data.message === "sucesso") {
      setLoading(false)
      message.success("Usuário cadastrado com sucesso.",2,navigate(`/home/usuario/cadastrausuario/${result.data.result.id}`) );
    } else {
      setLoading(false)
      message.error(`${result.data.error}`, 2);
    }
  };

  const udpateUser = async (data) => {
    delete data.password;
    delete data.id;
    data.status = (data.status === true ? 'A' : 'I')
    const result = await User.update(id, data);
    if (result.status && (result?.status === 200 || result?.status === 201)) {
      message.success( "Usuário atualizado com sucesso.", 2, navigate("/home/usuario"));

    } else {
      message.error(`"Não foi possivel atualizar Usuário."`, 2);

    }
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
    },
    {
      title: "CNPJ",
      dataIndex: "cnpj",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.status - b.status,
      filters: [
        {
          text: "Ativo",
          value: "ATIVO",
        },
        {
          text: "Inativo",
          value: "INATIVO",
        },
      ],
      onFilter: (value, record) =>
        record.status.props.children.indexOf(value) === 0,
    },
  ];
  const dataTable = options?.map((option) => ({
      key: option.idempresa,
      nome: option.empresa.nome,
      cnpj: option.empresa.cnpj,
      email: option.empresa.email,
      status: (
        <Tag color={option.empresa.status === "A" ? "green" : "volcano"}>
          {option.empresa.status === "A" ? "ATIVO" : "INATIVO"}
        </Tag>
      ),
    })) || [];
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    const jsonString = JSON.stringify(newSelectedRowKeys);
    sessionStorage.setItem("empresasIds", jsonString);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const selectedEmpresa = async (data) => {
    setEmpresaGlobal(data);
  };

  const vincularUserEmpresa = async (idempresa, idusuario, options) => {
   
    setLoading(true)
    const element = {
      idusuario,
      idempresa,
    };

    try {
      const result = await User.userEmpresa(element);
      if (result && (result.status === 200 ||result.status === 201) && result.data && result.data.message !== "erro") {
        setLoading(false)
        message.success("Empresa vinculada com sucesso.", 2);
        setNewUser(result.data.result)
        
      } else {
        setLoading(false)
        message.error(result.data.error, 2);
      }
    } catch (error) {
      setLoading(false)
      message.error(`"Não foi possivel vincular empresa ao usuario."`, 2);
    }
  };
  if(uuid&&!Object.keys(user).length){
    return (<Loading loading={true}/>)
  }
  return (
    <Article title="Usuário">
      {contextHolder}
      <Loading loading={loading}/>
      <Form onSubmit={handleSubmit(handleSubmitData)}>
        <Fieldset title={id ? "Editar Usuário" : "Cadastro de Usuário"}>
          <Row>
            <Col column="col-md-4">
              <Controller
                control={control}
                name="idperfil"
                render={({ field }) => (
                  <SelectLabel
                    field={field}
                    text="Perfil"
                    error={errors?.idperfil?.message}
                    register={register("idperfil")}
                    options={perfil}
                    onChange={(value, date) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />
            </Col>
            <Col column="col-md-1">
              <Controller
                control={control}
                name="status"
                render={({ field }) => {
                  return (
                    <SwitchLabel
                      field={field}
                      defaultChecked={field.value}
                      checked={field.value}
                      text="Ativo"
                      onChange={(value, date) => {
                        field.onChange(value);
                      }}
                    />
                  );
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col column="col-md-4">
              <Input
                register={register("name")}
                text="Nome"
                type="text"
                error={errors?.name?.message}
              />
            </Col>
            <Col column="col-md-4">
              <Input
                register={register("email")}
                text="Email"
                type="email"
                error={errors?.email?.message}
              />
            </Col>
            {!uuid && (
              <Col column="col-md-4">
                <Input
                  register={register("password")}
                  text="password"
                  type="password"
                  error={errors?.password?.message}
                />
              </Col>
            )}
          </Row>
        </Fieldset>
        {uuid&&(<Fieldset title={"Vincular Empresa"}>
          <Row>
            <Col column="col-md-4">
              <Controller
                control={control}
                name="idempresa"
                render={({ field }) => (
                  <SelectLabel
                    field={field}
                    text="Empresa"
                    options={arrayEmpresa}
                    onChange={(value, date) => {
                      field.onChange(value);
                      selectedEmpresa(value);
                    }}
                  />
                )}
              />
            </Col>
            <Col column="col-md-1">
              <ButtonAnt style={{marginTop: '31%'}}
                onClick={() => vincularUserEmpresa(empresaGlobal, +id, options)}>
                Adicionar
              </ButtonAnt>
            </Col>
          </Row>
          <Row>
            <Col column="col-md-12">
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={dataTable}
              />
            </Col>
          </Row>
        </Fieldset>)}
        <Style.Container>
          <LinkButton to="/home/usuario" color="default">
            {" "}
            Voltar
          </LinkButton>
          <Button type="submit" disabled={isSubmitting}>
            Salvar
          </Button>
        </Style.Container>
      </Form>
    </Article>
  );
};
