import React, { useState } from 'react';
import { Card } from 'antd';

export const CardTab = ({contentList={app: <p>app content</p>}, tabList=[{key: 'app',label: 'app',}], defaultContent = "app"}) => {
  const [activeTabKey, setActiveTabKey] = useState(defaultContent);

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };
  return (

      <Card
        style={{
          width: '100%',
        }}
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
      >
        {contentList[activeTabKey]}
      </Card>
  );
};
