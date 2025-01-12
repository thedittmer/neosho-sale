<script lang="ts">
    import { writable } from 'svelte/store';
    import type { FormState, GarageSale } from '$lib/types';

    // Initialize form state
    const formState = writable<FormState>({
        currentStep: 1,
        data: {
            email: '',
            title: '',
            body: '',
            street_address: '',
            map_coordinates: null,
            photos: [],
            expires_at: ''
        },
        isSubmitting: false,
        errors: {}
    });

    // Form steps configuration
    const steps = [
        {
            title: 'Basic Information',
            fields: ['email', 'title', 'body', 'expires_at']
        },
        {
            title: 'Location',
            fields: ['street_address', 'map_coordinates']
        },
        {
            title: 'Photos',
            fields: ['photos']
        }
    ];

    async function handleSubmit(event: Event) {
        event.preventDefault();
        
        formState.update(state => ({ ...state, isSubmitting: true, errors: {} }));
        
        try {
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            
            formData.append('step', $formState.currentStep.toString());
            
            // Ensure we're sending a clean ID string
            if ($formState.data.id) {
                // If the ID is stored as a JSON string, parse it
                let cleanId = $formState.data.id;
                try {
                    if (typeof cleanId === 'string' && cleanId.startsWith('[')) {
                        const parsed = JSON.parse(cleanId);
                        if (Array.isArray(parsed) && parsed[2]) {
                            cleanId = parsed[2];
                        }
                    }
                } catch (e) {
                    console.log('[Client] Using ID as-is:', cleanId);
                }
                formData.append('listingId', cleanId.toString());
            }

            console.log('[Client] Submitting form data:', Object.fromEntries(formData));

            const response = await fetch('?/save', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Server returned an error');
            }

            const result = await response.json();
            console.log('[Client] Server response:', result);

            if (result.type === "success") {
                // Extract the ID from the response
                let recordId: string;
                let message: string | undefined;
                
                if (typeof result.data === 'string') {
                    recordId = result.data;
                } else if (typeof result.data === 'object') {
                    recordId = result.data.id;
                    message = result.data.message;
                } else {
                    throw new Error('Invalid response format');
                }

                console.log('[Client] Using record ID:', recordId);
                
                formState.update(state => ({
                    ...state,
                    data: {
                        ...state.data,
                        id: recordId,
                        photos: result.data.photos || state.data.photos,
                        recovery_link: result.data.recovery_link || state.data.recovery_link
                    },
                    message: message,
                    currentStep: state.currentStep < steps.length 
                        ? state.currentStep + 1 
                        : state.currentStep
                }));

                // If this was the final step, show completion message
                if ($formState.currentStep >= steps.length) {
                    alert('Your garage sale listing has been created successfully!');
                }
            } else {
                console.error('[Client] Error response:', result);
                throw new Error(result.error || 'Form submission failed');
            }
        } catch (err) {
            console.error('[Client] Form submission error:', err);
            formState.update(state => ({
                ...state,
                errors: { submit: err.message }
            }));
        } finally {
            formState.update(state => ({ ...state, isSubmitting: false }));
        }
    }

    function handleFileInput(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            formState.update(state => ({
                ...state,
                data: {
                    ...state.data,
                    photos: Array.from(input.files)
                }
            }));
        }
    }

    function removePhoto(photoToRemove: File) {
        formState.update(state => ({
            ...state,
            data: {
                ...state.data,
                photos: state.data.photos.filter(photo => photo !== photoToRemove)
            }
        }));
    }
</script>

