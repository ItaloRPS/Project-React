
/* eslint-disable react/jsx-no-comment-textnodes */
import { Dashboard } from "../templates/Dashboard";
import { Painel } from "../templates/Painel";
import { Planos } from "../templates/Planos";
import { Lotes } from "../templates/Lotes";
import { Produtos } from "../templates/Produtos";
import { Empresa } from "../templates/Empresa";
import { CadastroProduto } from "../templates/CadastroProduto";
import { CadastroEmpresa } from "../templates/CadastroEmpresa";
import { Route, Routes } from "react-router-dom";
import {ListaLeads} from '../templates/ListaLeads'
import { TemplateConfig } from "../templates/TemplateConfig";
import { PhoneContainer } from "../../src/components/PhoneContainer";
import { Usuario } from "../templates/Usuario";
import { CadastroUsuario } from "../templates/CadastroUsuario";
import { CadastroLead } from "../templates/CadastroLead";
import { CadastroLote } from "../templates/CadastroLote";
import { PrivacyPolicy } from "../templates/PrivacyPolicy";
import { LinksManager } from "../templates/LinksManager";
import { SendMessage } from "../templates/SendMessage";
import { Messages } from "../templates/Messages";
import { CadastroLojista } from "../templates/CadastroLojista";
import { Lojistas } from "../templates/Lojistas";
export const RoutesApp = () => {
  return (
    <Routes>
      <Route exact path="/*" element={<Dashboard />} />
      <Route exact path="/painel" element={<Painel />} />
      <Route exact path="/planos" element={<Planos />} />
      <Route exact path="/linksManager" element={<LinksManager />} />
      <Route exact path="/lotes" element={<Lotes />} />
      <Route exact path="/lotes/cadastrolote" element={<CadastroLote/>}/>
      <Route exact path="/template" element={<TemplateConfig />} />
      <Route exact path="/lotes" element={<Lotes/>} />
      <Route exact path="/template/:idlote" element={<TemplateConfig />} />
      <Route exact path="/template/:idlote/:hash" element={<TemplateConfig />} />
      <Route exact path="/Produtos" element={<Produtos />}></Route>
      <Route path="/Produtos/cadastraprod/" element={<CadastroProduto />} />
      <Route path="/Produtos/cadastraprod/:uuid" element={<CadastroProduto />} />
      <Route exact path="/empresas" element={<Empresa />}></Route>
      <Route path="/empresas/cadastraempresa/" element={<CadastroEmpresa />} />
      <Route path="/empresas/cadastraempresa/:uuid" element={<CadastroEmpresa />} />
      <Route path="/usuario/" element={<Usuario/>}/>
      <Route path="/usuario/cadastrausuario/" element={<CadastroUsuario/>}/>
      <Route path="/usuario/cadastrausuario/:uuid" element={<CadastroUsuario/>}/>
      <Route path="/lojistas/" element={<Lojistas/>}/>
      <Route path="/lojistas/cadastrolojista/:uuid" element={<CadastroLojista/>}/>
      <Route exact path="/leads" element={<ListaLeads/>}/>
      <Route exact path="/leads/cadastrolead" element={<CadastroLead/>}/>
      <Route exact path="/politicypolicy" element={<PrivacyPolicy/>}/>
      <Route exact path="/mensagens" element={<Messages/>}/>
      <Route exact path="/enviomensagem" element={<SendMessage/>}/>
      <Route element={<h1>Não encontrado</h1>} />
    </Routes>
  );
};
