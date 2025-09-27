"use client"
import React, { useState } from 'react';
import { AlertCircle, Info, Car, Zap } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

const EmissionsCalculator = () => {
  const [vehicleType, setVehicleType] = useState('ev');
  const [distance, setDistance] = useState('');
  const [energyConsumption, setEnergyConsumption] = useState('');
  const [chargingEfficiency, setChargingEfficiency] = useState('');
  const [fuelEfficiency, setFuelEfficiency] = useState('');
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  const GRID_EMISSION_FACTOR = 0.5;
  const PETROL_EMISSION_FACTOR = 2.31;

  const validateInputs = () => {
    const newErrors = {};
    
    if (!distance || isNaN(distance) || Number(distance) <= 0) {
      newErrors.distance = 'Please enter a valid distance';
    }

    if (vehicleType === 'ev') {
      if (!energyConsumption || isNaN(energyConsumption) || Number(energyConsumption) <= 0) {
        newErrors.energyConsumption = 'Please enter a valid energy consumption';
      }
      if (!chargingEfficiency || isNaN(chargingEfficiency) || 
          Number(chargingEfficiency) <= 0 || Number(chargingEfficiency) > 100) {
        newErrors.chargingEfficiency = 'Efficiency must be between 0 and 100';
      }
    } else {
      if (!fuelEfficiency || isNaN(fuelEfficiency) || Number(fuelEfficiency) <= 0) {
        newErrors.fuelEfficiency = 'Please enter a valid fuel efficiency';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateEmissions = () => {
    if (!validateInputs()) return;

    let emissions = 0;
    
    if (vehicleType === 'ev') {
      // New formula: (Distance × Energy Consumption × (1 / Charging Efficiency)) × Grid Factor
      const dist = Number(distance);
      const ec = Number(energyConsumption);
      const eff = Number(chargingEfficiency);
      const energyWithLosses = dist * ec * (1 / (eff / 100));
      emissions = energyWithLosses * GRID_EMISSION_FACTOR;
    } else {
      const fuelConsumed = Number(distance) / Number(fuelEfficiency);
      emissions = fuelConsumed * PETROL_EMISSION_FACTOR;
    }

    setResult(emissions.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <h1 className="text-3xl font-bold">CO₂ Emissions Calculator</h1>
          <p className="mt-2 opacity-90">Calculate your vehicle's carbon footprint</p>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setVehicleType('ev')}
              className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                vehicleType === 'ev'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
              }`}
            >
              <Zap className={`h-5 w-5 ${vehicleType === 'ev' ? 'text-blue-500' : 'text-gray-400'}`} />
              <span className="font-medium">Electric Vehicle</span>
            </button>
            <button
              onClick={() => setVehicleType('petrol')}
              className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                vehicleType === 'petrol'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
              }`}
            >
              <Car className={`h-5 w-5 ${vehicleType === 'petrol' ? 'text-blue-500' : 'text-gray-400'}`} />
              <span className="font-medium">Petrol Vehicle</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distance (km)
              </label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter distance traveled"
              />
              {errors.distance && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.distance}</AlertDescription>
                </Alert>
              )}
            </div>

            {vehicleType === 'ev' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Energy Consumption (kWh/km)
                  </label>
                  <input
                    type="number"
                    value={energyConsumption}
                    onChange={(e) => setEnergyConsumption(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter energy consumption per km"
                  />
                  {errors.energyConsumption && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.energyConsumption}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Charging Efficiency (%)
                  </label>
                  <input
                    type="number"
                    value={chargingEfficiency}
                    onChange={(e) => setChargingEfficiency(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter charging efficiency"
                  />
                  {errors.chargingEfficiency && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.chargingEfficiency}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuel Efficiency (km/L)
                </label>
                <input
                  type="number"
                  value={fuelEfficiency}
                  onChange={(e) => setFuelEfficiency(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter fuel efficiency"
                />
                {errors.fuelEfficiency && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.fuelEfficiency}</AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            <button
              onClick={calculateEmissions}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-lg hover:shadow-xl"
            >
              Calculate Emissions
            </button>
          </div>

          {result && (
            <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-blue-50 border border-green-100 rounded-xl">
              <h2 className="text-xl font-semibold text-green-800 mb-2">Results</h2>
              <div className="text-3xl font-bold text-green-600">{result} kg CO₂</div>
              <p className="mt-2 text-sm text-green-700">Total carbon dioxide emissions</p>
            </div>
          )}

          <div className="mt-6 p-6 bg-gray-50 border border-gray-100 rounded-xl">
            <div className="flex items-center gap-2 text-gray-700">
              <Info className="h-5 w-5" />
              <span className="font-medium">Important Note</span>
            </div>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              These calculations use standard emission factors and may vary based on your region's
              specific energy mix and other local factors. For EVs, grid emission factors vary by location
              and time of charging.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmissionsCalculator;