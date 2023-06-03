export interface Diagnosis {
    id: string;
    name: string;
    description?: string;
}

export interface Treatment {
    id: string;
    name: string;
    description?: string;
}

export interface Medication {
    id: string;
    name: string;
    dosage: string;
}

export interface Patient {
    id: string;
    name: string;
    email: string;
    phone?: string;
    diagnoses?: Diagnosis[];
    treatments?: Treatment[];
    medications?: Medication[];
    createdAt: number;
}
