import { error } from '@sveltejs/kit';
import type { Actions } from './$types';
import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { PRIVATE_POCKETBASE_EMAIL, PRIVATE_POCKETBASE_PASSWORD } from '$env/static/private';

const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

async function initPocketBase() {
    try {
        await pb.admins.authWithPassword(PRIVATE_POCKETBASE_EMAIL, PRIVATE_POCKETBASE_PASSWORD);
    } catch (err) {
        console.error('PocketBase authentication failed:', err);
        throw error(500, 'Database connection failed');
    }
}

export const actions = {
    save: async ({ request }) => {
        try {
            await initPocketBase();
            const formData = await request.formData();
            const step = formData.get('step');
            let listingId = formData.get('listingId');

            // Clean up listingId if it's a JSON string
            if (listingId) {
                try {
                    const parsed = JSON.parse(listingId as string);
                    // If it's our success response format, extract the ID
                    if (Array.isArray(parsed) && parsed[2]) {
                        listingId = parsed[2];
                    }
                } catch (e) {
                    // If it's not JSON, use it as-is
                    console.log('[Server] Using listingId as-is:', listingId);
                }
            }

            console.log('[Server] Processing step:', step);
            console.log('[Server] Using listingId:', listingId);
            console.log('[Server] Form data:', Object.fromEntries(formData));

            let record;

            switch (step) {
                case '1':
                    // Basic information
                    record = await pb.collection('garage_sales').create({
                        email: formData.get('email'),
                        title: formData.get('title'),
                        body: formData.get('body') || '',
                        expires_at: formData.get('expires_at')
                    });

                    const recoveryLink = `${PUBLIC_POCKETBASE_URL}/my-garage-sale?id=${record.id}`;
                    record = await pb.collection('garage_sales').update(record.id, {
                        recovery_link: recoveryLink
                    });

                    console.log('[Server] Created record:', record);

                    return {
                        type: "success",
                        data: record.id
                    };

                case '2':
                    if (!listingId) throw error(400, 'Missing listing ID');

                    record = await pb.collection('garage_sales').update(listingId as string, {
                        street_address: formData.get('street_address'),
                        map_coordinates: formData.get('map_coordinates')
                    });

                    return {
                        type: "success",
                        data: record.id
                    };

                case '3':
                    if (!listingId) throw error(400, 'Missing listing ID');

                    const photos = formData.getAll('photos');
                    if (photos.length > 0) {
                        const photoFormData = new FormData();
                        photos.forEach(photo => photoFormData.append('photos', photo));
                        record = await pb.collection('garage_sales').update(listingId as string, photoFormData);

                        console.log('[Server] Updated record with photos:', record);

                        return {
                            type: "success",
                            data: {
                                id: record.id,
                                photos: record.photos,
                                message: `Successfully uploaded ${photos.length} photo(s)`
                            }
                        };
                    }

                    return {
                        type: "success",
                        data: {
                            id: listingId,
                            message: 'No photos to upload'
                        }
                    };

                default:
                    throw error(400, 'Invalid step');
            }
        } catch (err) {
            console.error('[Server] Error:', err);
            return {
                type: "error",
                error: err instanceof Error ? err.message : 'Server error'
            };
        }
    }
} satisfies Actions;

// Add load function to handle recovery links
export async function load({ url }) {
    const id = url.searchParams.get('id');
    if (id) {
        try {
            await initPocketBase();
            const record = await pb.collection('garage_sales').getOne(id);
            return {
                listing: record
            };
        } catch (err) {
            console.error('Failed to load listing:', err);
            throw error(404, 'Listing not found');
        }
    }
    return {};
} 