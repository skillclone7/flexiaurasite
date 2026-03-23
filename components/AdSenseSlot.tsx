import React, { useEffect } from 'react';

interface AdSenseSlotProps {
    slotId: string;
    format?: 'auto' | 'fluid' | 'rectangle';
    className?: string;
}

const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
    slotId,
    format = 'auto',
    className = '',
}) => {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('AdSense initialization error:', err);
        }
    }, []);

    return (
        <div className={`flex justify-center my-8 ${className}`}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-7780547974394874"
                data-ad-slot={slotId}
                data-ad-format={format}
                data-full-width-responsive="true"
            />
        </div>
    );
};

export default AdSenseSlot;
