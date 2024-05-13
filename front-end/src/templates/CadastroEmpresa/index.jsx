import * as Style from "./styles";
import { Form, Row, Col } from "../../components/Form";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { SelectLabel } from "../../components/SelectLabel";
import { SwitchLabel } from "../../components/SwitchLabel";
import { Fieldset } from "../../components/Fieldset";
import { Article } from "../../components/Article";
import { message, Space, Table, Tag, Modal, Tooltip, Spin} from "antd";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LinkButton } from "../../components/LinkButton";

import { Company } from "../../control/company/control-company";
import { Estado } from "../../control/estado/control-estado";
import { Cidade } from "../../control/cidade/control-cidade";
import { Pais } from "../../control/pais/control-pais";
import { User } from "../../control/user/control-user";
import { Whatsapp } from "../../control/whatsapp/control-whatsapp";
import { InputMask } from "../../components/InputMask";
import { Loading } from "../../components/Loading";
import{ Button as ButtonAnt} from "antd";
import { DeleteOutlined, LoadingOutlined, PlusOutlined, QrcodeOutlined, SearchOutlined } from "@ant-design/icons";


const schema = Yup.object().shape({
  nome: Yup.string().required("Necessário informar um nome."),
  email: Yup.string().required("Necessário informar um email."),
  telefone: Yup.string().required("Necessário informar um fone."),
  cnpj: Yup.string().required("Necessário informar CNPJ."),
});

