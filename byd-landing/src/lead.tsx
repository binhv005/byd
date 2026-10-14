import { createContext, useContext } from 'react';

export type LeadMode = 'testdrive' | 'consult';
export interface LeadPreset {
  car?: string;
  need?: string;
}
export interface LeadApi {
  openLead: (mode: LeadMode, preset?: LeadPreset) => void;
  openPrivacy: () => void;
  pickVehicle: (id: string) => void;
}

export const LeadContext = createContext<LeadApi>({ openLead() {}, openPrivacy() {}, pickVehicle() {} });
export const useLead = () => useContext(LeadContext);
