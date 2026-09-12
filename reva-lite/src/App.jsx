import { useState, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { devices as allDevices } from './data/devices';
import Header          from './components/Header';
import StatsBar        from './components/StatsBar';
import SearchBar       from './components/SearchBar';
import FilterBar       from './components/FilterBar';
import DeviceCard      from './components/DeviceCard';
import DeviceDetail    from './components/DeviceDetail';
import InspectionForm  from './components/InspectionForm';
import './App.css';

gsap.registerPlugin(useGSAP);

export default function App() {
  // ── Shared state ──────────────────────────────────────────────
  const [query,           setQuery]           = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus,   setSelectedStatus]   = useState('All');
  const [selectedDevice,   setSelectedDevice]   = useState(null);
  const [showForm,         setShowForm]         = useState(false);

  const containerRef = useRef();

  // ── Derived: filtered device list ─────────────────────────────
  const filteredDevices = useMemo(() => {
    const q = query.toLowerCase();
    return allDevices.filter(d => {
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q)         ||
        d.location.toLowerCase().includes(q)     ||
        d.serialNumber.toLowerCase().includes(q);
      const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;
      const matchesStatus   = selectedStatus   === 'All' || d.status   === selectedStatus;
      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [query, selectedCategory, selectedStatus]);

  // ── GSAP Animations ───────────────────────────────────────────
  useGSAP(() => {
    if (filteredDevices.length > 0) {
      gsap.fromTo('.device-card-anim', 
        { y: 50, opacity: 0, rotateX: -15 }, 
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0,
          duration: 0.6, 
          stagger: 0.08, 
          ease: "back.out(1.2)",
          clearProps: "all"
        }
      );
    }
  }, { dependencies: [filteredDevices], scope: containerRef });

  // ── Handlers ──────────────────────────────────────────────────
  function handleSelectDevice(device) {
    setSelectedDevice(device);
    setShowForm(false);
  }

  function handleCloseDetail() {
    setSelectedDevice(null);
    setShowForm(false);
  }

  function handleOpenForm() {
    setShowForm(true);
  }

  function handleSubmitForm(result) {
    console.log('Inspection logged:', result);
    setSelectedDevice(null);
    setShowForm(false);
  }

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className="app" ref={containerRef}>
      <Header />

      <main className="main-content">
        <StatsBar devices={allDevices} />

        <div className="controls-row">
          <SearchBar query={query} onQueryChange={setQuery} />
          <FilterBar
            category={selectedCategory}
            status={selectedStatus}
            onCategoryChange={setSelectedCategory}
            onStatusChange={setSelectedStatus}
            resultCount={filteredDevices.length}
          />
        </div>

        {filteredDevices.length > 0 ? (
          <div className="device-grid perspective-1000">
            {filteredDevices.map(device => (
              <div key={device.id} className="device-card-anim">
                <DeviceCard
                  device={device}
                  onSelect={handleSelectDevice}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">🔍</span>
            <p>No devices match your search.</p>
            <button
              className="btn btn-ghost"
              onClick={() => { setQuery(''); setSelectedCategory('All'); setSelectedStatus('All'); }}
              type="button"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedDevice && !showForm && (
        <DeviceDetail
          device={selectedDevice}
          onClose={handleCloseDetail}
          onInspect={handleOpenForm}
        />
      )}

      {selectedDevice && showForm && (
        <InspectionForm
          device={selectedDevice}
          onSubmit={handleSubmitForm}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
