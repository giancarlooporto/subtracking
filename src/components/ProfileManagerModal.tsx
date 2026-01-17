import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Edit, Check, MapPin, DollarSign, Zap } from 'lucide-react';
import { Profile, getCurrencySymbol } from '../types';

interface ProfileManagerModalProps {
    isOpen: boolean;
    onClose: () => void;
    profiles: Profile[];
    activeProfileId: string | null;
    onSwitchProfile: (profileId: string) => void;
    onEditProfile: (profile: Profile) => void;
    onDeleteProfile: (profileId: string) => void;
    onCreateProfile: () => void;
    isPro: boolean;
    onUnlockPro: () => void;
}

export function ProfileManagerModal({
    isOpen,
    onClose,
    profiles,
    activeProfileId,
    onSwitchProfile,
    onEditProfile,
    onDeleteProfile,
    onCreateProfile,
    isPro,
    onUnlockPro
}: ProfileManagerModalProps) {
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    const handleDelete = (profileId: string) => {
        if (profiles.length === 1) {
            alert('Cannot delete the last profile');
            return;
        }

        if (confirmDelete === profileId) {
            onDeleteProfile(profileId);
            setConfirmDelete(null);
        } else {
            setConfirmDelete(profileId);
            // Auto-cancel after 3 seconds
            setTimeout(() => setConfirmDelete(null), 3000);
        }
    };

    const handleCreateClick = () => {
        if (!isPro && profiles.length >= 1) {
            onClose();
            onUnlockPro();
        } else {
            onCreateProfile();
        }
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
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[80vh] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-800">
                            <div>
                                <h2 className="text-xl font-bold text-white">Manage Profiles</h2>
                                <p className="text-sm text-slate-400 mt-1">
                                    {profiles.length} profile{profiles.length !== 1 ? 's' : ''} total
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Profile List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-3">
                            {profiles.map((profile) => {
                                const isActive = profile.id === activeProfileId;
                                const isConfirmingDelete = confirmDelete === profile.id;

                                return (
                                    <motion.div
                                        key={profile.id}
                                        layout
                                        className={`
                      relative p-4 rounded-xl border transition-all
                      ${isActive
                                                ? 'bg-indigo-500/10 border-indigo-500/30 ring-2 ring-indigo-500/20'
                                                : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                                            }
                    `}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            {/* Profile Info */}
                                            <button
                                                onClick={() => !isActive && onSwitchProfile(profile.id)}
                                                className="flex-1 text-left"
                                                disabled={isActive}
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="text-lg font-bold text-white">
                                                        {profile.name}
                                                    </h3>
                                                    {isActive && (
                                                        <span className="px-2 py-0.5 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-xs font-bold text-indigo-400">
                                                            <Check className="w-3 h-3 inline mr-1" />
                                                            Active
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" />
                                                        {profile.city}
                                                    </span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                                                    <span className="flex items-center gap-1">
                                                        <DollarSign className="w-4 h-4" />
                                                        {getCurrencySymbol(profile.currency)} {profile.currency}
                                                    </span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                                                    <span className="text-slate-500">
                                                        {profile.subscriptions.length} subscription{profile.subscriptions.length !== 1 ? 's' : ''}
                                                    </span>
                                                </div>
                                            </button>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => onEditProfile(profile)}
                                                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-indigo-400"
                                                    title="Edit Profile"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(profile.id)}
                                                    disabled={profiles.length === 1}
                                                    className={`
                            p-2 rounded-lg transition-colors
                            ${profiles.length === 1
                                                            ? 'text-slate-600 cursor-not-allowed'
                                                            : isConfirmingDelete
                                                                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                                                : 'hover:bg-slate-700 text-slate-400 hover:text-red-400'
                                                        }
                          `}
                                                    title={profiles.length === 1 ? 'Cannot delete last profile' : 'Delete Profile'}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Delete Confirmation */}
                                        {isConfirmingDelete && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="mt-3 pt-3 border-t border-slate-700"
                                            >
                                                <p className="text-sm text-red-400 font-medium">
                                                    ⚠️ Click delete again to confirm. This will delete all {profile.subscriptions.length} subscriptions in this profile.
                                                </p>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-slate-800 bg-slate-900/50">
                            <button
                                onClick={handleCreateClick}
                                className={`w-full px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2
                                    ${!isPro && profiles.length >= 1
                                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                            >
                                {!isPro && profiles.length >= 1 ? (
                                    <>
                                        <Zap className="w-5 h-5 text-indigo-400 fill-indigo-400" />
                                        <span>Unlock Unlimited Profiles (Pro)</span>
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-5 h-5" />
                                        Create New Profile
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
