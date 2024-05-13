import * as Style from "./styles";

import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';


export const UploadFile = ({field ,text, fileList,defaultFileList = [{ name: 'image.png',url:'',  status: 'done',}], max=1, typedisplay="picture", accept , onChange, onPreview, customRequest, crop}) => (
    <Style.Container typedisplay={typedisplay}>
      {crop?<ImgCrop rotationSlider>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType={typedisplay}
          defaultFileList={defaultFileList}
          fileList={fileList}
          maxCount={max}
          accept={accept}
          onChange={onChange}
          onPreview= {onPreview}
          customRequest={customRequest}
          {...field}
        >
          <Button icon={<UploadOutlined />}>{text}</Button>
        </Upload>
      </ImgCrop>:
      <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType={typedisplay}
          defaultFileList={defaultFileList}
          fileList={fileList}
          maxCount={max}
          accept={accept}
          onChange={onChange}
          onPreview= {onPreview}
          customRequest={customRequest}
          {...field}
        >
          <Button icon={<UploadOutlined />}>{text}</Button>
        </Upload>}
    </Style.Container>
  );
 