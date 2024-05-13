import * as Style from "./styles";
import { Form, Row, Col } from "../../components/Form";
import { Input } from "../../components/Input";
import { InputCheck } from "../../components/InputCheck";
import { Button } from "../../components/Button";
import { SelectLabel } from "../../components/SelectLabel";
import { SwitchLabel } from "../../components/SwitchLabel";
import { UploadFile } from "../../components/UploadFile";
import { Fieldset } from "../../components/Fieldset";
import { Article } from "../../components/Article";
import { message } from "antd";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LinkButton } from "../../components/LinkButton";

import { Product } from "../../control/product/control-product";
import { Company } from "../../control/company/control-company";
import { Files } from "../../control/files/control-file";
import { Loading } from "../../components/Loading";

const schema = Yup.object().shape({
  nome: Yup.string().required("Necessário informar um nome para o produto."),
  url: Yup.string().when('idconfigproduto', {
    is: (v) => v === 2,
    then: (schema) => schema.required('Necessário informar uma URL.')
})
});

export const CadastroProduto = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [img, setImg] = useState([{ name: "image.png", status: "done" }]);
  const [imgRegister, setImgRegister] = useState([{ name: "image.png", status: "done" }]);
  const [imgBackground, setImgBackground] = useState([{ name: "image.png", status: "done" }]);
  const [imgBanner, setImgBanner] = useState([{ name: "image.png", status: "done" }]);
  const [empresa, setEmpresa] = useState();
  const [prodConfig, setProdConfig] = useState();
  const [byUrl, setByUrl] = useState(false);
  const [loading, setLoading] = useState(false);
  const [produto, setProduto] = useState({});
  const [id, setId] = useState();
  const { uuid } = useParams();

  const { register, handleSubmit, formState, control, reset } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      nome: "",
      necessitacadastro: false,
      editatemplate: false,
      idconfigproduto: 1,
      status: true,
      idempresa: null,
      configdescricao: null
    },
  });
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    
    getProduct().then((data) => {
      reset(data);
      setProduto(data)
    });
    
    getEmpresa().then((data) => {
      setEmpresa(data);
    });
    
    getConfigs().then((data) => {
      let dataconfig = data.data.result.map((config)=>{
        return {
          value:config.idconfigproduto,
          label:config.nome
        }
      })
      setProdConfig(dataconfig);
    });
  }, []);

  const handleSubmitData = (data, event) => {
    console.log(data);
    const dataBase = { idempresa: 1, status: "A", imagem: "file" };
    const newDate = { ...dataBase, ...data };
    const dataSend = {
      ...newDate,
      editatemplate: newDate.editatemplate ? 1 : 0,
      necessitacadastro: newDate.necessitacadastro ? 1 : 0,
      status: newDate.status ? "A" : "I",
      imagem: encodeURI((img.thumbUrl || null)),
      configimagem:encodeURI((imgRegister.thumbUrl||null)),
      configimagemfundo:encodeURI((imgBackground.thumbUrl||null)),
      configimagembaner:encodeURI((imgBanner.thumbUrl||null))
    };
    if (id) {
      udpateProduct(dataSend);
    } else {
        saveProduct(dataSend)
    }
  };

  const getEmpresa = async () => {
    const EmpresaData = await Company.listCombo();
    if (EmpresaData?.status && EmpresaData.status === 200 && EmpresaData.data) {
      return EmpresaData.arrayCompany;
    }
  };
  
  const getConfigs = async () => {
    const configData = await Product.getConfig();
    if (configData?.status && configData.status === 200 && configData.data) {
      return configData;
    }else{
      return {data:{result:[]}}
    }
  };

  const getProduct = async () => {
    if (!uuid) {
      return "";
    }
    const ProductData = await Product.get(uuid);
    const produto = ProductData.data.result;
    if (ProductData?.status && ProductData.status === 200 && produto) {
      const {
        idproduto,
        idempresa,
        nome,
        necessitacadastro,
        editatemplate,
        idconfigproduto,
        status,
        imagem,
        url,
        configimagembaner,
        configimagemfundo,
        configimagem,
        configdescricao,
        configlinkbaner,
      } = ProductData.data.result;
      setId(idproduto)
      const arrayconfigimagem = configimagem ? configimagem.split("/") : [];
      const nameconfigimagem = arrayconfigimagem.length > 0 ? arrayconfigimagem[arrayconfigimagem.length - 1] : "";
  
      const arrayconfigimagembaner = configimagembaner ? configimagembaner.split("/") : [];
      const nameconfigimagembaner = arrayconfigimagembaner.length > 0 ? arrayconfigimagembaner[arrayconfigimagembaner.length - 1] : "";
  
      const arrayconfigimagemfundo = configimagemfundo ? configimagemfundo.split("/") : [];
      const nameconfigimagemfundo = arrayconfigimagemfundo.length > 0 ? arrayconfigimagemfundo[arrayconfigimagemfundo.length - 1] : "";
  
      setImg((e) =>(e[0]={
        name: "image.png",
        status: "done",
        thumbUrl: decodeURI(produto.imagem||''),
      }));

      setImgRegister((e)=>e[0]={
        name: nameconfigimagem,
        status: 'done',
        thumbUrl: decodeURI(produto.configimagem||''),
      })

      setImgBanner((e)=>e[0]={
        name: nameconfigimagembaner&&"image.png",
        status: 'done',
        thumbUrl: decodeURI(produto.configimagembaner||''),
      })

      setImgBackground((e)=>e[0]={
        name: nameconfigimagemfundo,
        status: 'done',
        thumbUrl: decodeURI(produto.configimagemfundo||''),
      })

      idconfigproduto==2&&setByUrl(true)
      return {
        idempresa,
        nome,
        status: (status === "A" ? true : false),
        necessitacadastro: (necessitacadastro === 1 ? true : false),
        editatemplate: (editatemplate === 1 ? true : false),
        idconfigproduto,
        configdescricao,
        configlinkbaner,
        url,
      };
    }
  };

  const saveProduct = async (data) => {
    setLoading(true)
    console.log("DATA", JSON.stringify(data));
    const result = await Product.add(data);
    if (result.status && (result?.status === 200 || result?.status === 201)) {
      message.success("Produto cadastrado com sucesso.", 2, navigate("/home/produtos") );
    } else {
      setLoading(false)
      message.error(`"Não foi possivel cadastrar Produto."`, 2);
    }
  };

  const udpateProduct = async (data) => {
    setLoading(true)
    const dataUpdate = { ...data };
    console.log(JSON.stringify(data));
    const result = await Product.update(id, dataUpdate);
    if (result.status && (result?.status === 200 || result?.status === 201)) {
      message.success("Produto atualizado com sucesso.", 2, navigate("/home/produtos") );
    } else {
      setLoading(false)
      message.error(`"Não foi possivel atualizar Produto."`, 2);
    }
  };
  if(uuid && !Object.keys(produto).length){
    return <Loading loading={true}/>
  }
  return (
    <Article title="Produto">
      {contextHolder}
      <Loading loading={loading}/>
      <Form onSubmit={handleSubmit(handleSubmitData)}>
        <Fieldset title={id ? "Editar Produto" : "Cadastro de Produto"}>
          <Row>
            <Col column="col-md-1">
              <div>
                <UploadFile
                  register={register("teste")}
                  text="Alterar"
                  typedisplay="picture-card"
                  defaultFileList={[img]}
                  customRequest={({
                    action,
                    data,
                    file,
                    filename,
                    headers,
                    onError,
                    onProgress,
                    onSuccess,
                    withCredentials,
                  }) => {
                    const formData = new FormData();
                    formData.append("file", file);
                    Files.upload(formData)
                      .then((result) => {
                        if (result.status && result.status === 201)
                          setImg({
                            name: "image.png",
                            thumbUrl: result.data.url,
                            status: "done",
                          });
                        onSuccess(file);
                      })
                      .catch((e) => {
                        onError(e.error, file);
                      });
                  }}
                />
              </div>
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
              <Controller
                control={control}
                name="idempresa"
                render={({ field }) => (
                  <SelectLabel
                    field={field}
                    text="Empresa"
                    options={empresa}
                    onChange={(value, date) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />
            </Col>
            <Col column="col-md-4">
              <Input
                register={register("nome")}
                text="Nome"
                placeholder="Nome..."
                type="text"
                error={errors?.nome?.message}
              />
            </Col>
            <Col column="col-md-4">
              <Controller
                control={control}
                name="idconfigproduto"
                render={({ field }) => (
                  <SelectLabel
                    field={field}
                    text="Configuração"
                    options={prodConfig}
                    onChange={(value, date) => {
                      field.onChange(value);
                      value==2?setByUrl(true):setByUrl(false)
                    }}
                  />
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col column="col-md-4" visible={byUrl.toString()}>
              <Input
                  register={register("url")}
                  text="Url"
                  placeholder="Url..."
                  type="text"
                  error={errors?.url?.message}
                />
              </Col>
          </Row>
          <Row>
            <Col column="col-md-2">
              <InputCheck register={register("necessitacadastro")}>
                Necessita Cadastro
              </InputCheck>
            </Col>
            <Col column="col-md-2">
              <InputCheck register={register("editatemplate")}>
                Editar Template
              </InputCheck>
            </Col>
          </Row>
          <Row>
              <Col column="col-md-4">
                <UploadFile
                  text="Imagem do Banner"
                  defaultFileList={[imgBanner]}
                  customRequest={({
                    action,
                    data,
                    file,
                    filename,
                    headers,
                    onError,
                    onProgress,
                    onSuccess,
                    withCredentials,
                  }) => {
                    const formData = new FormData();
                    formData.append("file", file);
                    Files.upload(formData).then((result) => {
                        if (result.status && result.status === 201)
                          setImgBanner({
                            name: "image.png",
                            thumbUrl: result.data.url,
                            status: "done",
                          });
                        onSuccess(file);
                      })
                      .catch((e) => {
                        onError(e.error, file);
                      });
                  }}
                />
              </Col>
              <Col column="col-md-4">
                <UploadFile
                  text="Banner da Empresa"
                  defaultFileList={[imgRegister]}
                  customRequest={({
                    action,
                    data,
                    file,
                    filename,
                    headers,
                    onError,
                    onProgress,
                    onSuccess,
                    withCredentials,
                  }) => {
                    const formData = new FormData();
                    formData.append("file", file);
                    Files.upload(formData).then((result) => {
                        if (result.status && result.status === 201)
                        setImgRegister({
                            name: "image.png",
                            thumbUrl: result.data.url,
                            status: "done",
                          });
                        onSuccess(file);
                      })
                      .catch((e) => {
                        onError(e.error, file);
                      });
                  }}
                />
              </Col>
          </Row>
        </Fieldset>
        <Style.Container>
          <LinkButton to="/home/produtos" color="default">
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
