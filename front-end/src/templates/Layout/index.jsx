import { useState, useEffect } from "react";
import QRCode from 'react-qr-code';
import * as Style from "./styles";
import axios from 'axios'
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
import { BsQrCode } from "react-icons/bs";
import { GoGear } from "react-icons/go";
import { message, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import VCard from "vcard-creator";

export const LayoutApp = ({ layoutData }) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [name, setName] = useState("TESTE");
  const [phone, setPhone] = useState("0000000000");
  const [email, setEmail] = useState("teste@hotmail.com");

  const { tema: layout } = layoutData;
  const { produto} = layoutData?.lote;
  useEffect(() => {
    const [contactFone, contactEmail] = layout[0]?.temaitem.filter((data) => {
      return data.icone === "Fone" || data.icone === "Email";
    });

    if (contactFone?.descricao === "Fone") {
      setPhone(contactFone.link);
      setEmail(contactEmail.link);
    } else {
      setPhone(contactEmail?.link);
      setEmail(contactFone?.link);
    }
    setName(layout[0]?.nome);
  }, [layout]);

  const getIconSocialMedia = (icon, link, id) => {
    switch (icon) {
      case "Fone":
        return (
          link && (
            <Style.Link
              href={`tel:+55${link?.replace(/[^\d]+/g, "")}`}
              key={id}
            >
              <Style.Fone>
                <BsFillTelephoneFill />
                Chamar
              </Style.Fone>
            </Style.Link>
          )
        );
        break;

      case "Whatsapp":
        return (
          link && (
            <Style.Link
              target="_blank"
              href={`https://wa.me/55${link?.replace(/[^\d]+/g, "")}`}
              key={id}
            >
              <Style.Whatsapp>
                <BsWhatsapp /> Whatsapp
              </Style.Whatsapp>
            </Style.Link>
          )
        );
        break;

      case "Instagram":
        return (
          link && (
            <Style.Link target="_blank" href={`https://www.instagram.com/${link.replace("@","").replace("/","")}`} key={id}>
              <Style.Instagram>
                <BsInstagram />
                Instagram
              </Style.Instagram>
            </Style.Link>
          )
        );
        break;

      case "Twitter":
        return (
          link && (
            <Style.Link target="_blank" href={link} key={id}>
              <Style.Twitter>
                <BsTwitter />
                Twitter
              </Style.Twitter>
            </Style.Link>
          )
        );
        break;

      case "Email":
        return (
          link && (
            <Style.Link target="_blank" href={`mailto:${link}`} key={id}>
              <Style.Email>
                <MdEmail />
                Email
              </Style.Email>
            </Style.Link>
          )
        );
        break;

      case "Linkedin":
        return (
          link && (
            <Style.Link target="_blank" href={link} key={id}>
              <Style.Linkedin>
                <BsLinkedin />
                Linkedin
              </Style.Linkedin>
            </Style.Link>
          )
        );
        break;

      case "Facebook":
        return (
          link && (
            <Style.Link target="_blank" href={link} key={id}>
              <Style.Facebook>
                <BsFacebook />
                Facebook
              </Style.Facebook>
            </Style.Link>
          )
        );
        break;

      case "Pix":
        return (
          link && (
            <Style.Link onClick={() => copyKey(link)} href="#" key={id}>
              <Style.Pix>
                <MdPix />
                Pix
              </Style.Pix>
            </Style.Link>
          )
        );
        break;

      case "Url":
        return (
          link && (
            <Style.Link target="_blank" href={link} key={id}>
              <Style.Site>
                <BsGlobe />
                Site
              </Style.Site>
            </Style.Link>
          )
        );
        break;
      default:
        break;
    }
  };

  const downloadContacts = () => {
    if (!name || !phone) {
      return;
    }
    const vCard = new VCard();
    vCard.addName(name);
    vCard.addPhoneNumber(phone);
    const vCardData = vCard.toString();

    const blob = new Blob([vCardData], { type: "text/vcard" });
    saveAs(blob, `${name}.vcf'`);
  };

  const  ImageDownloadQRCode = async ()  => {
    const url = window.location.href;
    const response  = await axios.get(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`,{ responseType: 'blob' })
    if (response.status === 200) {
      const link = document.createElement('a')
      const blob = response.data;
      const reader = new FileReader();
  
        reader.onload = () => {
          const base64 = reader.result.split(',')[1];
          link.download = 'qr_code.png';
          link.href = `data:image/png;base64,${base64}`
          link.click();
        };
        reader.readAsDataURL(blob);
    }
  };

  const copyKey = (key) => {
    const textoDoLink = key;
    const inputTemporario = document.createElement("input");
    inputTemporario.setAttribute("value", textoDoLink);
    document.body.appendChild(inputTemporario);
    inputTemporario.select();
    document.execCommand("copy");
    document.body.removeChild(inputTemporario);
    message.success("Copiado", 2);
  };

  const redirectPage = () => {
    navigate("/");
  };

  const orderIconsSocialMedia = (data) => {
    if (!data) return [];
    const order = [
      "Fone",
      "Whatsapp",
      "Email",
      "Pix",
      "Url",
      "Instagram",
      "Facebook",
      "Linkedin",
      "Twitter",
    ];
    data.map((icon) => {
      let nameIcon = Object.values(icon)[2];
      let position = order.indexOf(nameIcon);
      if (position !== -1) order[position] = icon;
    });
    return order;
  };

  return (
    <Style.Container background={layout[0].bgcolor || "#0d8cc5"}>
      <Style.ContainerConfig
        color={layout[0].textcolor || "#ffffff"}
      >
        <Tooltip placement="top" title="Gerar QrCode"><BsQrCode onClick={()=>ImageDownloadQRCode()}/></Tooltip>
        <GoGear onClick={() => redirectPage()}/>
      </Style.ContainerConfig>
      <Style.TitleContainer background={layout[0].containerColor || "#05a3ea"}>
        {/* <Style.Share color={layout[0].textcolor||'#ffffff'}>
                <MdOutlineShare/>
              </Style.Share> */}
        <Style.ContainerLogo>
          <Style.Logo
            src={layout[0].logo || "/assets/images/img/logo-cinza.png"}
          />
        </Style.ContainerLogo>
        <Style.Title textcolor={layout[0].textcolor || "#ffffff"}>
          {layout[0].nome}
        </Style.Title>
        <Style.SubTitle textcolor={layout[0].textcolor || "#ffffff"}>
          {layout[0].ocupacao}
        </Style.SubTitle>
        <Style.BtnContact
          onClick={() => downloadContacts()}
          textcolor={layout[0].textcolor || "#ffffff"}
        >
          Salvar na agenda
        </Style.BtnContact>
      </Style.TitleContainer>

      <Style.MidiaAndContacts>
        <Style.SocialMidia
          textcolor={layout[0].textcolor || "#ffffff"}
          background={layout[0].containerColor || "#05a3ea"}
        >
          {/* {layout[0]?.temaitem.map((data)=>{
                         return getIconSocialMedia(data.icone, data.link, (data?.idlayoutitem||data?.layoutitemDefault))
                    })} */}
          {console.log()}
          {orderIconsSocialMedia(layout[0]?.temaitem).map((data) => {
            return getIconSocialMedia(data.icone, data.link, data.idtemaitem);
          })}
        </Style.SocialMidia>
      </Style.MidiaAndContacts>

      <Style.Section
        background={layout[0].containerColor || "#05a3ea"}
        display={
          layout[0].imagem == "" &&
          (layout[0].descricao?.trim().replace("<p><br></p>", "") == "" ||
            layout[0].descricao == null)? "none": "flex"}
      >
        <Style.AreaDescription
          textcolor={layout[0].textcolor || "#ffffff"}
          dangerouslySetInnerHTML={{ __html: layout[0].descricao }}
        />
        <Style.ContanerImgTemplate>
          {layout[0].imagem&&layout[0].imagem != "null"? <Style.ImgTemplate src={layout[0].imagem} /> : ""}
        </Style.ContanerImgTemplate>
      </Style.Section>
      <Style.ContanerImgBanner >
         {produto.configimagem&&produto.configimagem!="null"? <Style.ImgBanner src={produto.configimagem} /> : ""}
      </Style.ContanerImgBanner>
    </Style.Container>
  );
};
