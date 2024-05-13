  import * as Style from "./styles";
  import { Article } from "../../components/Article";
  import { LinkButton } from "../../components/LinkButton";
  import { MdAdd, MdModeEditOutline } from "react-icons/md";
  import { useParams, useNavigate } from "react-router-dom";
  import { Table, Tag, Modal, Button, Tooltip, message, Row, Switch, Input, Space} from "antd";
  import { Lote } from "../../control/lote/control-lote";
  import { useEffect, useState, useRef } from "react";
  import { Fieldset } from "../../components/Fieldset";
  import {
    CheckOutlined,
    LayoutOutlined ,
    DownloadOutlined,
    SearchOutlined,
  } from "@ant-design/icons";
  import { write, utils, book_new } from "xlsx";
import { Loading } from "../../components/Loading";


  export const Lotes = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadings, setLoadings] = useState([])
    const [idlote, setIdlote] = useState();
    const [userData, setLoadedData] = useState('');
    const [statusLote, setSatusLote] = useState(false);
    const [reloadLote, setReloadLote] = useState(0);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const btnSwitch = useRef()
    const btnApprove = useRef()

    useEffect(() => {
      const getLote = async () => {
        setLoading(true)
        const LoteData = await Lote.listAll();
        const user = sessionStorage.getItem('user');
        if (user) {
          setLoadedData(JSON.parse(user).data.perfil.nome);
        }

        if (LoteData?.status && LoteData.status === 200 && LoteData.data.result.length) {
          const retorno = LoteData.data.result.sort((compareNames));
          setItems(retorno);
        }
        setLoading(false)
      };
      getLote();
    }, [statusLote, reloadLote]);

    const editLote = (data) => {
      setIdlote(data);
      navigate(`../template/${data}`);
    };
    const showModal = (data,index) => {
      // setLoadings((prevLoadings) => {
      //   const newLoadings = [...prevLoadings];
      //   newLoadings[index] = true;
      //   return newLoadings;
      // })
        setIdlote(data);
        setIsModalOpen(true);
        
    };
    const handleOk = () => {
      const dataLote = {
        liberado: "S",
        idlote: idlote,
      };
      aprovarLote(dataLote);
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const aprovarLote = async (data) => {
      setLoading(true);
      const result = await Lote.aprovar(data.idlote, data);
      if (result.status && (result?.status === 200 || result?.status === 201)) {
        message.success("Lote Ativado com sucesso.", 2, setSatusLote(true));
        setLoading(false);
      } else {
        message.error(`"Não foi possivel aprovar o Lote."`, 2);
        setLoading(false)
      }
    };

    const changeLote = async (data) => {
      const result = await Lote.update(data.idlote, data);
      return result
    };

   
   

    function compareNames(a, b) {
      const liberadoA = a.liberado;
      const liberadoB = b.liberado;
      const idloteA = a.idlote;
      const idloteB = b.idlote;
    
      if (liberadoA < liberadoB) {
        return -1;
      }
      if (liberadoA > liberadoB) {
        return 1;
      }
    
      if (idloteA < idloteB) {
        return 1; 
      }
      if (idloteA > idloteB) {
        return -1; 
      }

      return 0;
    }

    const columns = [
      {
        title: "Código",
        dataIndex: "codigo",
        sorter: (a, b) => a.codigo.length - b.codigo.length,
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
        record.codigo.toString().toLowerCase().includes(value.toLowerCase()),
      },
      {
        title: "Quantidade",
        dataIndex: "quantidade",
        sorter: (a, b) => a.quantidade - b.quantidade,
        sortDirections: ['descend'],
      },
      {
        title: "Liberado",
        dataIndex: "liberado",
        filters: [
          {
            text: "Sim",
            value: "S",
          },
          {
            text: "Não",
            value: "N",
          },
        ],
        onFilter: (value, record) => record.liberado.props.children.indexOf(value) === 0,
      },
      {
        title: "",
        dataIndex: "actions",
      },
    ];
    
    const inactivateBatch = async (lote)=>{
      const dataLote = {
        liberado: btnSwitch.current.checked?"N":'S',
        idlote: lote,
      };
      const result = await changeLote(dataLote);
      if (result.status && (result?.status === 200 || result?.status === 201)) {
        btnSwitch.current.checked = !btnSwitch.current.checked
        message.success(`Lote ${dataLote.liberado=="N"?'Desativo':"Ativo"} com sucesso.`, 2);
        setReloadLote(()=>result.data.result)
      } else {
        message.error(`"Não foi possível ${dataLote.liberado=="N"?'Desativar':"Ativar"} o Lote."`, 2);
        btnSwitch.current.checked = !btnSwitch.current.checked
      }
    }

    const downloadExcel = async (idLote) => {
      const { data } = await Lote.getLink(idLote);
      const excelData = data?.result?.acesso || [];

      const worksheetData = excelData.map((element) => ({ link: element.link }));

      const worksheet = utils.json_to_sheet(worksheetData);
      const workbook = utils.book_new(); // Correção feita aqui
      utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "link.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const data = items.map((item,index) => {
 
      return {
        key: item.idlote,
        codigo: item.codigo,
        quantidade: item.quantidade,
        liberado: (
          <Tag color={item.liberado === "S" ? "green" : "volcano"}>
            {item.liberado === "S" ? "SIM" : "NÃO"}
          </Tag>
        ),
        actions: (
          <Style.Actions size="small">
              {userData == "Admin" && (
                  <Row>
                    {(item.liberado === "N" && (item.dtativacao == "" || item.dtativacao == "null" || item.dtativacao == null) )&&(
                      <Tooltip placement="top" title="Aprovar">
                        <Button
                          type="primary"
                          style={{ background: "green" }}
                          icon={<CheckOutlined />}
                          loading={loadings[index]} 
                          onClick={() => showModal(item.idlote, index)}
                          ref={btnApprove}
                        ></Button>
                      </Tooltip>
                    )}
                    {(item?.idconfigproduto ==1 && item.liberado === "S" ) &&<Tooltip placement="top" title="Tema">
                      <Button
                        type="primary"
                        icon={<LayoutOutlined/>}
                        onClick={() => editLote(item.idlote)}
                      ></Button>
                    </Tooltip>}
                    {item.liberado === "S" && (
                      <Tooltip placement="top" title="Baixar links">
                        <Button
                          icon={<DownloadOutlined />}
                          onClick={() => downloadExcel(item.idlote)}
                        ></Button>
                      </Tooltip>
                    )}
                    {(item.liberado === "S" && (item.dtativacao != "" && item.dtativacao != "null" && item.dtativacao != null) )&&(
                    <Style.BtnSwitch>
                      <Switch checkedChildren="Ativo" unCheckedChildren="Inativo" defaultChecked={(item.liberado === "S"?true:false)} onChange={()=>inactivateBatch(item.idlote)} key={item.idlote} ref={btnSwitch}/>
                    </Style.BtnSwitch>
                    )}
                  </Row>
                  
            )}
            {userData == "Empresa" && (
                  <Row>
                    {(item?.idconfigproduto ==1 && item.liberado === "S" ) &&<Tooltip placement="top" title="Tema">
                      <Button
                        type="primary"
                        icon={<LayoutOutlined/>}
                        onClick={() => editLote(item.idlote)}
                      ></Button>
                    </Tooltip>}
                    {item.liberado === "S" && (
                      <Tooltip placement="top" title="Baixar links">
                        <Button
                          icon={<DownloadOutlined />}
                          onClick={() => downloadExcel(item.idlote)}
                        ></Button>
                      </Tooltip>
                    )}
                    {(item.liberado === "S" && (item.dtativacao != "" && item.dtativacao != "null" && item.dtativacao != null) )&&(
                    <Style.BtnSwitch>
                      <Switch checkedChildren="Ativo" unCheckedChildren="Inativo" defaultChecked={(item.liberado === "S"?true:false)} onChange={()=>inactivateBatch(item.idlote)} key={item.idlote} ref={btnSwitch}/>
                    </Style.BtnSwitch>
                    )}
                  </Row> 
            )}
          </Style.Actions>
        ),
      };
    });
    
    const onChange = (pagination, filters, sorter, extra) => {
      console.log("params", pagination, filters, sorter, extra);
    };
    
    if(!items.length && loading){
      return (<Loading loading={true}/>)
    }

    return (
      <Article title="Lotes">
        <Loading loading={loading}/>
        <Style.Content>
          {/* <Input.Search
            placeholder="Buscar..."
            size="large"
            style={{ width: 100 }}
          /> */}
          <LinkButton to="./cadastrolote" color="success">
            &nbsp;
            <MdAdd /> Novo Lote
          </LinkButton>
        </Style.Content>
        <Style.Container>
          <Fieldset title={"Lotes Cadastrados"}>
            <Table
              columns={columns}
              pagination={{ pageSize: 20 }}
              dataSource={data}
              onChange={onChange}
            />
          </Fieldset>
        </Style.Container>
        <Modal
          title="Aprovar Lote?"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        ></Modal>
      </Article>
    );
  };
