import React, { useState } from 'react';
import './Tabs.css';

interface TabsProps {
  onTabChange: (tab: 'forYou' | 'following') => void;
}

const Tabs: React.FC<TabsProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState<'forYou' | 'following'>('forYou');

  const handleTabClick = (tab: 'forYou' | 'following') => {
    if (tab !== activeTab) {
      setActiveTab(tab);        // Ustaw lokalnie, by działało stylowanie
      onTabChange(tab);         // Przekaż do rodzica
    }
  };

  return (
    <div className="tabsWrapper">
      <div
        className={`tab ${activeTab === 'forYou' ? 'active' : ''}`}
        onClick={() => handleTabClick('forYou')}
      >
        For you
      </div>
      <div
        className={`tab ${activeTab === 'following' ? 'active' : ''}`}
        onClick={() => handleTabClick('following')}
      >
        Following
      </div>
    </div>
  );
};

export default Tabs;
