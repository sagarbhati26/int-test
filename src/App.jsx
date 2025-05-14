
import { useState } from "react";
import { states, cities, pincodes } from "./indianStates"; 
import "./App.css";

function App() {
  const [selectedStateId, setSelectedStateId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedPincodeId, setSelectedPincodeId] = useState("");

  const filteredCities = cities.filter((city) => city.stateId === selectedStateId);
  const filteredPincodes = pincodes.filter((pin) => pin.cityId === selectedCityId);

  const selectedState = states.find((s) => s.id === selectedStateId);
  const selectedCity = cities.find((c) => c.id === selectedCityId);
  const selectedPincode = pincodes.find((p) => p.id === selectedPincodeId);

  return (
    <div className="container">
      <h2>Pincode Selector</h2>

      
      <div className="dropdown">
        <label>State:</label>
        <select
          value={selectedStateId}
          onChange={(e) => {
            setSelectedStateId(e.target.value);
            setSelectedCityId("");
            setSelectedPincodeId("");
          }}
        >
          <option value="">-- Select State --</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>{state.name}</option>
          ))}
        </select>
      </div>

    
      <div className="dropdown">
        <label>City:</label>
        <select
          value={selectedCityId}
          onChange={(e) => {
            setSelectedCityId(e.target.value);
            setSelectedPincodeId("");
          }}
          disabled={!selectedStateId}
        >
          <option value="">-- Select City --</option>
          {filteredCities.map((city) => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
      </div>

      <div className="radio-group">
  <label>Pincode:</label>
  {filteredPincodes.length === 0 ? (
    <p>Please select a city first.</p>
  ) : (
    filteredPincodes.map((pin) => (
      <div key={pin.id} className="radio-option">
        <input
          type="radio"
          id={pin.id}
          name="pincode"
          value={pin.id}
          checked={selectedPincodeId === pin.id}
          onChange={(e) => setSelectedPincodeId(e.target.value)}
        />
        <label htmlFor={pin.id}>{pin.code}</label>
      </div>
    ))
  )}
</div>

    
      <hr />
      <h3>Selected:</h3>
      <p><strong>State:</strong> {selectedState?.name || "None"}</p>
      <p><strong>City:</strong> {selectedCity?.name || "None"}</p>
      <p><strong>Pincode:</strong> {selectedPincode?.code || "None"}</p>
    </div>
  );
}

export default App;