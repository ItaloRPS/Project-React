import * as Style from "./styles";
import { Form, Row, Col } from "../../components/Form";
import { InputCheck } from "../../components/InputCheck";
import { Input } from "../../components/Input";
import { Richeditor } from "../../components/richeditor";
import { Button } from "../../components/Button";
import { Textarea } from "../../components/Textarea";
import { UploadFile } from "../../components/UploadFile";
import { Fieldset } from "../../components/Fieldset";
import { Article } from "../../components/Article";
import { message, ColorPicker } from "antd";
import { SelectLabel } from "../../components/SelectLabel";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import {
  BsWhatsapp,
  BsInstagram,
  BsTwitter,
  BsFacebook,
  BsLinkedin,
  BsFillTelephoneFill,
  BsGlobe,
} from "react-icons/bs";
import { MdEmail, MdPix, MdOutlineShare } from "react-icons/md";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LinkButton } from "../../components/LinkButton";

import { Layout } from "../../control/layout/control-layout";
import { PhoneContainer } from "../../components/PhoneContainer";
import { Files } from "../../control/files/control-file";
import { InputMask } from "../../components/InputMask";
import { Template } from "../../control/template/control-template";
import useAuth from "../../hooks/useAuth";
import { Loading } from "../../components/Loading";

const schema = Yup.object().shape({
  nome: Yup.string().required("Necessário informar um nome"),
});

