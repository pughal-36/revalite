import React, { useState } from 'react';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import DeviceCard from './components/DeviceCard';
import DeviceDetail from './components/DeviceDetail';
import mockDevices from './data/mockDevices';
import './App.css';

function App() {
  const [devices, setDevices] = useState(mockDevices);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showInspectionForm, setShowInspectionForm] = useState(false);

  // Derived state: filtered devices list calculated on the fly during rendering
  const filteredDevices = devices.filter((device) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      device.name.toLowerCase().includes(query) ||
      device.category.toLowerCase().includes(query) ||
      device.location.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === 'All' || device.category === selectedCategory;

    const matchesStatus =
      selectedStatus === 'All' || device.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSelectDevice = (device) => {
    setSelectedDevice(device);
    setShowInspectionForm(false);
  };

  const handleCloseDetail = () => {
    setSelectedDevice(null);
    setShowInspectionForm(false);
  };

  const handleInspectSubmit = (payload) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    // Update the device in the local devices state array
    const updatedDevices = devices.map((d) => {
      if (d.id === payload.id) {
        return {
          ...d,
          condition: payload.condition,
          status: payload.status,
          lastInspected: formattedDate
        };
      }
      return d;
    });

    setDevices(updatedDevices);

    // Refresh the selected device details
    if (selectedDevice && selectedDevice.id === payload.id) {
      setSelectedDevice({
        ...selectedDevice,
        condition: payload.condition,
        status: payload.status,
        lastInspected: formattedDate
      });
    }

    setShowInspectionForm(false);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedStatus('All');
  };

  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <StatsBar devices={devices} />

        <div className="toolbar-section">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />
        </div>

        <div className="dashboard-grid">
          <section className="list-section" aria-label="Device List">
            <div className="list-section-header">
              <h2 className="section-title">Devices ({filteredDevices.length})</h2>
            </div>
            
            {filteredDevices.length === 0 ? (
              <div className="empty-results">
                <p className="empty-results-text">No devices match your search or filters.</p>
                <button onClick={handleResetFilters} className="btn-reset">
                  Clear Search & Filters
                </button>
              </div>
            ) : (
              <div className="device-cards-grid">
                {filteredDevices.map((device) => (
                  <DeviceCard
                    key={device.id}
                    device={device}
                    isSelected={selectedDevice && selectedDevice.id === device.id}
                    onSelect={handleSelectDevice}
                  />
                ))}
              </div>
            )}
          </section>

          <aside className="detail-section" aria-label="Device Inspection & Details">
            <DeviceDetail
              device={selectedDevice}
              showInspectionForm={showInspectionForm}
              onClose={handleCloseDetail}
              onInspectClick={() => setShowInspectionForm(true)}
              onInspectSubmit={handleInspectSubmit}
              onInspectCancel={() => setShowInspectionForm(false)}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;

