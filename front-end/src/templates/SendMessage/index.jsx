import * as Style from "./styles";
import { Form, Row, Col } from "../../components/Form";
import { Button } from "../../components/Button";
import { SelectLabel } from "../../components/SelectLabel";
import { SwitchLabel } from "../../components/SwitchLabel";
import { Fieldset } from "../../components/Fieldset";
import { Article } from "../../components/Article";
import { message, Modal, Button as ButtonAnt, Table } from "antd";

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LinkButton } from "../../components/LinkButton";

import { Textarea } from "../../components/Textarea";
import { InputMask } from "../../components/InputMask";

import { Company } from "../../control/company/control-company";
import { Product } from "../../control/product/control-product";
import { Lead } from "../../control/lead/control-lead";
import { Whatsapp } from "../../control/whatsapp/control-whatsapp";
import {Messages} from '../../control/messages/control-messages'
import { Estado } from "../../control/estado/control-estado";
import { Cidade } from "../../control/cidade/control-cidade";


import { Loading } from "../../components/Loading";
import { Input } from "../../components/Input";

const schema = Yup.object().shape({
     idempresa: Yup.string().required("Necessário informar a empresa."),
     descricao: Yup.string().required("Necessário informar uma descrição para a mensagem."),
     message: Yup.string().required("Necessário informar a mensagem."),
     idproduto: Yup.string().required("Necessário informar o produto."),
     idestado: Yup.string().required("Necessário informar a estado."),
     nDisparo: Yup.string().required("Necessário informar o número disparo."),
     dtAgendamento: Yup.string().when('agendar', {
       is: (v) => v,
       then: (schema) => schema.required('Necessário informar uma Data para o agendamento.')
   }),
     hrAgendamento: Yup.string().when('agendar', {
       is: (v) => v,
       then: (schema) => schema.required('Necessário informar uma Horario para o agendamento.')
   })
   });

