import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const STATUS_STYLES = {
  'Working':           'badge-green',
  'Faulty':            'badge-orange',
  'For Disposal':      'badge-red',
  'Under Inspection':  'badge-blue',
};

const CATEGORY_ICONS = {
  Laptop:  '💻',
  Phone:   '📱',
  Tablet:  '📲',
  Monitor: '🖥️',
  Printer: '🖨️',
  Desktop: '🖥️',
};

export default function DeviceCard({ device, onSelect }) {
  const badgeClass = STATUS_STYLES[device.status] || 'badge-gray';
  const icon       = CATEGORY_ICONS[device.category] || '🔌';
  
  const cardRef = useRef();

  useGSAP(() => {
    const card = cardRef.current;
    
    const onMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(card, {
        rotateY: (x / rect.width) * 15,
        rotateX: -(y / rect.height) * 15,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    };

    const onMouseLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
    };

    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);

    return () => {
      card.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseleave', onMouseLeave);
    };
  }, { scope: cardRef });

  return (
    <article
      ref={cardRef}
      className="device-card"
      onClick={() => onSelect(device)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${device.name}`}
      onKeyDown={e => e.key === 'Enter' && onSelect(device)}
    >
      <div className="device-card-top" style={{ transform: 'translateZ(20px)' }}>
        <span className="device-icon" aria-hidden="true">{icon}</span>
        <span className={`badge ${badgeClass}`}>{device.status}</span>
      </div>

      <h2 className="device-name" style={{ transform: 'translateZ(30px)' }}>{device.name}</h2>
      <p className="device-category" style={{ transform: 'translateZ(15px)' }}>{device.category}</p>

      <div className="device-card-meta" style={{ transform: 'translateZ(10px)' }}>
        <span className="meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <circle cx="12" cy="11" r="3"/>
          </svg>
          {device.location}
        </span>
        <span className="meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {device.lastInspected}
        </span>
      </div>
    </article>
  );
}
