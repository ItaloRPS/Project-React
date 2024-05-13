import * as Style from "./styles";
import { Form, Row, Col } from "../../components/Form";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { SelectLabel } from "../../components/SelectLabel";

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
import { Modelo } from "../../control/modelo/control-modelo";
import { Lote } from "../../control/lote/control-lote";
import { Loading } from "../../components/Loading";

const schema = Yup.object().shape({
  idproduto: Yup.string().required("Necessário informar produto."),
  idmodelo: Yup.string().required("Necessário informar template."),
  codigo: Yup.string().required("Necessário informar código."),
  quantidade: Yup.string().required("Necessário informar quantidade."),
});

export const CadastroLote = () => {
  const navigate = useNavigate();
  const [produto, setProduto] = useState()
  const [modelo, setModelo] = useState([])
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const { register, handleSubmit, formState, control, reset } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      idproduto: null,
      idmodelo: null,
      codigo: null,
      quantidade: null,
      liberado: "N"
    },
  });
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    getProduto().then((data) => {
      setProduto(data)
    });

    getModelo().then((data) => {
      setModelo(data)
    });
  }, []);

  const handleSubmitData = (data, event) => {
    console.log(data);
    console.log("event", event);
    saveLote(data);
  };
  const getProduto = async () => {
    const ProdutoData = await Product.listCombo();
    if (ProdutoData?.status && ProdutoData.status === 200 && ProdutoData.data) {
      return ProdutoData.arrayProduto;
    }
  };

  const getModelo = async () => {
    const ModeloData = await Modelo.listCombo();
    if (ModeloData?.status && ModeloData.status === 200 && ModeloData.data) {
      return ModeloData.arrayModelo;
    }
  };
 

  const saveLote = async (data) => {
    setLoading(true)
    data.quantidade = parseInt(data.quantidade)
    data.idproduto  = parseInt(data.idproduto)
    data.idmodelo = parseInt(data.idmodelo)
    console.log(JSON.stringify(data));
    const result = await Lote.add(data);
    if (result.status && (result?.status === 200 || result?.status === 201) && data.message !== 'erro') {
      message.success("Lote cadastrada com sucesso.",2, navigate("/home/lotes") );
    } else {
      setLoading(false)
      message.error(`"Não foi possivel cadastrar Lote."`, 2);
    }
  };

  return (
    <Article title="Lote">
      {contextHolder}
      <Loading loading={loading}/>
      <Form onSubmit={handleSubmit(handleSubmitData)}>
        <Fieldset title={"Cadastro de Lote"}>
          <Row>
            <Col column="col-md-4">
              <Input
                register={register("codigo")}
                text="Código"
                type="text"
                error={errors?.codigo?.message}
              />
            </Col>
            <Col column="col-md-4">
              <Controller
                control={control}
                name="idproduto"
                render={({ field }) => (
                  <SelectLabel
                    field={field}
                    text="Produto"
                    error={errors?.idproduto?.message}
                    register={register('idproduto')}
                    options={produto}
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
                name="idmodelo"
                render={({ field }) => (
                  <SelectLabel
                    field={field}
                    text="Modelo"
                    error={errors?.idmodelo?.message}
                    register={register('idmodelo')}
                    options={modelo}
                    onChange={(value, date) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />
            </Col>
            <Col column="col-md-2">
              <Input
                register={register("quantidade")}
                text="Quantidade"
                type="text"
                error={errors?.quantidade?.message}
              />
            </Col>
          </Row>
        </Fieldset>
        <Style.Container>
          <LinkButton to="/home/lotes" color="default">
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