export const SendMessage = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [arrayEmpresa, setArrayEmpresa] = useState();
  const [screenSize, setScreenSize] = useState("big");
  const [empresa, setEmpresa] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenLeads, setIsModalOpenLeads] = useState(false);
  const [whatsPhones, setWhatsPhones] = useState([]);
  const [whatsPhone, setWhatsPhone] = useState();
  const [phoneTest, setPhoneTest] = useState();
  const [program, setProgram] = useState(true);
  const [products, setProducts] = useState([])
  const [arrayProdutos, setArrayProdutos] = useState([])
  const [filter, setFilter] = useState({})
  const [productName, setProductName] = useState([])
  const [lotes, setLotes] = useState([])
  const [leadsLote ,setLeadsLote] = useState([])
  const [loading, setLoading] = useState(false);
  const [estado, setEstado] = useState()
  const [cidade, setCidade] = useState()
  const { id } = useParams();

  const { register, handleSubmit, formState, control, reset, getValues } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
     agendar: false,
    },
  });
  const { errors, isSubmitting } = formState;

  useEffect(() => {
     window.innerWidth <= 768 ? setScreenSize("small") : setScreenSize("big");
     getWhatsapp().then((data) => {
      setWhatsPhones(data);
    });
    getEmpresa().then((data) => {
     setArrayEmpresa(data);
    });
    getProducts().then((data) => {
      const products = data.map((prod)=>{
        return {
          label: prod.produto,
          value: prod.idproduto
        }
      })
      setArrayProdutos(products);
    });

    getEstado().then((data) => {
      setEstado(data)
    });

  }, [empresa]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });

  }, [empresa,filter]);


  const sendPhone = register("sendPhone");
  sendPhone.onChange = (e) =>
    setPhoneTest(e.target.value );

  const  handleSubmitData = (data, event) => {

    const msgData = {
      idempresa: (empresa||JSON.parse(sessionStorage.getItem('user')).data.idempresa[0]),
      texto: data.message,
      descricao: data.descricao,
      data: data.dtAgendamento,
      hora: data.hrAgendamento,
      idwhatsapp:parseInt(data.nDisparo),
      ...filter,
      lotes:lotes
    }
    if(!lotes.length){
      message.warning(`"Necessário selecionar o(s) produto(s)."`, 2);
    return
    }
    salveSendMessage(msgData)

  };

  const getWhatsapp = async () => {
    if(!empresa){
      return []
    }
     const whatsData = await Whatsapp.findAllByCompany(empresa);
     if (whatsData?.status && whatsData.status === 200 && whatsData.data) {
      if(whatsData.data.length){
        return  whatsData.data.map(phones=>{
              return {label: phones.numero, value: phones.idwhatsapp}
            })
      }
       return [];
     }
   };

  const getEmpresa = async () => {
     const EmpresaData = await Company.listCombo();
     if (EmpresaData?.status && EmpresaData.status === 200 && EmpresaData.data) {
       return EmpresaData.arrayCompany;
     }
   };

  const getLeads = async (idlote) => {
    const {idestado,idcidade} = filter
    const leadFilter= {}
    if (idestado) {
      leadFilter.idestado = idestado
    }if (idcidade) {
      leadFilter.idcidade = idcidade
    }
    const filterLead = Object.keys(leadFilter).length?(`?${new URLSearchParams(leadFilter).toString()}`):''
     const leads = await Lead.listAllByLote(idlote, filterLead);
     if (leads?.status && leads.status === 200 && leads.data) {
      if(leads.data.result){
        return leads.data.result
      }
      return []
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

   const getProducts = async ()=>{
    if(!empresa){
      return []
    }
    const filterProducts = Object.keys(filter).length?(`?${new URLSearchParams(filter).toString()}`):''
     const ProductData = await Product.listAllByCompany(empresa,filterProducts)
     if(ProductData?.status && ProductData.status === 200 && ProductData.data.result?.length){
     const retorno = ProductData.data.result.sort((a, b) => b.idproduto - a.idproduto);
       return retorno
     }
   }


   const filterProducts = (element,value)=>{
    setFilter((prev)=>prev = {...prev,[element]:value})
    setFilter((filter) => {
      const filteredFilter = Object.fromEntries(
        Object.entries(filter).filter(([key, value]) => value !== null && value !== undefined)
      );
      return filteredFilter
    });
  }

   const showModal = () => {
     setIsModalOpen((open)=>!open);
   };

   const showModalLeads = (produto, idlote) => {
     setProductName(produto)
     getLeads(idlote).then(data=> {
       setLeadsLote(data)
      console.log(data)
     })
     setIsModalOpenLeads((open)=>!open);
   };

   const sendMessage = async () => {
     setIsModalOpen((open)=>!open);
     console.log()

     if (whatsPhone) {
      if (phoneTest?.replace(/[^\d]/g, "").length == 11) {
        if(getValues("message") ==""){
          message.error(`"Não é possivel enviar mensagem sem texto."`, 3)
          return
        }
         const sended = await Messages.sendMessage({
          idwhatsapp:whatsPhone,
          texto:getValues("message"),
          fone:phoneTest
         })
         if(sended.data && sended.data.result && sended.data.result.result == 200){
          message.success(`"Mensagem enviada com sucesso."`, 2);
         }else{
          message.error(`"Não foi possivel enviar mensagem."`, 3);
         }
      }else{
        message.error(`"Número de inválido"`, 3);
      }
     }else{
      console.log(phoneTest.replace(/[()-]/g, '').length)
      message.warning(`"Necessário informar o Número de disparo"`, 3);
     }
   };

   const getLeadsMessage = async (leads)=>{
    const lotes = await Promise.all(leads.map(
        lote=>{
              return getLeads(lote.idlote)
          })
      )
      const leadsData = lotes.flat().map(lead=>{
        return {idlead:lead.idlead}
      })
      return leadsData
   }

   const salveSendMessage = async (msgData)=>{
    setLoading(true)
    const data = {
      ...msgData,
      // lotes: await getLeadsMessage(msgData.lotes)
      lotes: lotes.map(data=>({idlote:data.idlote}))
    }
    const result = await  Messages.add(data);
    if (result.status && (result?.status === 200 || result?.status === 201) && result.data.message != 'erro') {
      message.success("mensagem cadastrada com sucesso.", 2,navigate("/home/mensagens"));
      setLoading(false)
    } else {
      message.error(`"Não foi possivel efetuar cadastro." ${result?.data?.error}`, 2);
      setLoading(false)
    }
   }

   const columns = [
      {
       title: 'Nome',
       dataIndex: 'produto',
       sorter: (a, b) => a.produto.length - b.produto.length,
       sortDirections: ['descend'],
     },
     {
       title: 'Lote',
       dataIndex: 'lote',
       defaultSortOrder: 'descend',
       filters: [
         {
           text: 'Ativo',
           value: 'ATIVO',
         },
         {
           text: 'Inativo',
           value: 'INATIVO',
         },
       ],
       onFilter: (value, record) => record.stutus.props.children.indexOf(value) === 0,
     },
     {
       title: 'Qtd. leads',
       dataIndex: 'quantidade',
     },
     {
       title: '',
       dataIndex: 'leads',
     },
     Table.SELECTION_COLUMN,
     {
       title: '',
       dataIndex: 'check',
     },

   ];


   const data = products?.map((item)=>{
     return {
       key: item.idlote,
       produto: item.produto,
       idlote: item.idlote,
       lote: item.codigoLote,
       quantidade: item.total,
       leads: <ButtonAnt onClick={()=>showModalLeads(item.nome,item.idlote)}>Leads</ButtonAnt>,
     }
   })

   const rowSelection = {
     onChange: (selectedRowKeys, selectedRows) => {
      setLotes(selectedRows)
     },
   };

   const columnsLeads = [

     {
       title: 'Nome',
       dataIndex: 'name',
       sorter: (a, b) => a.name.length - b.name.length,
       sortDirections: ['descend'],
     },
     {
       title: 'Telefone',
       dataIndex: 'telefone',
       defaultSortOrder: 'descend',
     }
   ];

   const dataLeads = leadsLote?.map((item)=>{
     return {
       key: item.idlead,
       name: item.nome,
       telefone: item.telefone,
       batch: '2',
       leads: <ButtonAnt>Leads</ButtonAnt>,
     }
   })

  return (
    <Article title="Envio de mensagens">
    <Loading loading={loading}/>
      {contextHolder}
      <Form onSubmit={handleSubmit(handleSubmitData)}>
        <Fieldset title={"WhatsApp"} overflow='none'>
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
                    error={errors?.idempresa?.message}
                    onChange={(value, date) => {
                      field.onChange(value);
                      setEmpresa(value)
                    }}
                  />
                )}
              />
            </Col>
            <Col column="col-md-1">
              <Controller
                control={control}
                name="agendar"
                render={({ field }) => {
                  return (
                    <SwitchLabel
                      field={field}
                      defaultChecked={field.value}
                      checked={field.value}
                      text="Agendar"
                      onChange={(value, date) => {
                         field.onChange(value);
                         setProgram((e)=>!e)
                       }}
                    />
                  );
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col column="col-md-4">
            <InputMask
                register={register("dtAgendamento")}
                text="Data"
                placeholder="Data..."
                type="text"
                mask='99/99/9999'
                disabled={program}
                error={errors?.dtAgendamento?.message}
              />
            </Col>
            <Col column="col-md-4">
              <InputMask
                register={register("hrAgendamento")}
                text="Hora"
                placeholder="Hora..."
                type="text"
                mask='99:99'
                disabled={program}
                error={errors?.hrAgendamento?.message}
              />
            </Col>
          </Row>
          <Row>
            <Col column="col-md-4">
              <Input
                register={register("descricao")}
                text="Descrição"
                placeholder="Descrição..."
                type="text"
                error={errors?.descricao?.message}
                maxLength={100}
              />
            </Col>
            <Col column="col-md-4">
              <Controller
                control={control}
                name="nDisparo"
                render={({ field }) => (
                  <SelectLabel
                    field={field}
                    text="Número Disparo"
                    options={whatsPhones}
                    error={errors?.nDisparo?.message}
                    onChange={(value, date) => {
                      field.onChange(value);
                      setWhatsPhone(value)
                    }}
                  />
                )}
              />
            </Col>
          </Row>
          <Row>
               <Col column={screenSize == 'big'?"col-md-11":"col-md-8"}>
                    <Controller
                         control={control}
                         name="message"
                         render={({ field }) => (
                              <Textarea
                              field={field}
                              rows='9'
                              text="Mensagem"
                              error={errors?.message?.message}
                              onChange={(value, date) => {
                                   field.onChange(value);
                              }}
                              />
                         )}
                         />
               </Col>
               <Col column={screenSize == 'big'?"col-md-10":"col-md-7"} styles={{textAlign:'end'}}>
                    <ButtonAnt onClick={showModal} style={{marginRight:(screenSize == 'big'?"58px":"26px")}}>
                         Testar Envio
                    </ButtonAnt>
                    <Modal style={{padding:1}} title="Mensagem de teste" open={isModalOpen}  onCancel={()=>showModal()} footer={<Button  onClick={()=>sendMessage()}>Enviar</Button>}  >
                    <Row>
                         <Col column="col-md-6">
                         <InputMask
                              register={sendPhone}
                              text=""
                              placeholder="número..."
                              type="text"
                              error={errors?.sendPhone?.message}
                              mask="(99)99999-9999"
                              />
                         </Col>
                         </Row>
                    </Modal>
               </Col>
          </Row>
          <Row>
          <Col column="col-md-3">
              <Controller
                control={control}
                name="idproduto"
                render={({ field }) => (
                  <SelectLabel
                    field={field}
                    text="Produtos"
                    options={arrayProdutos}
                    error={errors?.idproduto?.message}
                    onChange={(value, date) => {
                      field.onChange(value);
                      filterProducts('idproduto',value)
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
                      getCity(value)
                      filterProducts('idestado',value)
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
                      filterProducts('idcidade',value)
                    }}
                  />
                )}
              />
            </Col>
          </Row>
          <Row styles={{overflow:'auto'}}>
                  <Modal style={{padding:1}} title={productName} open={isModalOpenLeads}  onCancel={()=>showModalLeads()} footer={<Button  onClick={()=>showModalLeads()}>Fechar</Button>}  >
                    <Row>
                         <Col column="col-md-9">
                           <Table columns={columnsLeads} pagination={{pageSize:20}} dataSource={dataLeads} />
                         </Col>
                    </Row>
               </Modal>
            <Col column="col-md-12">
               <Table columns={columns} pagination={{pageSize:20}} dataSource={data}  rowSelection={{ ...rowSelection }}/>
            </Col>
          </Row>
        </Fieldset>
        <Style.Container>
          <LinkButton to="/home/mensagens" color="default">
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
