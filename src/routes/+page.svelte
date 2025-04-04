<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import { Sun, Moon, Phone, MessageSquare, ArrowRight } from 'lucide-svelte';
  export let data: PageData;

  let isDarkMode = false;
  let isVisible = false;

  onMount(() => {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    isDarkMode = prefersDark;

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      isDarkMode = e.matches;
    });

    // Trigger animations on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
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
  <style>
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }

    @keyframes slideIn {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
    }

    .animate-pulse {
      animation: pulse 2s ease-in-out infinite;
    }

    .animate-on-scroll {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.6s ease-out;
    }

    .animate-on-scroll.animate-in {
      opacity: 1;
      transform: translateY(0);
    }

    .hover-lift {
      transition: transform 0.3s ease;
    }

    .hover-lift:hover {
      transform: translateY(-5px);
    }

    .gradient-text {
      background: linear-gradient(45deg, #f59e0b, #eab308);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .dark .gradient-text {
      background: linear-gradient(45deg, #fbbf24, #fde047);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  </style>
</svelte:head>

<div class="min-h-screen transition-colors duration-200 {isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}">
  <!-- Website Branding -->
  <div class="text-center py-2 {isDarkMode ? 'bg-gray-800' : 'bg-yellow-50'} animate-on-scroll">
    <p class="text-sm font-medium {isDarkMode ? 'text-gray-300' : 'text-gray-700'}">
      Welcome to <a href="https://www.neosho.sale" class="font-bold gradient-text hover:opacity-80 transition-opacity">neosho.sale</a>
    </p>
  </div>

  <!-- Rain Check Alert Banner -->
  {#if data.metadata.rainCheck?.isPostponed}
    <div class="p-4 my-4 sm:my-6 rounded-lg text-center font-bold text-white bg-red-600 animate-pulse animate-on-scroll">
      <h2 class="text-2xl sm:text-3xl mb-2">⚠️ POSTPONED DUE TO WEATHER ⚠️</h2>
      <p class="text-lg sm:text-xl">{data.metadata.rainCheck.message}</p>
      <p class="mt-2">Please check back for the updated date and time.</p>
    </div>
  {/if}

  <!-- Bitcoin Promotion Banner -->
  <Card class="mb-4 sm:mb-8 bg-gradient-to-r from-orange-500 to-yellow-500 animate-on-scroll">
    <div class="p-4 sm:p-6 text-white">
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold mb-2 animate-pulse">
            🌟 Bitcoin Accepted Here!
          </h2>
          <p class="text-sm sm:text-base opacity-90">
            Be part of history - First garage sale in Neosho accepting Bitcoin payments.
            Both Bitcoin Network and Lightning Network accepted.
          </p>
        </div>
        <Button
          variant="secondary"
          class="whitespace-nowrap hover-lift"
          on:click={() => document.getElementById('payment-options')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Learn More <ArrowRight class="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  </Card>

  <!-- Fixed Contact Buttons -->
  <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
    <Button
      size="lg"
      class="{isDarkMode ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' : 'bg-yellow-600 hover:bg-yellow-700 text-white'} font-bold hover-lift"
      on:click={() => window.location.href = `tel:${phoneNumber}`}
    >
      <Phone class="mr-2 h-5 w-5" />
      Call Us
    </Button>
    <Button
      size="lg"
      class="{isDarkMode ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' : 'bg-yellow-600 hover:bg-yellow-700 text-white'} font-bold hover-lift"
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
      class="{isDarkMode ? 'text-yellow-500 hover:text-yellow-400' : 'text-yellow-600 hover:text-yellow-700'} hover-lift"
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
    <div class="text-center mb-8 p-4 rounded-lg {isDarkMode ? 'bg-gray-800' : 'bg-yellow-50'} animate-on-scroll hover-lift">
      <h2 class="text-2xl md:text-3xl font-bold gradient-text mb-2">
        Visit Us At:
      </h2>
      <p class="text-xl md:text-2xl font-bold {isDarkMode ? 'text-white' : 'text-gray-900'}">
        {address}
      </p>
    </div>

    <div class="aspect-video w-full overflow-hidden rounded-lg shadow-2xl mb-8 animate-on-scroll">
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
    <div class="text-center mb-12 animate-on-scroll">
      <h1 class="text-4xl md:text-6xl font-bold gradient-text mb-4">
        {#if data.metadata.rainCheck?.isPostponed}POSTPONED:{/if} NEOSHO CITY-WIDE GARAGE SALE
      </h1>
      <p class="text-xl md:text-2xl {isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-6">
        A Must-Stop Location on Your Neosho Garage Sale Route!
      </p>
      <div class="text-lg {isDarkMode ? 'text-gray-400' : 'text-gray-600'}">
        <p class="font-bold text-xl mb-2 animate-float">📍 {address}</p>
        {#if data.metadata.rainCheck?.isPostponed}
          <p class="mt-2 text-red-500 font-bold">⚠️ Date Postponed - Check Back Soon for New Date ⚠️</p>
        {:else}
          <p class="mt-2">⏰ April 4-5, 2025</p>
          <p class="mt-2">🕒 8 AM - 4 PM Both Days</p>
        {/if}
        <p class="mt-2">🚗 Perfect Stop on Highway 60</p>
      </div>
    </div>

    <!-- Contact Section -->
    <div class="text-center mb-12 p-6 rounded-lg {isDarkMode ? 'bg-gray-800' : 'bg-yellow-50'} animate-on-scroll hover-lift">
      <h2 class="text-2xl font-bold gradient-text mb-4">
        Questions? Contact Us!
      </h2>
      <p class="text-xl font-bold {isDarkMode ? 'text-white' : 'text-gray-900'} mb-4">
        {phoneNumber}
      </p>
      <div class="flex justify-center gap-4">
        <Button
          size="lg"
          class="{isDarkMode ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' : 'bg-yellow-600 hover:bg-yellow-700 text-white'} font-bold hover-lift"
          on:click={() => window.location.href = `tel:${phoneNumber}`}
        >
          <Phone class="mr-2 h-5 w-5" />
          Call Us
        </Button>
        <Button
          size="lg"
          class="{isDarkMode ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' : 'bg-yellow-600 hover:bg-yellow-700 text-white'} font-bold hover-lift"
          on:click={() => window.location.href = `sms:${phoneNumber}`}
        >
          <MessageSquare class="mr-2 h-5 w-5" />
          Text Us
        </Button>
      </div>
    </div>

    <!-- SEO Rich Content -->
    <div class="prose {isDarkMode ? 'prose-invert' : ''} max-w-none mb-12 animate-on-scroll">
      {#if data.metadata.rainCheck?.isPostponed}
        <div class="p-6 border-2 border-red-500 rounded-lg mb-6">
          <h2 class="text-2xl font-bold text-red-500 mb-4">Important Update: Event Postponed</h2>
          <p class="text-lg">
            Due to inclement weather, our garage sale has been temporarily postponed.
            We apologize for any inconvenience this may cause.
          </p>
          <p class="text-lg mt-4">
            We want to ensure everyone can shop safely and comfortably. Please check back here
            for the new date announcement, which will be posted as soon as it's confirmed.
          </p>
          <p class="text-lg mt-4">
            If you have any questions or need immediate assistance, please contact us at {phoneNumber}.
          </p>
        </div>
      {/if}
      
      <p class="text-lg">
        Looking for a convenient stop during the Neosho city-wide garage sale? 
        Our location on Gateway Drive is the perfect spot to check out quality items 
        at great prices. Whether you're just starting your shopping or heading home, 
        we're worth the stop!
      </p>
      <p class="text-lg">
        Located right on Highway 60, we're easy to find and offer plenty of parking. 
        Don't miss out on our selection of quality items - it's a great addition to 
        your garage sale shopping route. {#if data.metadata.rainCheck?.isPostponed}Please check back for our new date once the weather improves.{:else}The event takes place rain or shine, so come prepared for great deals!{/if}
      </p>
    </div>

    <!-- Items Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each ['Tools & Equipment', 'Furniture', 'Electronics', 'Sports & Recreation', 'Home & Kitchen', 'And Much More!'] as title, i}
        <Card class="animate-on-scroll hover-lift {isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}" style="animation-delay: {i * 100}ms">
          <CardHeader>
            <CardTitle class="gradient-text">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul class="space-y-2 {isDarkMode ? 'text-gray-300' : 'text-gray-700'}">
              {#if title === 'Tools & Equipment'}
                <li>• Power Tools</li>
                <li>• Hand Tools</li>
                <li>• Garden Equipment</li>
                <li>• Workshop Supplies</li>
              {:else if title === 'Furniture'}
                <li>• Living Room Sets</li>
                <li>• Bedroom Furniture</li>
                <li>• Outdoor Furniture</li>
                <li>• Storage Solutions</li>
              {:else if title === 'Electronics'}
                <li>• TVs & Monitors</li>
                <li>• Audio Equipment</li>
                <li>• Gaming Systems</li>
                <li>• Small Appliances</li>
              {:else if title === 'Sports & Recreation'}
                <li>• Exercise Equipment</li>
                <li>• Sports Gear</li>
                <li>• Camping Equipment</li>
                <li>• Bikes & Accessories</li>
              {:else if title === 'Home & Kitchen'}
                <li>• Kitchen Appliances</li>
                <li>• Cookware</li>
                <li>• Home Decor</li>
                <li>• Storage Containers</li>
              {:else}
                <li>• Books & Media</li>
                <li>• Clothing</li>
                <li>• Collectibles</li>
                <li>• Miscellaneous Items</li>
              {/if}
            </ul>
          </CardContent>
        </Card>
      {/each}
    </div>

    <!-- Call to Action -->
    <div class="text-center mt-12 animate-on-scroll">
      {#if data.metadata.rainCheck?.isPostponed}
        <div class="mb-6">
          <p class="text-xl {isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4">
            Would you like to receive notification when we announce the new date?
          </p>
        </div>
        <Button 
          size="lg" 
          class="{isDarkMode ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' : 'bg-yellow-600 hover:bg-yellow-700 text-white'} font-bold hover-lift mr-4"
          on:click={() => window.location.href = `sms:${phoneNumber}?body=Please notify me when the Neosho garage sale is rescheduled.`}
        >
          Get Updates via Text <MessageSquare class="ml-2 h-4 w-4" />
        </Button>
      {/if}
      <Button 
        size="lg" 
        class="{isDarkMode ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' : 'bg-yellow-600 hover:bg-yellow-700 text-white'} font-bold hover-lift"
        on:click={() => window.open('https://www.google.com/maps/dir/?api=1&destination=12687+Gateway+Dr+Neosho+MO+64850', '_blank')}
      >
        Get Directions <ArrowRight class="ml-2 h-4 w-4" />
      </Button>
    </div>

    <!-- RV Sale Promotion -->
    <Card class="p-4 sm:p-6 mt-12 {isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} animate-on-scroll hover-lift">
      <div class="text-center mb-6">
        <h2 class="text-2xl sm:text-3xl font-bold gradient-text mb-4">
          🚛 Special Offer: Class A RV for Sale!
        </h2>
        <p class="text-lg {isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-6">
          While you're in the area, don't miss out on this incredible opportunity!
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="space-y-4">
          <h3 class="text-xl font-bold gradient-text">
            2002 Safari Zanzibar Class A Diesel Motor Home
          </h3>
          <ul class="space-y-2 {isDarkMode ? 'text-gray-300' : 'text-gray-700'}">
            <li>• 38' Length with 2 Slide-outs</li>
            <li>• CAT Diesel 7.2-L L-6 330hp Engine</li>
            <li>• Allison Automatic Transmission</li>
            <li>• Only 78,848 Miles</li>
            <li>• Self-Contained with Large Bathroom</li>
          </ul>
          <p class="text-xl font-bold gradient-text">
            Only $22,000
          </p>
        </div>
        <div class="text-center">
          <Button 
            size="lg" 
            class="{isDarkMode ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' : 'bg-yellow-600 hover:bg-yellow-700 text-white'} font-bold hover-lift"
            on:click={() => window.open('https://www.arv.sale', '_blank')}
          >
            View RV Details <ArrowRight class="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>

    <!-- Payment Options Section -->
    <Card class="p-4 sm:p-6 mt-12 {isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} animate-on-scroll" id="payment-options">
      <h2 class="text-xl sm:text-2xl font-semibold mb-4 gradient-text">Payment Options</h2>
      
      <div class="space-y-6">
        <!-- Cash Payment -->
        <div class="space-y-2 p-4 border rounded-lg hover-lift {isDarkMode ? 'border-gray-700 hover:border-yellow-500' : 'border-gray-200 hover:border-yellow-600'} transition-colors">
          <h3 class="text-lg font-medium flex items-center gap-2 gradient-text">
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
        <div class="space-y-2 p-4 border rounded-lg hover-lift {isDarkMode ? 'border-gray-700 hover:border-yellow-500' : 'border-gray-200 hover:border-yellow-600'} transition-colors">
          <h3 class="text-lg font-medium flex items-center gap-2 gradient-text">
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
            <div class="p-4 border rounded-lg space-y-2 hover-lift {isDarkMode ? 'border-gray-700' : 'border-gray-200'}">
              <h4 class="font-medium gradient-text">Bitcoin Network</h4>
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
            <div class="p-4 border rounded-lg space-y-2 hover-lift {isDarkMode ? 'border-gray-700' : 'border-gray-200'}">
              <h4 class="font-medium gradient-text">Lightning Network</h4>
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