export const TemplateConfig = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sended, setSensed] = useState(false);
  const [temaSaved, setTemaSaved] = useState([])
  const [templateConfig, setTemplateConfig] = useState({})
  const [hasTheme, SetHasTheme] = useState('false')
  const [screenSize, setScreenSize] = useState("big");
  const [messageApi, contextHolder] = message.useMessage();
  const [imgLogo, setImgLogo] = useState([{ name: "image.png", status: "done", thumbUrl: "" }]);
  const [imgBackground, setImgBackground] = useState([{ name: "image.png", status: "done", thumbUrl: "" }]);
  const [logo, setLogo] = useState();
  const [imagem, setImagem] = useState();
  const [colorBackground, setColorBackground] = useState("#04557a");
  const [colorText, setColorText] = useState("#ffffff");
  const [corContainer, setColorContainer] = useState("#05a3ea");
  // const [urlVideo, setUrlVideo] = useState("");

  const [nomeConfig, setNomeConfig] = useState();
  const [ocupacaoConfig, setOcupacaoConfig] = useState();
  const [textDescrption, setTextDescrption] = useState("<p> Descrição </p>");

  const [whatsapp, setWhatsapp] = useState();
  const [insta, setInsta] = useState();
  const [twiter, setTwiter] = useState();
  const [face, setFace] = useState();
  const [linkedin, setLinkedin] = useState();
  const [pix, setPix] = useState();
  const [site, setSite] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  const [idLayout, setIdLayout] = useState();
  const [conteudo, setConteudo] = useState("");
  const [loaded, setLoaded] = useState(false);

  const { idlote, hash } = useParams();
  const {setIsLead} = useAuth();
  const { register, handleSubmit, formState, control, reset } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      nome: "",
      status: true,
      corFundo: "#04557a",
      corTexto: "#ffffff",
      corContainer: "#05a3ea",
      video: "",
      descricao: "",
    },
  });

  const { errors, isSubmitting } = formState;
  useEffect(() => {
    
    window.innerWidth <= 768 ? setScreenSize("small") : setScreenSize("big");
    getTemplate().then((data) => {
      reset(data);
      setTemplateConfig(data)
      setLoaded(true);
    });
    getTema().then((data) => {
      data?.length&&SetHasTheme('true')
      data?.unshift({label:'',value:''})
      setTemaSaved(data)
    });

    hash&&setIsLead(true);
  }, []);

  useEffect(() => {
    reset();
  }, [loaded]);

  const handleSubmitData = (data, event) => {
    const dataSend = {
      // status:(data.status?'A':'I'),
      logo: imgLogo.thumbUrl || "",
      nome: data.nome,
      ocupacao:data.ocupacao,
      nomeTema: data.nome,
      reutilizar: data.reutilizar ? "S" : "N",
      bgcolor: data.corFundo,
      textcolor: data.corTexto,
      containerColor: data.corContainer,
      imagem: imgBackground.thumbUrl || "",
      video: encodeURI(data.video || ""),
      descricao: data.descricao?.replaceAll("\n", ""),
      temaitem: [
        {
          idtema: idLayout,
          idtemaitem: insta.id,
          link: insta.link,
        },
        {
          idtema: idLayout,
          idtemaitem: whatsapp.id,
          link: whatsapp.link,
        },
        {
          idtema: idLayout,
          idtemaitem: twiter.id,
          link: twiter.link,
        },
        {
          idtema: idLayout,
          idtemaitem: face.id,
          link: face.link,
        },
        {
          idtema: idLayout,
          idtemaitem: linkedin.id,
          link: linkedin.link,
        },
        {
          idtema: idLayout,
          idtemaitem: pix.id,
          link: pix.link,
        },
        {
          idtema: idLayout,
          idtemaitem: site.id,
          link: site.link,
        },
        {
          idtema: idLayout,
          idtemaitem: email?.id,
          link: email?.link,
        },
        {
          idtema: idLayout,
          idtemaitem: phone?.id,
          link: phone?.link,
        },
      ],
    };
    udpateTemplate(dataSend);
  };

  const getTema = async () => {
    const TemaData = await Template.themesByCompany();
    if (TemaData?.status && TemaData.status === 200 && TemaData.data) {
      return TemaData.arrayTemplate;
    }
  };

  const getTemplate = async () => {
    if (!idlote) {
      return "";
    }
    const linksData = {};
    const templateData = await Layout.getByLote(idlote, hash);
    const template = templateData.data.result;
    if (templateData?.status && templateData.status === 200 && template) {
      const { tema: layout, lead } = template;

      const {
        idtema,
        nome,
        ocupacao,
        nomeTema,
        status,
        reutilizar,
        logo,
        imagem,
        video,
        descricao,
        bgcolor = "#04557a",
        textcolor = "#ffffff",
        containerColor = "#05A3EA",
        temaitem,
      } = layout[0];
      setNomeConfig(nome);
      setTextDescrption(descricao);
      setOcupacaoConfig(ocupacao);
      setColorText(textcolor || "#ffffff");
      setColorBackground(bgcolor || "#04557a");
      setColorContainer(containerColor || "#05A3EA");
      setLogo(logo);
      setImagem(imagem);
      setIdLayout(idtema);
      setImgLogo((e) =>(e[0] = { ...e, name: "logo.png", status: "done", thumbUrl: logo }));
      setImgBackground((e) =>(e[0] = { ...e, name: "logo.png", status: "done", thumbUrl: imagem }));
      temaitem?.map((data) => {
        switch (data.icone) {
          case "Instagram":
            setInsta({
              id: data?.idtemaitem,
              link: data.link,
            });
            linksData.contactInsta = data.link;
            break;

          case "Whatsapp":
            setWhatsapp((e) => ({
              ...e,
              id: data?.idtemaitem,
              link: ((!data.link)&&lead?.length?lead[0].telefone:data.link),
            }));
            linksData.contactWhats = ((!data.link)&&lead?.length?lead[0].telefone:data?.link)?.replace(/[\(\)\.\s-]+/g, "");
            break;

          case "Twitter":
            setTwiter({
              id: data?.idtemaitem,
              link: data.link,
            });
            linksData.contactTw = data.link;
            break;

          case "Facebook":
            setFace({
              id: data?.idtemaitem,
              link: data.link,
            });
            linksData.contactFace = data.link;
            break;

          case "Fone":
            setPhone({
              id: data?.idtemaitem,
              link: ((!data.link)&&lead?.length?lead[0].telefone:data.link),
            });
            linksData.contactPhone = ((!data.link)&&lead?.length?lead[0].telefone:data?.link)?.replace(/[\(\)\.\s-]+/g, "");
            break;

          case "Email":
            setEmail({
              id: data?.idtemaitem,
              link: ((!data.link)&&lead?.length?lead[0].email:data.link),
            });
            linksData.contactEmail = ((!data.link)&&lead?.length?lead[0].email:data.link)
            break;

          case "Linkedin":
            setLinkedin({
              id: data?.idtemaitem,
              link: data.link,
            });
            linksData.contactLinkedin = data.link;
            break;

          case "Pix":
            setPix({
              id: data?.idtemaitem,
              link: data.link,
            });
            linksData.contactPix = data.link;
            break;

          case "Url":
            setSite({
              id: data?.idtemaitem,
              link: data.link,
            });
            linksData.contactSite = data.link;
            break;

          default:
            break;
        }
      });
      reset({ ...linksData });
      return {
        nome: nome,
        status: status === "I" ? false : true,
        nomeTema: nomeTema,
        ocupacao:ocupacao,
        reutilizar: reutilizar === "S" ? true : false,
        corFundo: (bgcolor||"#04557a"),
        corTexto: (textcolor|| "#ffffff"),
        corContainer: (containerColor || "#05A3EA"),
        video: video === "null" ? "" : decodeURI(video),
        descricao: descricao,
        ...linksData,
      };
    }
  };

  const udpateTemplate = async (data) => {
    // console.log(JSON.stringify(data));
    const result = await Layout.update(idLayout, data);
    setSensed(true)
    if (
      result.status &&
      (result?.status === 200 || result?.status === 201) && result.data.message !== "erro" ) {
      message.success("Templete atualizado com sucesso.", 2, navigate(`/home/${hash ? "produtos" : "lotes"}`));
    } else {
      setSensed(false)
      message.error(`"Não foi possivel atualizar Templete."`, 2);
    }
  };

  const nome = register("nome");
  nome.onChange = (e) => setNomeConfig(e.target.value);

  const ocupacao = register("ocupacao");
  ocupacao.onChange = (e) => setOcupacaoConfig(e.target.value);

  // const video = register("video");  
  // video.onChange = (e) => setUrlVideo(e.target.value);

  const contactPhone = register("contactPhone");
  contactPhone.onChange = (e) =>
    setPhone((data) => ({ ...data, link: e.target.value }));

  const contactWhats = register("contactWhats");
  contactWhats.onChange = (e) =>
    setWhatsapp((data) => ({ ...data, link: e.target.value }));

  const contactInsta = register("contactInsta");
  contactInsta.onChange = (e) =>
    setInsta((data) => ({ ...data, link: e.target.value }));

  const contactTw = register("contactTw");
  contactTw.onChange = (e) =>
    setTwiter((data) => ({ ...data, link: e.target.value }));

  const contactFace = register("contactFace");
  contactFace.onChange = (e) =>
    setFace((data) => ({ ...data, link: e.target.value }));

  const contactEmail = register("contactEmail");
  contactEmail.onChange = (e) =>
    setEmail((data) => ({ ...data, link: e.target.value }));

  const contactLinkedin = register("contactLinkedin");
  contactLinkedin.onChange = (e) =>
    setLinkedin((data) => ({ ...data, link: e.target.value }));

  const contactPix = register("contactPix");
  contactPix.onChange = (e) =>
    setPix((data) => ({ ...data, link: e.target.value }));

  const contactSite = register("contactSite");
  contactSite.onChange = (e) =>
    setSite((data) => ({ ...data, link: e.target.value }));


  const getTemaSelected = async (temaSelected) => {
    if (!temaSelected) {
      setColorText( "#ffffff");
      setColorBackground("#04557a");
      setColorContainer("#05A3EA");
      setImagem("")
      setLogo("")
      setNomeConfig("")
      setOcupacaoConfig("")
      setTextDescrption((e)=>e = "")
      setImgLogo((e) =>(e[0] = { ...e, name: "logo.png", status: "done", thumbUrl: "" }));
      setImgBackground((e) =>(e[0] = { ...e, name: "logo.png", status: "done", thumbUrl: "" }));
      reset({temas:'',
        nome:'',
        ocupacao:'',
        descricao:'<p> Descrição </p>',
        corFundo:"#04557a",
        corContainer:"#05A3EA",
        corTexto:'#ffffff',
        nome:''})
        return
    }
    const TemaData = await Template.themesByUser(temaSelected);
    if (TemaData && TemaData.length) {
      const {bgcolor:corFundo,
            containerColor:corContainer,
            textcolor:corTexto,
            descricao,
            imagem,
            logo,
            nome:nomeTema,
            ocupacao} = TemaData[0]
            setColorText(corTexto || "#ffffff");
            setColorBackground(corFundo || "#04557a");
            setColorContainer(corContainer || "#05A3EA");
            setImagem(imagem)
            setLogo(logo)
            setNomeConfig(nomeTema)
            setOcupacaoConfig(ocupacao)
            setTextDescrption((e)=>e = descricao)
            setImgLogo((e) =>(e[0] = { ...e, name: "logo.png", status: "done", thumbUrl: logo }));
            setImgBackground((e) =>(e[0] = { ...e, name: "logo.png", status: "done", thumbUrl: imagem }));

            reset({temas:temaSelected,
                  nome:nomeTema,
                  ocupacao,
                  descricao,
                  corFundo,
                  corContainer,
                  corTexto,
                  nome:nomeTema})
                 
    }
  };
  if(idlote && !Object.keys(templateConfig).length){
    return <Loading loading={true}/>
  }

  return (
      
    <Article title="Tema">
      <Loading loading={sended}/>
      {contextHolder}
      <Form onSubmit={handleSubmit(handleSubmitData)}>
        <Style.ModelView>
          <PhoneContainer size={screenSize} background={colorBackground}>
            <Style.TitleContainer background={corContainer}>
              {/* <Style.Share color={colorText}>
                <MdOutlineShare />
              </Style.Share> */}
              <Style.ContainerLogo>
                <Style.Logo src={logo || "/assets/images/img/logo-cinza.png"} />
              </Style.ContainerLogo>
              <Style.Title textcolor={colorText}>
                {nomeConfig || "Nome"}
              </Style.Title>
              <Style.SubTitle textcolor={colorText}>
                {ocupacaoConfig || "Ocupação"}
              </Style.SubTitle>
              <Style.BtnContact textcolor={colorText}>
                Salvar na agenda
              </Style.BtnContact>
            </Style.TitleContainer>

            <Style.MidiaAndContacts>
              <Style.SocialMidia
                textcolor={colorText}
                background={corContainer}
                >
                {phone?.link && (
                  <Style.Link href="#" key="9">
                    <Style.Fone>
                      <BsFillTelephoneFill />
                      Chamar
                    </Style.Fone>
                  </Style.Link>
                )}
                {whatsapp?.link && (
                  <Style.Link target="_blank" href="#" key="1">
                    <Style.Whatsapp>
                      <BsWhatsapp /> Whatsapp
                    </Style.Whatsapp>
                  </Style.Link>
                )}
                {email?.link && (
                  <Style.Link target="_blank" href="#" key="8">
                    <Style.Email>
                      <MdEmail />
                      Email
                    </Style.Email>
                  </Style.Link>
                )}
                {pix?.link && (
                  <Style.Link target="_blank" href="#" key="6">
                    <Style.Pix>
                      <MdPix />
                      Pix
                    </Style.Pix>
                  </Style.Link>
                )}
                {site?.link && (
                  <Style.Link target="_blank" href="#" key="7">
                    <Style.Site>
                      <BsGlobe />
                      Site
                    </Style.Site>
                  </Style.Link>
                )}
                {insta?.link && (
                  <Style.Link target="_blank" href="#" key="2">
                    <Style.Instagram>
                      <BsInstagram />
                      Instagram
                    </Style.Instagram>
                  </Style.Link>
                )}
                {face?.link && (
                  <Style.Link target="_blank" href="#" key="3">
                    <Style.Facebook>
                      <BsFacebook />
                      Facebook
                    </Style.Facebook>
                  </Style.Link>
                )}
                {linkedin?.link && (
                  <Style.Link target="_blank" href="#" key="5">
                    <Style.Linkedin>
                      <BsLinkedin />
                      Linkedin
                    </Style.Linkedin>
                  </Style.Link>
                )}
                {twiter?.link && (
                  <Style.Link target="_blank" href="#" key="4">
                    <Style.Twitter>
                      <BsTwitter />
                      Twitter
                    </Style.Twitter>
                  </Style.Link>
                )}
              </Style.SocialMidia>
            </Style.MidiaAndContacts>

            <Style.Section background={corContainer}>
              <Style.AreaDescription
                textcolor={colorText}
                dangerouslySetInnerHTML={{
                  __html: textDescrption || "<p>Area de descrição</p>",
                }}
                />
              <Style.ContanerImgTemplate>
                {imagem && <Style.ImgTemplate src={imagem} />}
              </Style.ContanerImgTemplate>
            </Style.Section>
          </PhoneContainer>
        </Style.ModelView>
        <Fieldset title={"Configurações de Tema"} overflow="none">
          <Row>
            <Col column={screenSize === "big" ? "col-md-8" : "col-md-6"} visible={hasTheme}>
              <Controller
                control={control}
                name="temas"
                render={({ field }) => (
                  <SelectLabel
                  field={field}
                  text="Temas Salvos"
                  error={errors?.temas?.message}
                  options={temaSaved}
                  onChange={(value, date) => {
                    field.onChange(value);
                    getTemaSelected(value)
                    }}
                  />
                )}
                />
            </Col>
          </Row>
          <Row>
            <Col column={screenSize === "big" ? "col-md-8" : "col-md-6"}>
              <Input
                register={nome}
                text="Nome"
                placeholder="nome..."
                type="text"
                error={errors?.nome?.message}
              />
            </Col>
            <Col column={screenSize === "big" ? "col-md-8" : "col-md-6"}>
              <Input
                register={ocupacao}
                text="Ocupação "
                placeholder="Ocupação..."
                type="text"
                error={errors?.ocupacao?.message}
              />
            </Col>
          </Row>
          <Row>
            <Col column={screenSize === "big" ? "col-md-12" : "col-md-6"}>
              <Controller
                name="descricao"
                control={control}
                render={({ field }) => (
                  <Richeditor
                    text="Descrição"
                    value={field.value}
                    onChange={(newValue) => [
                      field.onChange(newValue),
                      setTextDescrption(newValue),
                    ]}
                  />
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col column="col-md-6">
              <UploadFile
                crop={true}
                text="Foto Perfil"
                defaultFileList={[imgLogo]}
                onChange={(e) => !e.fileList.length && setLogo(() => "")}
                accept="image/png, image/jpeg"
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
                  Files.upload(formData, setImgLogo).then((result) => {
                    if (result.status &&(result.status === 201 || result.status === 200)) {
                      setImgLogo({
                        name: "image.png",
                        thumbUrl: result.data.url,
                        status: "done",
                      });
                      setLogo(() => result.data.url);
                      onSuccess(file);
                      } else {
                        setImgLogo({ name: "image.png", status: "error" });
                        onError(result, file);
                      }
                    })
                    .catch((e) => {
                      onError(e.error, file);
                    });
                }}
                />
            </Col>
            <Col column="col-md-6">
              <UploadFile
                crop={true}
                text="Banner"
                defaultFileList={[imgBackground]}
                onChange={(e) => !e.fileList.length && setImagem(() => "")}
                accept="image/png, image/jpeg"
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
                  Files.upload(formData, setImgBackground)
                  .then((result) => {
                    if (
                      result.status &&
                      (result.status === 201 || result.status === 200)
                      ) {
                        setImgBackground({
                          name: "image.png",
                          thumbUrl: result.data.url,
                          status: "done",
                        });
                        setImagem(() => result.data.url);
                        onSuccess(file);
                      } else {
                        onError(result, file);
                        setImgBackground({
                          name: "image.png",
                          status: "error",
                        });
                      }
                    })
                    .catch((e) => {
                      onError(e.error, file);
                    });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col column="col-md-3">
              <Style.ContainerColor>
                <Style.Label>Cor do Fundo</Style.Label>
                <Controller
                  control={control}
                  name="corFundo"
                  format="hex"
                  render={({ field }) => (
                    <ColorPicker
                    format="hex"
                      value={field.value}
                      onChange={(date, value) => {
                        field.onChange(value);
                        setColorBackground(() => value);
                      }}
                      size="large"
                      showText
                      />
                      )}
                      />
              </Style.ContainerColor>
            </Col>
            <Col column="col-md-3">
              <Style.ContainerColor>
                <Style.Label>Cor do Texto</Style.Label>
                <Controller
                  control={control}
                  name="corTexto"
                  render={({ field }) => (
                    <ColorPicker
                    size="large"
                    showText
                    value={field.value}
                    onChange={(date, value) => {
                      field.onChange(value);
                      setColorText(() => value);
                    }}
                    />
                    )}
                    />
              </Style.ContainerColor>
            </Col>
            <Col column="col-md-3">
              <Style.ContainerColor>
                <Style.Label>Cor do Container</Style.Label>
                <Controller
                  control={control}
                  name="corContainer"
                  render={({ field }) => (
                    <ColorPicker
                      size="large"
                      showText
                      value={field.value}
                      onChange={(date, value) => {
                        field.onChange(value);
                        setColorContainer(() => value);
                      }}
                    />
                    )}
                />
              </Style.ContainerColor>
            </Col>
          </Row>
        </Fieldset>
        <Fieldset title="Redes Sociais" overflow="none">
        <Loading loading={sended}/>
          <Row>
            <Col column="col-md-4">
              <Style.ContainerContactNumber>
                <BsWhatsapp />
                <InputMask
                  register={contactWhats}
                  text=""
                  placeholder="número..."
                  type="text"
                  error={errors?.contactWhats?.message}
                  mask="(99)99999-9999 "
                />
              </Style.ContainerContactNumber>
            </Col>
            <Col column="col-md-4">
              <Style.ContainerContactNumber>
                <BsFillTelephoneFill />
                <InputMask
                  register={contactPhone}
                  text=""
                  placeholder="número..."
                  type="text"
                  error={errors?.contactPhone?.message}
                  mask="(99)99999-9999 "
                  />
              </Style.ContainerContactNumber>
            </Col>
            <Col column="col-md-4">
              <Style.ContainerContact>
                <MdEmail />
                <Input
                  register={contactEmail}
                  text=""
                  placeholder="link..."
                  type="text"
                  error={errors?.contactEmail?.message}
                  />
              </Style.ContainerContact>
            </Col>
          </Row>
          <Row>
            <Col column="col-md-4">
              <Style.ContainerContact>
                <MdPix />
                <Input
                  register={contactPix}
                  text=""
                  placeholder="link..."
                  type="text"
                  error={errors?.contactPix?.message}
                  />
              </Style.ContainerContact>
            </Col>
            <Col column="col-md-4">
              <Style.ContainerContact>
                <BsLinkedin />
                <Input
                  register={contactLinkedin}
                  text=""
                  placeholder="link..."
                  type="text"
                  error={errors?.contactLinkedin?.message}
                  />
              </Style.ContainerContact>
            </Col>
            <Col column="col-md-4">
              <Style.ContainerContact>
                <BsInstagram />
                <Input
                  register={contactInsta}
                  text=""
                  placeholder="link..."
                  type="text"
                  error={errors?.contactInsta?.message}
                  />
              </Style.ContainerContact>
            </Col>
          </Row>
          <Row>
            <Col column="col-md-4">
              <Style.ContainerContact>
                <BsFacebook />
                <Input
                  register={contactFace}
                  text=""
                  placeholder="link..."
                  type="text"
                  error={errors?.contactFace?.message}
                  />
              </Style.ContainerContact>
            </Col>
            <Col column="col-md-4">
              <Style.ContainerContact>
                <BsTwitter />
                <Input
                  register={contactTw}
                  text=""
                  placeholder="link..."
                  type="text"
                  error={errors?.contactTw?.message}
                  />
              </Style.ContainerContact>
            </Col>
            <Col column="col-md-4">
              <Style.ContainerContact>
                <BsGlobe />
                <Input
                  register={contactSite}
                  text=""
                  placeholder="link..."
                  type="text"
                  error={errors?.contactSite?.message}
                  />
              </Style.ContainerContact>
            </Col>
          </Row>
        </Fieldset>
        <Row>
          <Col column="col-md-4">
            <InputCheck register={register("reutilizar")}>
              Reutilizar tema em outra configuração?
            </InputCheck>
          </Col>
        </Row>
        {/* <Row>
              <Col column="col-md-7">
                   <Input register={video}  text="Video" placeholder="url..." type="text" error={errors?.video?.message} />
                   </Col>
                  </Row> */}

        <Style.Container>
          <LinkButton
            to={`/home/${hash ? "produtos" : "lotes"}`}
            color="default"
            >
            {" "}
            Voltar
          </LinkButton>
          <Button type="submit">Salvar</Button>
        </Style.Container>
      </Form>
    </Article>
  );
};
