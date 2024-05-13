import {Cardboard} from '../../components/Cardboard'
import { GiShoppingBag } from "react-icons/gi"
import { BsFillBoxSeamFill } from "react-icons/bs"
import { FaUsers } from "react-icons/fa";
import { FiLink} from "react-icons/fi"
import * as Style from './styles'
import { useEffect, useState } from 'react';
import { Product } from '../../control/product/control-product';
import { Lote } from '../../control/lote/control-lote';
import { Lead } from '../../control/lead/control-lead';


export const Dashboard = () =>{

const [loading, setLoading] = useState(false);
const [products, setProducts] = useState(0);
const [batchs, setBatch] = useState(0);
const [links, setLinks] = useState(0);
const [leads, setLeads] = useState(0);

useEffect(()=>{
    getProducts().then((data)=>{
        setProducts(data.length)
    })
    getLote().then((data)=>{
        setBatch(data.length)
        data.forEach((lote)=>{
            setLinks((data)=>(data+lote.quantidade))
        })
    })
    getLead().then((data)=>{
        setLeads(data.length)
    })
},[])

const getProducts = async ()=>{
    setLoading()
    const ProductData = await Product.listAll()
    if(ProductData?.status && ProductData.status === 200 && ProductData.data.message == 'sucesso'){
        const retorno = ProductData?.data?.result.sort((a, b) => b.idproduto - a.idproduto);
        setLoading(false)
        return retorno
    }else{
      setLoading(false)
      return []
    }
  }
  
  const getLote = async () => {
    setLoading(true)
    const LoteData = await Lote.listAll();

    if (LoteData?.status && LoteData?.status === 200 && LoteData?.data?.result?.length) {
      const retorno = LoteData?.data?.result;

      return retorno
    }else{
        setLoading(false)
        return []
    }
  };

  const getLead = async () => {
    setLoading(true);
    const LeadData = await Lead.listAll();
    if ( LeadData?.status && LeadData.status === 200 && LeadData?.data?.result?.length ) {
      return LeadData?.data?.result
    } else {
      setLoading(false);
      return []
    }
  };

     return (
        <Style.Container>
          <Cardboard info={products.toString()} title={"Produtos"} type="into">
              <GiShoppingBag/>
          </Cardboard>
          <Cardboard info={batchs.toString()} title={"Lotes"} type="into">
              <BsFillBoxSeamFill/>
          </Cardboard>
          <Cardboard info={links.toString()} title={"Links"} type="into">
              <FiLink/>
          </Cardboard>
          <Cardboard info={leads.toString()} title={"Leads"} type="into">
              <FaUsers/>
          </Cardboard>
        </Style.Container>
     )
}
