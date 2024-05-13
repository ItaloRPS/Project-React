import * as Style from './styles'
import {Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

export const Loading = ({loading}) =>{
     return (
        <Style.Loading visible={loading.toString()}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 47 }} spin />} />
       </Style.Loading>
     )
}
