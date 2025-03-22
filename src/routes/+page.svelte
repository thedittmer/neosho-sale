<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import { Sun, Moon, Phone, MessageSquare } from 'lucide-svelte';
  export let data: PageData;

  let isDarkMode = false;

  onMount(() => {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    isDarkMode = prefersDark;

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      isDarkMode = e.matches;
    });
  });

  function toggleTheme() {
    isDarkMode = !isDarkMode;
  }

  const address = "12687 Gateway Dr, Neosho, MO 64850";
  const phoneNumber = "417-312-1469";
</script>

<svelte:head>
  <title>{data.metadata.title}</title>
  <meta name="description" content={data.metadata.description} />
  <meta name="keywords" content={data.metadata.keywords} />
  <meta property="og:title" content={data.metadata.openGraph.title} />
  <meta property="og:description" content={data.metadata.openGraph.description} />
  <meta property="og:type" content={data.metadata.openGraph.type} />
  <meta property="og:locale" content={data.metadata.openGraph.locale} />
  <meta property="og:site_name" content={data.metadata.openGraph.siteName} />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://neosho-garage-sale.com" />
</svelte:head>

<div class="min-h-screen transition-colors duration-200 {isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}">
  <!-- Website Branding -->
  <div class="text-center py-2 {isDarkMode ? 'bg-gray-800' : 'bg-yellow-50'}">
    <p class="text-sm font-medium {isDarkMode ? 'text-gray-300' : 'text-gray-700'}">
      Welcome to <a href="https://www.neosho.sale" class="font-bold {isDarkMode ? 'text-yellow-500 hover:text-yellow-400' : 'text-yellow-600 hover:text-yellow-700'}">neosho.sale</a>
    </p>
  </div>

  <!-- Bitcoin Promotion Banner -->
  <Card class="mb-4 sm:mb-8 bg-gradient-to-r from-orange-500 to-yellow-500">
    <div class="p-4 sm:p-6 text-white">
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold mb-2">
            🌟 Bitcoin Accepted Here!
          </h2>
          <p class="text-sm sm:text-base opacity-90">
            Be part of history - First garage sale in Neosho accepting Bitcoin payments.
            Both Bitcoin Network and Lightning Network accepted.
          </p>
        </div>
        <Button
          variant="secondary"
          class="whitespace-nowrap"
          on:click={() => document.getElementById('payment-options')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Learn More
        </Button>
      </div>
    </div>
  </Card>

  <!-- Fixed Contact Buttons -->
  <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
    <Button
      size="lg"
      class="{isDarkMode ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' : 'bg-yellow-600 hover:bg-yellow-700 text-white'} font-bold"
      on:click={() => window.location.href = `tel:${phoneNumber}`}
    >
      <Phone class="mr-2 h-5 w-5" />
      Call Us
    </Button>
    <Button
      size="lg"
      class="{isDarkMode ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' : 'bg-yellow-600 hover:bg-yellow-700 text-white'} font-bold"
      on:click={() => window.location.href = `sms:${phoneNumber}`}
    >
      <MessageSquare class="mr-2 h-5 w-5" />
      Text Us
    </Button>
  </div>

  <!-- Theme Toggle Button -->
  <div class="fixed top-4 right-4 z-50">
    <Button
      variant="ghost"
      size="icon"
      class="{isDarkMode ? 'text-yellow-500 hover:text-yellow-400' : 'text-yellow-600 hover:text-yellow-700'}"
      on:click={toggleTheme}
      aria-label="Toggle theme"
    >
      {#if isDarkMode}
        <Sun class="h-5 w-5" />
      {:else}
        <Moon class="h-5 w-5" />
      {/if}
    </Button>
  </div>

  <!-- Hero Section with Map -->
  <div class="container mx-auto px-4 py-8">
    <!-- Prominent Address Display -->
    <div class="text-center mb-8 p-4 rounded-lg {isDarkMode ? 'bg-gray-800' : 'bg-yellow-50'}">
      <h2 class="text-2xl md:text-3xl font-bold {isDarkMode ? 'text-yellow-500' : 'text-yellow-600'} mb-2">
        Visit Us At:
      </h2>
      <p class="text-xl md:text-2xl font-bold {isDarkMode ? 'text-white' : 'text-gray-900'}">
        {address}
      </p>
    </div>

    <div class="aspect-video w-full overflow-hidden rounded-lg shadow-2xl mb-8">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3191.330351891743!2d-94.41250031924922!3d36.88244460127161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c8600e1015df45%3A0x2bf9e4f2637d5e5!2s12687%20Gateway%20Dr%2C%20Neosho%2C%20MO%2064850!5e0!3m2!1sen!2sus!4v1742683360928!5m2!1sen!2sus" 
        class="w-full h-full"
        style="border:0;" 
        allowfullscreen={true}
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>

    <!-- Hero Content -->
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-6xl font-bold {isDarkMode ? 'text-yellow-500' : 'text-yellow-600'} mb-4">
        NEOSHO CITY-WIDE GARAGE SALE
      </h1>
      <p class="text-xl md:text-2xl {isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-6">
        A Must-Stop Location on Your Neosho Garage Sale Route!
      </p>
      <div class="text-lg {isDarkMode ? 'text-gray-400' : 'text-gray-600'}">
        <p class="font-bold text-xl mb-2">📍 {address}</p>
        <p class="mt-2">⏰ April 4-5, 2025</p>
        <p class="mt-2">🕒 8 AM - 4 PM Both Days</p>
        <p class="mt-2">🚗 Perfect Stop on Highway 60</p>
      </div>
    </div>

    <!-- Contact Section -->
    <div class="text-center mb-12 p-6 rounded-lg {isDarkMode ? 'bg-gray-800' : 'bg-yellow-50'}">
      <h2 class="text-2xl font-bold {isDarkMode ? 'text-yellow-500' : 'text-yellow-600'} mb-4">
        Questions? Contact Us!
      </h2>
      <p class="text-xl font-bold {isDarkMode ? 'text-white' : 'text-gray-900'} mb-4">
        {phoneNumber}
      </p>
      <div class="flex justify-center gap-4">
        <Button
          size="lg"
          class="{isDarkMode ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' : 'bg-yellow-600 hover:bg-yellow-700 text-white'} font-bold"
          on:click={() => window.location.href = `tel:${phoneNumber}`}
        >
          <Phone class="mr-2 h-5 w-5" />
          Call Us
        </Button>
        <Button
          size="lg"
          class="{isDarkMode ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' : 'bg-yellow-600 hover:bg-yellow-700 text-white'} font-bold"
          on:click={() => window.location.href = `sms:${phoneNumber}`}
        >
          <MessageSquare class="mr-2 h-5 w-5" />
          Text Us
        </Button>
      </div>
    </div>

    <!-- SEO Rich Content -->
    <div class="prose {isDarkMode ? 'prose-invert' : ''} max-w-none mb-12">
      <p class="text-lg">
        Looking for a convenient stop during the Neosho city-wide garage sale? 
        Our location on Gateway Drive is the perfect spot to check out quality items 
        at great prices. Whether you're just starting your shopping or heading home, 
        we're worth the stop!
      </p>
      <p class="text-lg">
        Located right on Highway 60, we're easy to find and offer plenty of parking. 
        Don't miss out on our selection of quality items - it's a great addition to 
        your garage sale shopping route. The event takes place rain or shine, so 
        come prepared for great deals!
      </p>
    </div>

    <!-- Items Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card class="{isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}">
        <CardHeader>
          <CardTitle class="{isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}">Tools & Equipment</CardTitle>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2 {isDarkMode ? 'text-gray-300' : 'text-gray-700'}">
            <li>• Power Tools</li>
            <li>• Hand Tools</li>
            <li>• Garden Equipment</li>
            <li>• Workshop Supplies</li>
          </ul>
        </CardContent>
      </Card>

      <Card class="{isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}">
        <CardHeader>
          <CardTitle class="{isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}">Furniture</CardTitle>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2 {isDarkMode ? 'text-gray-300' : 'text-gray-700'}">
            <li>• Living Room Sets</li>
            <li>• Bedroom Furniture</li>
            <li>• Outdoor Furniture</li>
            <li>• Storage Solutions</li>
          </ul>
        </CardContent>
      </Card>

      <Card class="{isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}">
        <CardHeader>
          <CardTitle class="{isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}">Electronics</CardTitle>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2 {isDarkMode ? 'text-gray-300' : 'text-gray-700'}">
            <li>• TVs & Monitors</li>
            <li>• Audio Equipment</li>
            <li>• Gaming Systems</li>
            <li>• Small Appliances</li>
          </ul>
        </CardContent>
      </Card>

      <Card class="{isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}">
        <CardHeader>
          <CardTitle class="{isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}">Sports & Recreation</CardTitle>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2 {isDarkMode ? 'text-gray-300' : 'text-gray-700'}">
            <li>• Exercise Equipment</li>
            <li>• Sports Gear</li>
            <li>• Camping Equipment</li>
            <li>• Bikes & Accessories</li>
          </ul>
        </CardContent>
      </Card>

      <Card class="{isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}">
        <CardHeader>
          <CardTitle class="{isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}">Home & Kitchen</CardTitle>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2 {isDarkMode ? 'text-gray-300' : 'text-gray-700'}">
            <li>• Kitchen Appliances</li>
            <li>• Cookware</li>
            <li>• Home Decor</li>
            <li>• Storage Containers</li>
          </ul>
        </CardContent>
      </Card>

      <Card class="{isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}">
        <CardHeader>
          <CardTitle class="{isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}">And Much More!</CardTitle>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2 {isDarkMode ? 'text-gray-300' : 'text-gray-700'}">
            <li>• Books & Media</li>
            <li>• Clothing</li>
            <li>• Collectibles</li>
            <li>• Miscellaneous Items</li>
          </ul>
        </CardContent>
      </Card>
    </div>

    <!-- Call to Action -->
    <div class="text-center mt-12">
      <Button 
        size="lg" 
        class="{isDarkMode ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' : 'bg-yellow-600 hover:bg-yellow-700 text-white'} font-bold"
        on:click={() => window.open('https://www.google.com/maps/dir/?api=1&destination=12687+Gateway+Dr+Neosho+MO+64850', '_blank')}
      >
        Get Directions
      </Button>
    </div>

    <!-- RV Sale Promotion -->
    <Card class="p-4 sm:p-6 mt-12 {isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}">
      <div class="text-center mb-6">
        <h2 class="text-2xl sm:text-3xl font-bold {isDarkMode ? 'text-yellow-500' : 'text-yellow-600'} mb-4">
          🚛 Special Offer: Class A RV for Sale!
        </h2>
        <p class="text-lg {isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-6">
          While you're in the area, don't miss out on this incredible opportunity!
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="space-y-4">
          <h3 class="text-xl font-bold {isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}">
            2002 Safari Zanzibar Class A Diesel Motor Home
          </h3>
          <ul class="space-y-2 {isDarkMode ? 'text-gray-300' : 'text-gray-700'}">
            <li>• 38' Length with 2 Slide-outs</li>
            <li>• CAT Diesel 7.2-L L-6 330hp Engine</li>
            <li>• Allison Automatic Transmission</li>
            <li>• Only 78,848 Miles</li>
            <li>• Self-Contained with Large Bathroom</li>
          </ul>
          <p class="text-xl font-bold {isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}">
            Only $22,000
          </p>
        </div>
        <div class="text-center">
          <Button 
            size="lg" 
            class="{isDarkMode ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' : 'bg-yellow-600 hover:bg-yellow-700 text-white'} font-bold"
            on:click={() => window.open('https://www.arv.sale', '_blank')}
          >
            View RV Details
          </Button>
        </div>
      </div>
    </Card>

    <!-- Payment Options Section -->
    <Card class="p-4 sm:p-6 mt-12 {isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}" id="payment-options">
      <h2 class="text-xl sm:text-2xl font-semibold mb-4 {isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}">Payment Options</h2>
      
      <div class="space-y-6">
        <!-- Cash Payment -->
        <div class="space-y-2 p-4 border rounded-lg {isDarkMode ? 'border-gray-700 hover:border-yellow-500' : 'border-gray-200 hover:border-yellow-600'} transition-colors">
          <h3 class="text-lg font-medium flex items-center gap-2 {isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 5H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2z"/>
              <path d="M3 10h18"/>
            </svg>
            Cash Payment
          </h3>
          <p class="{isDarkMode ? 'text-gray-300' : 'text-gray-700'}">
            Cash payment accepted in person at the time of sale.
          </p>
        </div>

        <!-- Cryptocurrency -->
        <div class="space-y-2 p-4 border rounded-lg {isDarkMode ? 'border-gray-700 hover:border-yellow-500' : 'border-gray-200 hover:border-yellow-600'} transition-colors">
          <h3 class="text-lg font-medium flex items-center gap-2 {isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 5H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2z"/>
              <path d="M3 10h18"/>
            </svg>
            Bitcoin Payment
          </h3>
          <p class="{isDarkMode ? 'text-gray-300' : 'text-gray-700'}">
            For tech-savvy shoppers, we accept Bitcoin payments. Choose your preferred network:
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <!-- Bitcoin Network -->
            <div class="p-4 border rounded-lg space-y-2 {isDarkMode ? 'border-gray-700' : 'border-gray-200'}">
              <h4 class="font-medium {isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}">Bitcoin Network</h4>
              <div class="bg-white p-4 rounded-lg inline-block">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=bc1qghyw3qsq789fgc56smff6uth9wukmlx97g3073`}
                  alt="Bitcoin QR Code"
                  class="w-32 h-32"
                />
              </div>
              <div class="text-sm {isDarkMode ? 'text-gray-400' : 'text-gray-600'} break-all">
                bc1qghyw3qsq789fgc56smff6uth9wukmlx97g3073
              </div>
            </div>

            <!-- Lightning Network -->
            <div class="p-4 border rounded-lg space-y-2 {isDarkMode ? 'border-gray-700' : 'border-gray-200'}">
              <h4 class="font-medium {isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}">Lightning Network</h4>
              <div class="bg-white p-4 rounded-lg inline-block">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=lnbc1pnccyj4dqdgdshx6pqg9c8qpp59yd2g7p7230vjkrurvwwnhl5qpsvt0l0gqs9956juwfcwlgh8qussp56mxwm2lda9kzle7wdxjgppv43c6kwdyxkw3p73nwtv0mvyt5cpms9qrsgqcqpcxqy8ayqrzjqv06k0m23t593pngl0jt7n9wznp64fqngvctz7vts8nq4tukvtljqr96vcqq05gqqcqqqqqqqqqqqqqq9grzjqtsjy9p55gdceevp36fvdmrkxqvzfhy8ak2tgc5zgtjtra9xlaz97rxf5yqqxdcqqcqqqqqqqqqqqqqq9g9p44sxgrj2p930swtzukps6emg2ccrwrf2gqr7sp9k7xntsaejjp000ucrywel5yck8qvvapg094gpwnptmvq5jnv9vpzlgn8h5e6csp0d7z5y`}
                  alt="Lightning Network QR Code"
                  class="w-32 h-32"
                />
              </div>
              <div class="text-xs {isDarkMode ? 'text-gray-400' : 'text-gray-600'} break-all">
                Lightning Network Invoice (scan with compatible wallet)
              </div>
            </div>
          </div>
          <p class="text-sm {isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-2">
            Note: Bitcoin payments are irreversible. Please ensure you're comfortable with 
            cryptocurrency transactions before choosing this option.
          </p>
        </div>
      </div>
    </Card>
  </div>
</div>
