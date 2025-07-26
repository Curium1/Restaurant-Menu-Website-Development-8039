import React from 'react';
import { HelpHub } from '@questlabs/react-sdk';
import questConfig from '../config/questConfig';

const AppHelp = () => {
  // Generate or get unique user ID
  const getUserId = () => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('userId', userId);
    }
    return userId;
  };

  return (
    <div style={{ zIndex: 9999 }}>
      <HelpHub 
        uniqueUserId={getUserId()}
        questId={questConfig.QUEST_HELP_QUESTID}
        botLogo={{
          logo: 'https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1741000949338-Vector%20%282%29.png'
        }}
        primaryColor={questConfig.PRIMARY_COLOR}
        style={{
          zIndex: 9999,
          position: 'fixed'
        }}
      />
    </div>
  );
};

export default AppHelp;