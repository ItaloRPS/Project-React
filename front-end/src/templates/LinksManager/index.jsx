import * as Style from './styles'
import { Article } from '../../components/Article'
import { LinkButton } from '../../components/LinkButton'
import { Form, Row, Col } from "../../components/Form";
import { Input } from "../../components/Input";
import { message } from "antd";
import { Fieldset } from '../../components/Fieldset'
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from '../../components/Button';
import { Lead } from "../../control/lead/control-lead";

const schema = Yup.object().shape({
  hashLink: Yup.string().required("Necessário informar um link."),
});


export const LinksManager = () =>{

  const { register, handleSubmit, formState, control, reset } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      hashLink: "",
    },
  });
  const { errors, isSubmitting } = formState;
  
  const handleSubmitData = (data, event) => {
      clearLinks(data.hashLink);
  };

  const clearLinks = async (data) => {
    const hash = data.split('/').reverse()[0]
    const result = await Lead.deleteLinks(hash);
    if (result && result.status && result.data.message == "sucesso") {
      reset({hashLink:""})
      message.success("Registros excluidos.", 2 );
    } else {
      message.error(`"Não foi possivel excluidos registros. "${result.data.error}`, 4);
    }
  };

     return (
      <Article title="Gerenciamento de links">
        <Style.Container>
          <Form onSubmit={handleSubmit(handleSubmitData)}>
          <Fieldset title={"Limpar registros do Lead"}>
              <Row>
               <Col column="col-md-4">
                  <Input
                    register={register("hashLink")}
                    text="Link vinculado"
                    placeholder="link..."
                    type="text"
                    error={errors?.hashLink?.message}
                  />
                </Col>
               <Col column="col-md-2">
                   <Button type="submit" disabled={isSubmitting}> Limpar </Button>
                </Col>
             </Row>
            </Fieldset>
            <Style.ContainerLink>
              <LinkButton to="/home/dashboard" color="default">
                {" "}
                Voltar
              </LinkButton>
            </Style.ContainerLink>
          </Form>
        </Style.Container>
      </Article>
     )
}
