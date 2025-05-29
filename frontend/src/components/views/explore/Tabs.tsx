import React, { useState } from 'react';
import './Tabs.css';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('forYou');

  return (
    <div className="tabsWrapper">
      <div
        className={`tab ${activeTab === 'forYou' ? 'active' : ''}`}
        onClick={() => setActiveTab('forYou')}
      >
        For you
      </div>
      <div
        className={`tab ${activeTab === 'following' ? 'active' : ''}`}
        onClick={() => setActiveTab('following')}
      >
        Following
      </div>
    </div>
  );
};

export default Tabs;
