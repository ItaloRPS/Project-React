import React, { useState } from "react";
import * as Style from "./styles";
import { CadastroLead } from "../../templates/CadastroLead";
import { LayoutApp } from "../../templates/Layout";
import { Access } from "../../control/access/control-access";

import { Link, useParams, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

export const Cadastro = () => {
  const [loading, setLoading] = useState(true);
  const [register, setRegister] = useState(null);
  const [layout, setLayout] = useState(null);
  const { hash } = useParams();
  const { sideIn } = useAuth();

  useEffect(() => {
    sideIn(process.env.REACT_APP_EMAIL_GLOBAL, process.env.REACT_APP_PASSWORD_GLOBAL  )
      .then(() => {
        getAccess(hash).then((data) => {
          data?.result && setLayout(data?.result);

          if (data.result?.lote.produto.idconfigproduto == 2 && data.result.lote.produto.necessitacadastro == 0 ) {
            window.location.href = data.result.lote.produto.url;
            return "";
          } else if ( data?.result && data.result?.lote.produto.idconfigproduto == 2 && data?.result.lote.produto.necessitacadastro === 1 && data?.result.lead.length > 0 ) {
            window.location.href = data?.result.lote.produto.url;
            return "";
          } else if (data?.result && (data?.result.lote.produto.necessitacadastro === 0 ||(data?.result.lote.produto.necessitacadastro === 1 && data?.result.lead.length > 0))
          ) {
            setRegister(data.result);
            setLoading(false);
            return "";
          }
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error("Erro ao tentar fazer login:", error);
        setLoading(false);
      });
  }, []);

  const getAccess = async (hash) => {
    try {
      var resp = await Access.getHash(hash);
      if (resp && resp.status === 200) {
        return resp.data;
      }
    } catch (error) {
      return {};
    }
  };

  return (
    <Style.Container>
      <Style.Loading show={loading.toString()}>
        <Spin
          size="large"
          tip="Bem vindo..."
          spinning={loading}
          style={{ width: "75px", position: "relative", left: "-9px" }}
        >
          <div className="content" />
        </Spin>
      </Style.Loading>
      {!loading &&
        (register ? (
          <LayoutApp layoutData={layout} />
        ) : (
          <CadastroLead layout={layout} />
        ))}
    </Style.Container>
  );
};
