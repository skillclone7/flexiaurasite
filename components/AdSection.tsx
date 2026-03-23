import React from 'react';
import AdSenseSlot from './AdSenseSlot';

const AdSection: React.FC = () => {
  return (
    <section className="py-10 bg-light-gray/20">
      <div className="container mx-auto px-5">
        <AdSenseSlot slotId="GENERAL_AD_SLOT" />
      </div>
    </section>
  );
};

export default AdSection;