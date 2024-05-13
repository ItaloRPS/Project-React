import * as Style from "./styles";
import { Form, Row, Col } from "../../components/Form";
import { Button } from "../../components/Button";
import { SelectLabel } from "../../components/SelectLabel";
import { Fieldset } from "../../components/Fieldset";
import { Article } from "../../components/Article";
import { message, Table, Tag, Button as ButtonAnt, Tooltip, Modal} from "antd";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LinkButton } from "../../components/LinkButton";

import { Lojista } from "../../control/lojista/control-lojista";
import { Company } from "../../control/company/control-company";
import { Loading } from "../../components/Loading";
import { Estado } from "../../control/estado/control-estado";
import { Cidade } from "../../control/cidade/control-cidade";
import { Pais } from "../../control/pais/control-pais";
import { DeleteOutlined } from "@ant-design/icons";

const schema = Yup.object().shape({});


export const CadastroLojista= () => {
  const navigate = useNavigate();
  const [arrayEmpresa, setArrayEmpresa] = useState();
  const [newUser, setNewUser] = useState();
  const [user, setUser] = useState([]);
  const [regions,setRegions] = useState([]);
  const [empresaGlobal, setEmpresaGlobal] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState();
  const [paises, setPaises] = useState([])
  const [estados, setEstados] = useState([])
  const [cidades, setCidades] = useState([])
  const [id, setId] = useState({});
  const { uuid } = useParams();

  const { register, handleSubmit, formState, control, reset, watch, getFieldState,trigger} = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: { },
  });

  const { errors, isSubmitting } = formState;
  
  useEffect(() => {
    getUser().then((result) => {
      setId(result.id)
      const regions = result.data?.map((data) => ({
                        key: data.idlojista,
                        empresa: data.empresa?.nome,
                        idempresa: data.empresa?.idempresa,
                        idpais: data.pais?.idpais,
                        pais: data.pais?.descricao,
                        idestado: data.estado?.idestado,
                        estado: data.estado?.descricao,
                        idcidade: data.cidade?.idcidade,
                        cidade: data.cidade?.descricao,
                      }))||[];
      setRegions(regions)
    });

    getEmpresa().then((data) => {
      setArrayEmpresa(data);
    });

    getPais().then((data) => {
      setPaises(data)
    });

  }, []);

  useEffect(()=>{},[regions])

  const handleSubmitData = (data, event) => {
    if (regions.length) {
      saveUser(regions);
    } else {
      message.warning(`"Não foi possivel salvar lojista sem Região."`, 2);
    }
  };

  const getEmpresa = async () => {
    const EmpresaData = await Company.listCombo();
    if (EmpresaData?.status && EmpresaData.status === 200 && EmpresaData.data) {
      return EmpresaData.arrayCompany;
    }
  };

  const setNameEmpresa = (idempresa) => {
    const empresa = arrayEmpresa.filter((data)=>{
      return(idempresa == data.value)
    })
    return empresa[0]
  };

  const getUser = async () => {
    if (!uuid) {
      return [];
    }
    const UserData = await Lojista.get(uuid);
    const user = UserData.data;
    if (UserData?.status && UserData.status === 200 && user) {
      return UserData.data[0].User?({...UserData.data[0].User,data:UserData.data}):UserData.data[0];
    }else{
      return {}
    }
  };

  const getPais = async () => {
    const PaisData = await Pais.listCombo();
    if (PaisData?.status && PaisData.status === 200 && PaisData.data) {
      return PaisData.arrayCountry;
    }
  };
  const setNamePais = (idpais) => {
    const pais = paises.filter((data)=>{
      return(idpais == data.value)
    })
    return pais[0]
  };

  const getEstado = async (idpais) => {
    reset((data)=>({...data,idestado:''}))
    idpais = idpais||0
    const EstadoData = await Estado.listCombo(idpais);
    if (EstadoData?.status && EstadoData.status === 200 && EstadoData.data) {
      setEstados(()=>EstadoData.arrayEstado)
    }
  };
  const setNameEstado = (idestado) => {
    const estado = estados.filter((data)=>{
      return(idestado == data.value)
    })
    return estado[0]
  };
  
  const getCity = async (state) => {
    
    reset((data)=>({...data,idcidade:''}))
    state = state||0
    const CityData = await Cidade.getAllCity(state);
    if (CityData?.status && CityData.status === 200 && CityData.data) {
      setCidades(()=>CityData.arrayCity)
    }
  };

  const setNameCity = (idcidade) => {
    const cidade = cidades.filter((data)=>{
      return(idcidade == data.value)
    })
    return cidade[0]
  };



  const saveUser = async (regions) => {
   const dataRegions = regions.map((region)=>{
    if (region.key === '') {
      return{
        idempresa:region.idempresa,
        idUser:parseInt(id),
        idpais:region.idpais,
        idestado:region.idestado,
        idcidade:(region.idcidade==''?undefined:region.idcidade),
      }
    }
   })
   const data = dataRegions.filter(region=> region !==undefined) 
    setLoading(true)
    const result = await Lojista.add(data);
    if (result.status && result.status === 201) {
      setLoading(false)
      message.success("Usuário cadastrado com sucesso.",2,navigate(`/home/lojistas`) );
    } else {
      setLoading(false)
      message.error(`${result.data}`, 2);
    }
  };

  const showModal = (data) => {
    setIsModalOpen((open)=>!open);
    setSelectedRegion(data)
  };

  const addRegion = () => {
    const dataFrom = watch()
    if (!dataFrom.idempresa || !dataFrom.idpais || !dataFrom.idestado) {
      message.warning(`Necessário informar a "Empresa", "Pais" e "Estado".`, 4);
      return ''
    }
    const data = {
      key: '',
      empresa: setNameEmpresa(dataFrom.idempresa)?.label,
      idempresa: dataFrom.idempresa,
      idpais: dataFrom.idpais,
      pais: setNamePais(dataFrom.idpais)?.label,
      idestado: dataFrom.idestado,
      estado: setNameEstado(dataFrom.idestado)?.label,
      idcidade: dataFrom.idcidade,
      cidade: setNameCity(dataFrom.idcidade)?.label,
    }
    
    setRegions((regions)=>[...regions,data])
    reset((data)=>({...data,idpais:'',idestado:'',idcidade:''}))
  };
    const removeRegion = (data) => {
      setRegions((regions)=>{
       return regions.filter((region,i)=>{
          if (JSON.stringify(region) !== JSON.stringify(data)) {
            return regions; 
          }
        })
      })
      showModal()
    };

    const deleteRegion = async (data)=>{
      const deteleted = await Lojista.delete(data.key)
      if (deteleted.status === 200 && deteleted.statusText =='OK') {
        removeRegion(data)
      }else{
        message.error(`Não foi possivel remover registro.`, 2);
      }

    }
  const removeOrDeleteRegion = (data)=>{
    if(data.key === ''){
      removeRegion(data)
    }else{
      deleteRegion(data)
    }
  }

  const columns = [
    {
      title: "Empresa",
      dataIndex: "empresa",
    },
    {
      title: "Pais",
      dataIndex: "pais",
    },
    {
      title: "Estado",
      dataIndex: "estado",
    },
    {
      title: "Cidade",
      dataIndex: "cidade",
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

    {
      title: '',
      dataIndex: 'actions',
      render: (_, record) => (
        <Tooltip placement="top" title="Excluir">
          <ButtonAnt onClick={()=>showModal(record)}>
            <DeleteOutlined/>
          </ButtonAnt>
        </Tooltip>
      )
    }
  ];
  const dataTable = regions;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
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
  
  if((id&&!regions.length &&!paises.length)|| id&&!paises.length){
    return (<Loading loading={true}/>)
  }
  return (
    <Article title="Lojista">
      {contextHolder}
      <Modal style={{padding:1}} title={""} open={isModalOpen}  onCancel={()=>showModal()} footer={<Style.Footer><ButtonAnt type="primary" onClick={()=>removeOrDeleteRegion(selectedRegion)}>Excluir</ButtonAnt><ButtonAnt onClick={()=>showModal()}>Cancelar</ButtonAnt></Style.Footer>}><h4>A Região será removida</h4></Modal>
      <Loading loading={loading}/>
      <Form onSubmit={handleSubmit(handleSubmitData)}>
        <Fieldset title={"Empresa"}>
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
          </Row>
        </Fieldset>
        <Fieldset title={"Vincular Região"}>
          <Row>
          <Col column="col-md-3">
              <Controller
                control={control}
                name="idpais"
                render={({ field }) => (
                  <SelectLabel
                    field={field}
                    text="Pais"
                    options={paises}
                    error={errors?.idpais?.message}
                    onChange={(value, date) => {
                      field.onChange(value);
                      getEstado(value)
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
                    register={register('idestado')}
                    error={errors?.idestado?.message}
                    options={estados}
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
                name="idcidade" // Corrigido para "idcidade"
                render={({ field }) => (
                  <SelectLabel
                    field={field}
                    text="Cidade"
                    error={errors?.idcidade?.message}
                    register={register('idcidade')} // Corrigido para 'idcidade'
                    options={cidades}
                    onChange={(value, date) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />
            </Col>
            <Col column="col-md-1">
              <ButtonAnt style={{marginTop: '31%'}}
                onClick={()=> addRegion()}>
                Adicionar
              </ButtonAnt>
            </Col>
          </Row>
          <Row>
            <Col column="col-md-12">
              <Table
                // rowSelection={rowSelection}
                columns={columns}
                dataSource={dataTable}
              />
            </Col>
          </Row>
        </Fieldset>
        <Style.Container>
          <LinkButton to="/home/lojistas" color="default">
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
