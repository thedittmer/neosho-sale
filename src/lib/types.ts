export interface GarageSale {
    id?: string;
    email: string;
    title: string;
    body: string;
    street_address: string;
    map_coordinates: { lat: number; lng: number } | null;
    photos: File[];
    expires_at: string;
    recovery_link?: string;
}

export interface FormState {
    currentStep: number;
    data: GarageSale;
    isSubmitting: boolean;
    errors: Record<string, string>;
} 