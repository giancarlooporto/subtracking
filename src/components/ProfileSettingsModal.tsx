import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, DollarSign, Globe } from 'lucide-react';
import { Profile, SUPPORTED_CURRENCIES } from '../types';
import { searchCities, CityData } from '../lib/cities';
import { TIMEZONES, detectTimezone, formatTimezone } from '../lib/timezones';

interface ProfileSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (profile: { name: string; city: string; timezone: string; currency: string }) => void;
    initialData?: Profile;
    title?: string;
}

export function ProfileSettingsModal({
    isOpen,
    onClose,
    onSave,
    initialData,
    title = 'Profile Settings'
}: ProfileSettingsModalProps) {
    const [name, setName] = useState(initialData?.name || 'Main Profile');
    const [city, setCity] = useState(initialData?.city || '');
    const [timezone, setTimezone] = useState(initialData?.timezone || detectTimezone());
    const [currency, setCurrency] = useState(initialData?.currency || 'USD');

    // City autocomplete state
    const [showCitySuggestions, setShowCitySuggestions] = useState(false);
    const [citySuggestions, setCitySuggestions] = useState<CityData[]>([]);

    // Update city suggestions as user types
    useEffect(() => {
        if (city.length >= 2) {
            const results = searchCities(city);
            setCitySuggestions(results);
            setShowCitySuggestions(results.length > 0);
        } else {
            setCitySuggestions([]);
            setShowCitySuggestions(false);
        }
    }, [city]);

    const handleCitySelect = (selectedCity: CityData) => {
        setCity(selectedCity.name);
        setTimezone(selectedCity.timezone);
        setShowCitySuggestions(false);
    };

    const handleSave = () => {
        if (!name.trim()) {
            alert('Please enter a profile name');
            return;
        }

        if (!city.trim()) {
            alert('Please enter a city name');
            return;
        }

        onSave({
            name: name.trim(),
            city: city.trim(),
            timezone,
            currency
        });

        onClose();
    };

    const handleClose = () => {
        // Reset form
        setName(initialData?.name || 'Main Profile');
        setCity(initialData?.city || '');
        setTimezone(initialData?.timezone || detectTimezone());
        setCurrency(initialData?.currency || 'USD');
        setShowCitySuggestions(false);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-800">
                            <h2 className="text-xl font-bold text-white">{title}</h2>
                            <button
                                onClick={handleClose}
                                className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                            {/* Profile Name */}
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2">
                                    Profile Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Main Profile"
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>

                            {/* City (Autocomplete with free text) */}
                            <div className="relative">
                                <label className="block text-sm font-bold text-slate-300 mb-2">
                                    <MapPin className="w-4 h-4 inline mr-1" />
                                    City
                                </label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    onFocus={() => {
                                        if (citySuggestions.length > 0) {
                                            setShowCitySuggestions(true);
                                        }
                                    }}
                                    placeholder="Type any city name..."
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <p className="text-xs text-slate-500 mt-1">
                                    💡 Start typing for suggestions, or enter any city name
                                </p>

                                {/* City Suggestions Dropdown */}
                                <AnimatePresence>
                                    {showCitySuggestions && citySuggestions.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute z-10 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-h-60 overflow-y-auto"
                                        >
                                            {citySuggestions.map((cityData) => (
                                                <button
                                                    key={`${cityData.name}-${cityData.country}`}
                                                    onClick={() => handleCitySelect(cityData)}
                                                    className="w-full px-4 py-3 text-left hover:bg-slate-700 transition-colors border-b border-slate-700/50 last:border-b-0"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <div className="text-white font-medium">
                                                                {cityData.flag} {cityData.name}
                                                            </div>
                                                            <div className="text-xs text-slate-400">
                                                                {cityData.country} · {formatTimezone(cityData.timezone)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Timezone Selector */}
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2">
                                    <Globe className="w-4 h-4 inline mr-1" />
                                    Timezone
                                </label>
                                <select
                                    value={timezone}
                                    onChange={(e) => setTimezone(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    {TIMEZONES.map((tz) => (
                                        <option key={tz} value={tz}>
                                            {formatTimezone(tz)}
                                        </option>
                                    ))}
                                </select>
                                <p className="text-xs text-slate-500 mt-1">
                                    Auto-detected, but you can change it
                                </p>
                            </div>

                            {/* Currency Selector */}
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2">
                                    <DollarSign className="w-4 h-4 inline mr-1" />
                                    Currency
                                </label>
                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    {SUPPORTED_CURRENCIES.map((curr) => (
                                        <option key={curr.code} value={curr.code}>
                                            {curr.symbol} {curr.code} - {curr.name}
                                        </option>
                                    ))}
                                </select>
                                <p className="text-xs text-slate-500 mt-1">
                                    Select your preferred currency
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-800 bg-slate-900/50">
                            <button
                                onClick={handleClose}
                                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!name.trim() || !city.trim()}
                                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                            >
                                Save Profile
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
