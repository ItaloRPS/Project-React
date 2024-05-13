import * as Style from "./styles";
import { Article } from "../../components/Article";
import React, { useEffect, useState } from "react";
import { Lead } from "../../control/lead/control-lead";
import { Input } from "antd";
import { Table, Tooltip, Button, Space, Select, message, Modal } from "antd";
import { Fieldset } from "../../components/Fieldset";
import { Row, Col } from "../../components/Form";
import { Loading } from "../../components/Loading";
import {
  DownloadOutlined,
  SearchOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import * as XLSX from 'xlsx';
import { Company } from "../../control/company/control-company";
import { Controller,useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { SelectLabel } from "../../components/SelectLabel";
import { Lojista } from "../../control/lojista/control-lojista";

export const ListaLeads = () => {
  const [userData, setLoadedData] = useState("");
  const tableRef = useState(null);
  const [size, setSize] = useState("large");
  const [empresa, setEmpresa] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [data, setItems] = useState([]); // Data from the API
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenLojista, setIsModalOpenLojista] = useState(false);
  const [leadName, setLeadName] = useState(false);
  const [leadEmail, setLeadEmail] = useState('');
  const [leadId, setLeadId] = useState(null);
  const [reloadLeads, setReloadLeads] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lojistas, setLojistas] = useState([]);
  const [idperfil, setIdperfil] = useState();

  const schema = Yup.object().shape({});

  const { register, handleSubmit, formState, control, reset, watch, getValues, setValue} = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: { },
  });

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    const perfil = JSON.parse(sessionStorage.getItem("user")).data.perfil.idperfil
    setIdperfil(perfil)
    if (user) {
      setLoadedData(user);
    }
    if(!selectedOption){
      const getLead = async () => {
        setLoading(true);
        const LeadData = await Lead.listAll();
        if ( LeadData?.status && LeadData.status === 200 && LeadData.data.result?.length ) {
          setItems(LeadData.data.result);
        } else {
          setLoading(false);
        }
      };
      getLead();
      getEmpresa().then((data) => {
        setEmpresa(data);
      });
      getLojista().then((data) => {
        setLojistas(data);
      });
    }else if(selectedOption){
      const getEmpresaId = async () => {
        const LeadData = await Lead.listId(selectedOption);
        if (LeadData?.status && LeadData.status === 200 &&  LeadData.data.result.length ) {
          if (LeadData.data.result.length > 0) {
            setItems(LeadData.data.result);
          } else {
            message.warning("Empresa sem dados a serem exibidos !");
          }
        } else {
          message.warning("Empresa sem dados a serem exibidos !");
        }
      };
      getEmpresaId()
      getLojista(selectedOption).then((data) => {
        setLojistas(()=>data);
      });
    }
    
  }, [reloadLeads, selectedOption]);

  const handleClick = async () => {
    setLoading(true);
    try {
      if(selectedOption != ""){
        const LeadData = await Lead.listAllByCompanyDownload(selectedOption);
        if (
          LeadData?.status &&
          LeadData.status === 200 &&
          LeadData.data.result.length
        ) {
          const worksheet = XLSX.utils.json_to_sheet(LeadData.data.result);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados');
          XLSX.writeFile(workbook, 'leads.xlsx');
        } else {
          setLoading(false);
          alert("Erro ao gerar o arquivo!");
        }
      } else {
        setLoading(false);
        alert("Selecione empresa!");
      }
    } catch (error) {
      console.error('Erro ao buscar dados do servidor:', error);
      setLoading(false);
      alert("Erro ao gerar o arquivo!");
    }
  };
  

  const getEmpresa = async () => {
    const EmpresaData = await Company.listCombo();
    if (EmpresaData?.status && EmpresaData.status === 200 && EmpresaData.data) {
      return EmpresaData.arrayCompany;
    }
  };

  const getLojista = async (selectedOption) => {
    const lojistaData = await Lojista.listAll(selectedOption);
    if (lojistaData?.status && lojistaData.status === 200 && lojistaData.data) {
      return lojistaData?.data.map((data)=>{
        return {label:data.name, value:data.idlojista}
    })
    }else{
      return []
    }
  };

  const showModal = (data) => {
    setLeadName(data?.nome);
    setLeadEmail(data?.email);
    setIsModalOpen((open) => !open);
  };

  const showModalLojista = (data) => {
    setLeadName(data?.nome);
    setIsModalOpenLojista((open) => !open);
    setValue("lojista",data?.idlojista)
    setLeadId(data?.idlead)
  };

  const deleteLead = async () => {
    const result = await Lead.delete(leadEmail);
    if (result && result.status && result.data.message == "sucesso") {
      showModal();
      message.success("Lead excluido.", 2,setReloadLeads(() => result.data.result[0]));
    } else {
      message.error(`"Não foi possível excluie o Lead."`, 2);
    }
  };
  const updateLead = async () => {
    if(getValues("lojista")){
      const result = await Lead.update(leadId,{idlojista:getValues("lojista")});
      if (result && result.status && result.data.message == "sucesso") {
        showModalLojista();
        message.success("Lojista alterado.", 2,setReloadLeads((data) => !data ));
      } else {
        message.error(`"Não foi possível alterar o Lead."`, 2);
      }
    }
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
      sorter: (a, b) => a.nome.localeCompare(b.nome), // Custom sorter function for 'Name' column
      sortDirections: ["ascend", "descend"],
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
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
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
        record.nome.toString().toLowerCase().includes(value.toLowerCase()),

    },
    {
      title: "Produto",
      dataIndex: "produto",
      key: "produto",
      sorter: (a, b) => a.nome.localeCompare(b.nome), // Custom sorter function for 'Name' column
      sortDirections: ["ascend", "descend"],
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
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
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
        record.nome.toString().toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Lote",
      dataIndex: "codigoLote",
      key: "codigoLote",
      sorter: (a, b) => a.nome.localeCompare(b.nome), // Custom sorter function for 'Name' column
      sortDirections: ["ascend", "descend"],
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
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
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
        record.nome.toString().toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Estato",
      dataIndex: "estato",
      key: "estato",
      sorter: (a, b) => a.estato.localeCompare(b.estato), // Custom sorter function for 'Name' column
      sortDirections: ["ascend", "descend"],
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Age"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
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
        record.estato.toString().toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Cidade",
      dataIndex: "cidade",
      key: "cidade",
      sorter: (a, b) => a.cidade.localeCompare(b.cidade), // Custom sorter function for 'Name' column
      sortDirections: ["ascend", "descend"],
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Age"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
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
        record.cidade.toString().toLowerCase().includes(value.toLowerCase()),
    },
    {
      
      title: "Lojista",
      dataIndex: "lojista",
      key: "lojista",
      sorter: (a, b) => a.lojista.localeCompare(b.lojista), // Custom sorter function for 'Name' column
      sortDirections: ["ascend", "descend"],
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Age"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
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
        record.lojista.toString().toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Telefone",
      dataIndex: "telefone",
      key: "telefone",
      sorter: (a, b) => a.telefone.localeCompare(b.telefone), // Custom sorter function for 'Name' column
      sortDirections: ["ascend", "descend"],
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Age"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
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
        record.telefone.toString().toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, record) => (idperfil ==1 &&
        <Style.Actions>
        <Tooltip placement="top" title="Excluir">
          <Button onClick={() => showModal(record)}>
            <DeleteOutlined />
          </Button>
        </Tooltip>
        <Tooltip placement="top" title="Lojista">
          <Button onClick={() => showModalLojista(record)}>
            <UserAddOutlined/>
          </Button>
        </Tooltip>
        </Style.Actions>
      ),
    },
    // Add more columns as needed
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const handleChange = (value) => {
    setSelectedOption(value);
  };
  if (!data.length && loading) {
    return <Loading loading={true} />;
  }

  return (
    <Article title="Leads">
      <Modal
        style={{ padding: 1 }}
        title={leadName}
        open={isModalOpen}
        onCancel={() => showModal()}
        footer={
          <>
            <Button onClick={() => deleteLead(leadEmail)}>Excluir</Button>
            <Button onClick={() => showModal()}>Cancelar</Button>
          </>
        }
      >
        <Style.TextDescrption>
          O Lead {leadName}, será removido de todos os links aos quais está
          cadastrado.
        </Style.TextDescrption>
      </Modal>
      <Modal
        style={{ padding: 1 }}
        title={leadName}
        open={isModalOpenLojista}
        onCancel={() => showModalLojista()}
        footer={
          <>
            <Button onClick={() => updateLead(leadEmail)}>Salvar</Button>
            <Button onClick={() => showModalLojista(leadId)}>Cancelar</Button>
          </>
        }
      >
        <Row>
           <Col column="col-md-4">
              <Controller
                control={control}
                name="lojista"
                render={({ field }) => (
                  <SelectLabel
                    field={field}
                    text="Lojista"
                    options={lojistas}
                    onChange={(value, date) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />
            </Col>
          </Row>
      </Modal>
      <Row>
        <Col span={10}>
          <Select
            value={selectedOption}
            style={{ width: 200 }}
            onChange={handleChange}
            dropdownStyle={{ maxHeight: 200, overflowY: "auto" }}
          >
            {empresa?.map((option, index) => (
              <Select.Option key={index} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Col>

        <Col span={10}>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            size={size}
            onClick={handleClick}
          >
            Download
          </Button>
        </Col>
      </Row>
      <Style.Container>
        <Fieldset title={"Leads Cadastros"}>
          <Table
            columns={columns}
            pagination={{ pageSize: 20 }}
            dataSource={data}
            onChange={onChange}
          />
        </Fieldset>
      </Style.Container>
    </Article>
  );
};