export const CadastroEmpresa = () => {
  const navigate = useNavigate();
  const [estado, setEstado] = useState()
  const [cidade, setCidade] = useState()
  const [pais, setPais] = useState()
  const [usuario, setUsuario] = useState()
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [loadingWhats, setLoadingWhats] = useState(false);
  const [empresa, setEmpresa] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenInsert, setIsModalOpenInsert] = useState(false);
  const [isModalOpenQrCode, setIsModalOpenQrCode] = useState(false);
  const [targetWhats, setTargetWhats] = useState({});
  const [whatsappsDeleted, setWhatsappsDeleted] = useState({});
  const [whatsapps, setWhatsapps] = useState([]);
  const [realoadTable, setRealoadTable] = useState(false);
  const [qrCode64, setQrCode64] = useState('');
  const [id, setId] = useState();
  
  
  const { uuid } = useParams();

  const { register, handleSubmit, formState, control, reset, getValues, setValue } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      //idusuario: null,
      idpais: null,
      idestado: null,
      idcidade: null,
      status: true,
      nome: "",
      email: "",
      telefone: "",
    },
  });
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    getPais().then((data) => {
      setPais(data)
    });

    getEstado().then((data) => {
      setEstado(data)
    });

    getUsuario().then((data) => {
      setUsuario(data)
    });

    getCompany().then((data) => {
      getCity(data.idestado)
      setEmpresa(data)
      reset(data)
      
    });


    return 
  }, []);
 
  useEffect(() => {
    getWhatsApp().then((data) => {
      setWhatsapps(data)
    });
    
  }, [whatsappsDeleted, realoadTable]);

  useEffect(() => {
    reset((prev)=>({...prev,cnpj:empresa.cnpj}))  
  }, [empresa]);
  
  const handleSubmitData = (data, event) => {
    console.log(data);
    console.log("event", event);
    if (id) {
      udpateCompany(data);
    } else {
      saveCompany(data);
    }
  };
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
  };

  const getPais = async () => {
    const PaisData = await Pais.listCombo();
    if (PaisData?.status && PaisData.status === 200 && PaisData.data) {
      return PaisData.arrayCountry;
    }
  };

  const getUsuario = async () => {
    const UsuarioData = await User.listCombo();
    if (UsuarioData?.status && UsuarioData.status === 200 && UsuarioData.data) {
      return UsuarioData.arrayUser;
    }
  };

  const getCompany = async () => {
    if (!uuid) {
      return "";
    }
    const CompanyData = await Company.get(uuid);
    const company = CompanyData.data?.result
    if (CompanyData?.status && CompanyData.status === 200 && company) {
      const {
        //idusuario,
        idempresa,
        idpais,
        idestado,
        idcidade,
        status,
        nome,
        email,
        telefone,
        cnpj,
      } = CompanyData.data.result;
      setId(idempresa)
      return {
        //idusuario,
        idpais,
        idestado,
        idcidade,
        status: status === "A" ? true : false,
        nome,
        email,
        telefone,
        cnpj,
      };
    }
  };

  const getWhatsApp = async () => {
    const dataWhats = await Whatsapp.findAllByCompany(id);
    if (dataWhats?.status && dataWhats.status === 200 && dataWhats.data) {
      return dataWhats.data;
    }
    return []
  };


  const saveCompany = async (data) => {
    setLoading(true)
    data.status = data.status === true ? "A" : "I";
    console.log(data);
    const result = await Company.add(data);
    if (result.status && (result?.status === 200 || result?.status === 201)) {
      message.success("Empresa cadastrada com sucesso.", 2, navigate(`/home/empresas`));
      // message.success("Empresa cadastrada com sucesso.", 2, navigate(`/home/empresas/cadastraempresa/${result.data.result.idempresa}`));
    } else {
      setLoading(false)
      message.error(`"Não foi possivel cadastrar Empresa."`, 2);
    }
  };

  const udpateCompany = async (data) => {
    data.status = data.status === true ? "A" : "I";
    // const dataUpdate = { ...data, idempresa: id };
    const result = await Company.update(id, data);
    if (result.status && (result?.status === 200 || result?.status === 201)) {
      message.success(
        "Empresa atualizada com sucesso.",
        2,
        navigate("/home/empresas")
      );
    } else {
      message.error(`"Não foi possivel atualizar Empresa."`, 2);
    }
  };

  const deleteWhatsapp = async () => {
    const result = await Whatsapp.delete(targetWhats.idwhatsapp);
    if (result && result.status && result.status == 200) {
      showModalDelete();
      message.success("whatsapp excluido.", 2, setWhatsappsDeleted(() => result.data));
    } else {
      message.error(`Não foi possível excluir o numero de whatsapp.`, 2);
    }
  };
  
  const registerNumber = async () => {
    const number = getValues('whatsappNumber')
    if(number.replace(/\D/g, "").length < 11){
      message.error(`Número inválido.`, 2);
      return
    }
    setLoadingWhats(true)
    const result = await Whatsapp.add({idempresa:parseInt(id),numero:number});
    if (result && result.status && result.status==201) {
      setLoadingWhats(false)
      setQrCode64(result.data.qrCode)
      showModalInsert();
      showModalQrCode();
    } else {
      setLoadingWhats(false)
      message.error(`"Não foi possível cadastrar o whatsapp."`, 2);
    }
  };
  
  const getQrCode = async (data) => {
    
    const result = await Whatsapp.getQrCode({session:data.session,sessionkey:data.sessionkey});
    if (result && result.status && result.status==200) {
      setQrCode64(result.data.base64)
      showModalQrCode();
    } else {
      message.error(`"Não foi possível gerar qrcode"`, 2);
    }
  };
  

  if(uuid && !Object.keys(empresa)?.length){
    return <Loading loading={true}/>

  }

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  
  const columns = [
    {
      title: 'Numero',
      dataIndex: 'numero',
      sorter: (a, b) => a.numero.length - b.numero.length,
      sortDirections: ['descend'],
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Name"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters()}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) =>
      record.name.toString().toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Descrição',
      dataIndex: 'session',
      sorter: (a, b) => a.session.length - b.session.length,
      sortDirections: ['descend'],
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Name"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters()}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) =>
      record.name.toString().toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      defaultSortOrder: 'descend',
      filters: [
        {
          text: 'CONECTADO',
          value: 'CONECTADO',
        },
        {
          text: 'NÃO CONECTADO',
          value: 'NÃO CONECTADO',
        },
      ],
      onFilter: (value, record) => record.status.props.children.indexOf(value) === 0,
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, record) => (
        <Style.Actions size="small" key={record.idwhatsApp}>
          {record.status.props.children=="NÃO CONECTADO"&&(<Tooltip placement="top" title={"Conectar"}>
            <ButtonAnt onClick={()=>getQrCode(record)}><QrcodeOutlined /></ButtonAnt>
          </Tooltip>)}
          <Tooltip placement="top" title={"Excluir"}>
            <ButtonAnt onClick={() => showModalDelete(record)}><DeleteOutlined /></ButtonAnt>
          </Tooltip>
        </Style.Actions>
      )
      
    }
  ];
  
  const data = whatsapps.map((whatsapp)=>{
        return {
          key: whatsapp.idwhatsApp,
          sessionkey: whatsapp.sessionkey,
          numero: whatsapp.numero,
          session: whatsapp.session,
          idempresa:whatsapp.idempresa,
          idwhatsApp:whatsapp.idwhatsapp,
          status:<Tag color={whatsapp.state=="CONNECTED"?"green":"red"} key={whatsapp.idwhatsApp}>{whatsapp.state=="CONNECTED"?"CONECTADO":"NÃO CONECTADO"}</Tag>,
        }
      })

  const showModalDelete = (data) => {
    setTargetWhats({idwhatsapp:data?.idwhatsApp,numero:data?.numero,descricao:data?.sessionkey});
    setIsModalOpen((open) => !open);
  };
  
  const showModalInsert = () => {
    setIsModalOpenInsert((open) => !open);
  };

  const showModalQrCode = () => {
    setIsModalOpenQrCode((open) => !open);
  };

  return (
    <Article title="Empresa">
      {contextHolder}
      <Loading loading={loading}/>
      <Form onSubmit={handleSubmit(handleSubmitData)}>
        <Fieldset title={id ? "Editar Empresa" : "Cadastro de Empresa"}>
          <Row>
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
             {/* <Col column="col-md-2">
              <Controller
                control={control}
                name="idusuario"
                render={({ field }) => (
                  <SelectLabel
                    field={field}
                    text="Usuario"
                    error={errors?.id?.message}
                    register={register('id')}
                    options={usuario}
                    onChange={(value, date) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />
            </Col> */}
            <Col column="col-md-4">
              <InputMask
                mask={"99.999.999/9999-99"}
                register={register("cnpj")}
                text="CNPJ"
                type="text"
                error={errors?.cnpj?.message}
              />
            </Col>
          </Row>
          <Row>
            <Col column="col-md-4">
              <Input
                register={register("nome")}
                text="Razão Social"
                // placeholder="Razão Social..."
                type="text"
                error={errors?.nome?.message}
              />
            </Col>
            <Col column="col-md-2">
              <Controller
                control={control}
                name="idpais" // Corrigido para "idpais"
                render={({ field }) => (
                  <SelectLabel
                    field={field}
                    text="Pais"
                    error={errors?.idpais?.message}
                    register={register('idpais')} // Corrigido para 'idpais'
                    options={pais}
                    onChange={(value, date) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />
            </Col>
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
                      setValue('idcidade','')
                      getCity(value)
                    }}
                  />
                )}
              />
            </Col>
            <Col column="col-md-2">
              <Controller
                control={control}
                name="idcidade" // Corrigido para "idcidade"
                render={({ field }) => (
                  <SelectLabel
                    field={field}
                    text="Cidade"
                    error={errors?.idcidade?.message}
                    register={register('idcidade')} // Corrigido para 'idcidade'
                    options={cidade}
                    onChange={(value, date) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col column="col-md-4">
              <Input
                register={register("email")}
                text="Email"
                // placeholder="Razão Social..."
                type="email"
                error={errors?.email?.message}
              />
            </Col>
            <Col column="col-md-4">
              <InputMask
                mask={"(99)99999-9999"}
                register={register("telefone")}
                text="Fone"
                // placeholder="Razão Social..."
                type="text"
                error={errors?.telefone?.message}
              />
            </Col>
          </Row>
        </Fieldset>
      
        {(id&&data.length>0)&&(<Fieldset title={"Cadastro de Whatsapp"}>
          <Modal
              style={{ padding: 1 }}
              title={targetWhats.descricao}
              open={isModalOpen}
              onCancel={() => showModalDelete()}
              footer={
                <>
                  <ButtonAnt style={{color:"red"}} onClick={() => deleteWhatsapp(targetWhats.idwhatsapp)}>Excluir</ButtonAnt>
                  <ButtonAnt onClick={() => showModalDelete()}>Cancelar</ButtonAnt>
                </>
              }
            >
            <Style.TextDescrption>
              O Numero {targetWhats.numero}, será excuido.
            </Style.TextDescrption>
          </Modal>
          <Modal
              style={{ padding: 1 }}
              title={"Cadastrar Whatsapp"}
              open={isModalOpenInsert}
              onCancel={() => showModalInsert()}
              footer={
                <>
                  <ButtonAnt onClick={() => registerNumber()} style={{marginRight:"25px",color:"#ffffff" ,background:'#03A9F4'}}>Cadastrar</ButtonAnt>
                  <ButtonAnt onClick={() => showModalInsert()}>Cancelar</ButtonAnt>
                </>
              }
            >
              <Style.LoadingWhats visible={loadingWhats}> <Spin indicator={<LoadingOutlined style={{ fontSize: 47 }} spin />} /></Style.LoadingWhats>
            <Row>
                  <Col column="col-md-2">
                    <InputMask
                      register={register("whatsappNumber")}
                      mask={"(99)99999-9999"}
                      text="Número"
                      type="text"
                      error={errors?.telefone?.message}
                    />
                </Col>
              </Row>
          </Modal>
          <Modal
              style={{ padding: 1 }}
              // title={"Cadastrar"}
              open={isModalOpenQrCode}
              onCancel={() => showModalQrCode()}
              footer={<></>}
              afterClose={()=>setRealoadTable((open) => !open)}
            >
            <Style.ContaineQrcode>
                {React.createElement('img',{src:`data:image/jpeg;base64,${qrCode64}`})}
            </Style.ContaineQrcode>
          </Modal>
            <ButtonAnt onClick={() => showModalInsert()} style={{margin:'0px 0px 5px 15px'}}>Inserir <PlusOutlined /></ButtonAnt>
            <Style.ContainerTable>
              <Table columns={columns} pagination={{pageSize:20}} dataSource={data}  onChange={onChange}/>
            </Style.ContainerTable>
        </Fieldset>)}
        <Style.Container>
          <LinkButton to="/home/empresas" color="default">
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