<div class="max-w-2xl mx-auto p-4">
    <div class="mb-8">
        <h1 class="text-2xl font-bold mb-4">Create Your Garage Sale</h1>
        
        <!-- Progress steps with labels -->
        <div class="mb-8">
            <div class="flex justify-between mb-2">
                {#each steps as step, i}
                    <div class="flex flex-col items-center w-1/3">
                        <div class={`w-10 h-10 rounded-full flex items-center justify-center mb-2
                            ${i + 1 === $formState.currentStep ? 'bg-blue-500 text-white' : 
                            i + 1 < $formState.currentStep ? 'bg-green-500 text-white' : 
                            'bg-gray-200'}`}>
                            {i + 1 < $formState.currentStep ? '✓' : i + 1}
                        </div>
                        <span class="text-sm text-center">
                            {step.label || `Step ${i + 1}`}
                        </span>
                    </div>
                    {#if i < steps.length - 1}
                        <div class="flex-grow flex items-center">
                            <div class="h-1 w-full bg-gray-200"></div>
                        </div>
                    {/if}
                {/each}
            </div>
        </div>

        <!-- Form -->
        <form on:submit={handleSubmit} class="space-y-6">
            {#if $formState.currentStep === 1}
                <div class="space-y-4">
                    <div>
                        <label for="email" class="block mb-1">Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            bind:value={$formState.data.email}
                            class="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label for="title" class="block mb-1">Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            bind:value={$formState.data.title}
                            class="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label for="body" class="block mb-1">Description</label>
                        <textarea
                            id="body"
                            name="body"
                            bind:value={$formState.data.body}
                            class="w-full p-2 border rounded h-32"
                        ></textarea>
                    </div>

                    <div>
                        <label for="expires_at" class="block mb-1">End Date *</label>
                        <input
                            type="date"
                            id="expires_at"
                            name="expires_at"
                            bind:value={$formState.data.expires_at}
                            class="w-full p-2 border rounded"
                            required
                        />
                    </div>
                </div>

            {:else if $formState.currentStep === 2}
                <div class="space-y-4">
                    <div>
                        <label for="street_address" class="block mb-1">Street Address</label>
                        <input
                            type="text"
                            id="street_address"
                            name="street_address"
                            bind:value={$formState.data.street_address}
                            class="w-full p-2 border rounded"
                        />
                    </div>
                    <!-- Map component would go here -->
                </div>

            {:else if $formState.currentStep === 3}
                <div class="space-y-4">
                    <div>
                        <label for="photos" class="block mb-1">Photos</label>
                        <input
                            type="file"
                            id="photos"
                            name="photos"
                            accept="image/*"
                            multiple
                            on:change={handleFileInput}
                            class="w-full p-2 border rounded"
                        />
                    </div>
                    
                    <!-- Photo previews -->
                    {#if $formState.data.photos?.length > 0}
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {#each $formState.data.photos as photo}
                                <div class="relative aspect-square">
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt="Preview"
                                        class="w-full h-full object-cover rounded"
                                    />
                                    <button
                                        class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                        on:click={() => removePhoto(photo)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>
            {/if}

            <!-- Error message -->
            {#if $formState.errors.submit}
                <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                    <div class="flex-shrink-0 mr-3">
                        <svg class="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <p class="text-red-700">{$formState.errors.submit}</p>
                </div>
            {/if}

            <!-- Navigation -->
            <div class="flex justify-between mt-8">
                {#if $formState.currentStep > 1}
                    <button
                        type="button"
                        class="px-4 py-2 border rounded"
                        on:click={() => formState.update(state => ({
                            ...state,
                            currentStep: state.currentStep - 1
                        }))}>
                        Back
                    </button>
                {:else}
                    <div></div>
                {/if}

                <button
                    type="submit"
                    class="px-4 py-2 bg-blue-500 text-white rounded"
                    disabled={$formState.isSubmitting}>
                    {$formState.isSubmitting ? 'Saving...' : 
                     $formState.currentStep === steps.length ? 'Finish' : 'Next'}
                </button>
            </div>
        </form>

        <!-- Recovery link -->
        {#if $formState.data.recovery_link}
            <div class="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 class="text-lg font-semibold mb-3">Save Your Listing</h3>
                <p class="mb-4 text-gray-600">Use this link to edit your listing later:</p>
                <div class="flex gap-2">
                    <input
                        type="text"
                        readonly
                        value={$formState.data.recovery_link}
                        class="flex-grow p-3 border rounded bg-white font-mono text-sm"
                    />
                    <button
                        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        on:click={() => {
                            navigator.clipboard.writeText($formState.data.recovery_link);
                            alert('Link copied to clipboard!');
                        }}>
                        Copy
                    </button>
                </div>
            </div>
        {/if}

        <!-- After the form -->
        {#if $formState.message}
            <div class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
                <div class="flex-shrink-0 mr-3">
                    <svg class="w-5 h-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                </div>
                <p class="text-green-700">{$formState.message}</p>
            </div>
        {/if}
    </div>
</div>

<style>
    /* Add any custom styles here */
</style>
